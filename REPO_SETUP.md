# Repo Setup Guide

This project was split into 6 repos under `github.com/shashanksavarkar`. This doc
covers how to get each one running locally and what to actually test once it's up.

If you're running the full stack locally, use different ports per service so
nothing collides:

| Repo | Local port |
| --- | --- |
| `tc-robonity-backend` | 5000 |
| `tc-robonity-roboshare-backend` | 5001 |
| `tc-robonity-frontend-landing-pages-revamp` | 3000 |
| `tc-robonity-roboshare-frontend-landing-pages-revamp` | 3001 |

---

## 1. tc-robonity-backend

Main Robonity API (auth, forum, and — for now — the RoboShare routes too; see
`tc-robonity-roboshare-backend` for the standalone RoboShare-only service).

**Env (`.env`, copy from `.env.example`):**

| Var | Needed for |
| --- | --- |
| `PORT` | defaults to 5000 |
| `MONGO_URI` | MongoDB Atlas (or local) connection string |
| `JWT_SECRET` | signs/verifies auth tokens |
| `FRONTEND_URL` | CORS allow-list |
| `GMAIL_USER` | sender identity for RoboShare OTP emails (must be a verified SendGrid sender) |
| `SENDGRID_API_KEY` | SendGrid API key, used to send OTP emails |
| `NODE_ENV` | `development` for verbose logging |

**Run:**
```bash
npm install
cp .env.example .env   # fill in the values above
npm run dev
```

**What to test:**
- `GET /` → `API is running...`
- `POST /api/auth/register`, `POST /api/auth/login` — main site auth
- `GET/POST /api/forum` routes — needs Mongo connected
- `POST /api/roboshare/send-otp` with a `@gsv.ac.in` email — needs a working `SENDGRID_API_KEY` + verified `GMAIL_USER` sender, or it'll 502

---

## 2. tc-robonity-frontend-landing-pages-revamp

Main Robonity Next.js frontend — landing pages, auth, forum, events, gallery,
projects, resources, newsletter, about. **Does not include RoboShare** (its nav
links, robots.txt entry, and `/roboshare` post-login redirect were removed
since that page now lives in its own repo).

**Env (`.env`, copy from `.env.example`):**

| Var | Needed for |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | base URL of `tc-robonity-backend` (e.g. `http://localhost:5000`) |

**Run:**
```bash
npm install
cp .env.example .env
npm run dev
```

**What to test:**
- Pairs with `tc-robonity-backend` running first
- Home, About, Projects, Gallery, Events, Resources, Newsletter pages render
- `/auth` — register/login against the backend, redirects to `/` (not `/roboshare`) after success
- `/forum` — create/view threads (needs Mongo + backend up)
- No `/roboshare` route exists in this repo anymore — confirm the nav/footer no longer link to it

---

## 3. tc-robonity-roboshare-frontend-landing-pages-revamp

Standalone Next.js app containing just the RoboShare page (OTP login + resource
dashboard), extracted since it was previously one route inside the main frontend.

**Env (`.env`, copy from `.env.example`):**

| Var | Needed for |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | base URL of `tc-robonity-roboshare-backend` (e.g. `http://localhost:5001`) |

**Run:**
```bash
npm install
cp .env.example .env
npm run dev -- -p 3001   # or set PORT=3001
```

**What to test:**
- Pairs with `tc-robonity-roboshare-backend` running first
- Sign in with a `@gsv.ac.in` email + roll number → should receive an OTP email
- Verify the OTP → lands on the resource dashboard
- Share a resource (title/description/URL/category) → shows up in the grid
- Logout clears the session (`localStorage` key `roboshare_session`)

---

## 4. tc-robonity-roboshare-backend

Standalone Express + MongoDB API containing just the RoboShare endpoints,
extracted from the main backend (auth middleware was trimmed to only the
RoboShare token check — it no longer touches the main `User` model).

**Env (`.env`, copy from `.env.example`):**

| Var | Needed for |
| --- | --- |
| `PORT` | defaults to 5000 — set to `5001` if running alongside the main backend |
| `MONGO_URI` | MongoDB connection string (can be the same cluster as the main backend — collection names don't collide) |
| `JWT_SECRET` | signs/verifies RoboShare session tokens |
| `FRONTEND_URL` | CORS allow-list — point at the RoboShare frontend's URL |
| `GMAIL_USER` | verified SendGrid sender for OTP emails |
| `SENDGRID_API_KEY` | SendGrid API key |
| `NODE_ENV` | `development` for verbose logging |

**Run:**
```bash
npm install
cp .env.example .env
PORT=5001 npm run dev
```

**What to test:**
- `POST /api/roboshare/send-otp` `{ email, rollNo }` with a `@gsv.ac.in` email — check the inbox for the OTP
- `POST /api/roboshare/verify-otp` `{ email, emailOtp }` — returns a session token
- `GET /api/roboshare/resources` with `Authorization: Bearer <token>`
- `POST /api/roboshare/resources` with `Authorization: Bearer <token>` — create a resource

---

## 5. tc-backend-misc

Not an app — just miscellaneous backend-adjacent files: the `deploy-backend.yml`
CI workflow (for the main backend's original Render deploy hook) and
`cors.json` (a storage bucket CORS config). Nothing to install or run.

## 6. tc-frontend-misc

Not an app — just miscellaneous frontend-adjacent files: the
`deploy-frontend.yml` CI workflow (for the main frontend's original Vercel
deploy) and a stray `lint_output.txt`. Nothing to install or run.

---

## CI/CD note

`tc-robonity-backend`, `tc-robonity-roboshare-backend`,
`tc-robonity-frontend-landing-pages-revamp`, and
`tc-robonity-roboshare-frontend-landing-pages-revamp` each have a
`.github/workflows/deploy.yml` that runs install/lint/build on every push and
PR, then deploys on push to `main` — Render deploy-hook for the backends,
Vercel CLI for the frontends. The deploy step no-ops with a clear error until
you add the relevant secrets in each repo's **Settings > Secrets and variables
> Actions**:

- Backends: `RENDER_DEPLOY_HOOK_URL`
- Frontends: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
