#!/bin/bash

BASE_URL="http://localhost:5001"

echo "1. Checking Security Headers..."
HEADERS=$(curl -I -s "$BASE_URL/api/stats")
if echo "$HEADERS" | grep -q "Content-Security-Policy"; then
  echo "✅ CSP Header found"
else
  echo "❌ CSP Header MISSING"
fi
if echo "$HEADERS" | grep -q "RateLimit-Limit"; then
  echo "✅ Rate Limit Header found"
else
  echo "❌ Rate Limit Header MISSING"
fi

echo -e "\n2. Testing Validation (Invalid Register)..."
RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"A", "email":"bad-email", "password":"short"}')

if echo "$RESPONSE" | grep -q "Validation Error"; then
  echo "✅ Validation correctly rejected invalid input"
  echo "Response: $RESPONSE"
else
  echo "❌ Validation FAILED (Accepted invalid input)"
  echo "Response: $RESPONSE"
fi

echo -e "\n3. Testing Rate Limiting (Firing 5 requests)..."
for i in {1..5}; do
  curl -s -o /dev/null -w "%{http_code} " "$BASE_URL/api/stats"
done
echo -e "\n(Should see 200s)"
