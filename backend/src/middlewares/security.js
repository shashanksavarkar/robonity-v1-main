import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Rate Limiter: Maximum 100 requests per 15 minutes per IP
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        error: 'Too many requests, please try again later.'
    }
});

// Helmet Configuration: Secure HTTP headers
// Customizing contentSecurityPolicy if needed for cross-origin resources (e.g., images)
const helmetConfig = helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
});

export const securityMiddleware = [
    helmetConfig,
    limiter
];
