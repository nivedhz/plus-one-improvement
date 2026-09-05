# improve. — Kerala Plus One study companion

A calm, mobile-first study companion for Kerala Plus One improvement exams.
Instead of hunting across YouTube, PDFs, and random sites, students get one
place with chapter-wise video lessons, notes, previous-year papers, progress
tracking, marks-based priorities, and an exam countdown.

## Features

- **Marketing homepage** (`/`, visitors only) — hero, live exam countdown,
  rotating quotes, trusted-source strip.
- **Auth** (`/auth/login`, `/auth/sign-up`) — email + password, JWT session
  cookie, generic login errors, logout confirmation modal.
- **Dashboard** (`/dashboard`, login required) — greeting, study-schedule
  calendar, countdown + streak, today's focus, subject strip, continue
  learning, AI tutor teaser.
- **Subjects** (`/subjects`, 8 science subjects) — CS / Biology stream split
  with switcher, per-subject chapter lists with real video/note counts.
- **Chapters** (`/subjects/[subject]/[chapter]`) — key points, click-to-play
  video embeds (privacy-enhanced YouTube), linked chapter notes, binary
  mark-complete toggle at the bottom, prev/next navigation.
- **Priority planner** (`/calculator`, login required) — enter last-exam
  marks per subject; the server ranks each subject's study priority
  (Critical → Maintain). Marks stay private to the account.
- **Previous-year papers** — year-grouped papers with answers on every
  subject page (board / SAY / improvement / model kinds).
- **Themes** — light (green primary) / dark (`#111`, indigo glow), persisted
  switcher in the navbar.

## Tech stack

- **Framework:** Next.js 16 App Router + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS 4, light/dark via persisted class toggle
- **Backend:** Route Handlers (`app/api/**/route.ts`); Edge `proxy.ts` for
  auth redirects on top of page-level `getSession()` guards
- **DB:** Postgres + Prisma 7 (`User`, `ChapterProgress`, `PreviousMark`);
  `prisma.config.ts` at root, generated client in `prisma/generated/`
- **Auth:** JWT (`jose`, HS256, 7-day, `iss`/`aud` bound) in an `httpOnly`
  `improve_session` cookie + `tokenVersion` revocation on logout;
  `bcryptjs`, Zod validation, production-only rate limits, same-origin guard
- **Client data:** axios instance (`app/lib/api.ts`, base URL from env) +
  TanStack Query mutations. No native `fetch` in components.
- **Content:** static catalog libs (`subjects`, `videos`, `notes`, `pyq`) —
  links and metadata only, never copied content. See "Content rules" below.
- **Quality:** ESLint (next core-web-vitals), `tsc --noEmit`, Vitest,
  Prettier, GitHub Actions CI.

## Getting started

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL + AUTH_SECRET (32+ chars)
# Optional (password-reset email): RESEND_API_KEY + RESET_FROM_EMAIL.
# Without them, reset links are logged server-side (dev) instead of emailed.
# Resend free tier ($0, 3k/mo) covers this flow.
npx prisma db push
npm run db:seed        # validates the subject catalog
npm run dev            # http://localhost:3000
```

`.env` is gitignored. `prisma generate` runs automatically as part of
`npm run build`, and tolerates a missing `DATABASE_URL` (dummy URL) so CI
can generate without secrets.

## Scripts

| Script                            | Purpose                  |
| --------------------------------- | ------------------------ |
| `npm run dev`                     | local dev server         |
| `npm run build` / `start`         | generate + build / serve |
| `npm run lint`                    | ESLint                   |
| `npm run typecheck`               | `tsc --noEmit`           |
| `npm run test` / `test:run`       | Vitest watch / once      |
| `npm run format` / `format:check` | Prettier write / check   |
| `npm run db:seed`                 | catalog integrity check  |

## Routes

| Route                              | Access        |
| ---------------------------------- | ------------- |
| `/`                                | visitors only |
| `/auth/login`, `/auth/sign-up`     | visitors only |
| `/auth/forgot-password`, `/auth/reset-password` | visitors only |
| `/dashboard`                       | login         |
| `/subjects`, `/subjects/[subject]` | login         |
| `/subjects/[subject]/[chapter]`    | login         |
| `/calculator`                      | login         |

## API

- `GET /api/health` — liveness + DB readiness
- Auth: `POST /api/auth/sign-up|login|logout`, `GET /api/auth/me`,
  `POST /api/auth/forgot-password` (always 200, enumeration-safe),
  `POST /api/auth/reset-password` (single-use 60-min token, rotates sessions)
- Data: `GET|PUT /api/marks` (last-exam marks + computed priorities),
  `GET|PUT /api/progress` (`{ completed: boolean }`),
  `GET|PUT /api/profile` (science stream)
- Errors: `{ error, code }` envelope (`UNAUTHORIZED`, `BAD_REQUEST`,
  `RATE_LIMITED`, `UNKNOWN_CHAPTER`, …)

## Content rules

All learning content is **linked with attribution, never copied**:

- Videos: hand-curated YouTube IDs in `app/lib/videos.ts` (title-verified
  via oEmbed before adding); click-to-play facades load the
  privacy-enhanced (`youtube-nocookie`) player only on click; `startAt`
  seconds supported for deep links.
- Notes: live-verified (HTTP 200) HSSLive chapter pages in
  `app/lib/notes.ts`, with subject-level fallbacks where no chapter page
  exists.
- Papers: live-verified HSSLive paper pages in `app/lib/pyq.ts`, grouped
  by year newest-first, model sets last.
- Displayed counts (videos, notes, papers, chapters) are always derived
  from these maps — never hardcoded, never invented.

## Verify backend changes live

```bash
BASE=http://localhost:3000
curl -c jar -X POST $BASE/api/auth/sign-up -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@example.com","password":"password123"}'
curl -b jar $BASE/api/auth/me
curl -b jar -X PUT $BASE/api/progress -H 'Content-Type: application/json' \
  -d '{"subject":"physics","chapter":"motion-in-a-straight-line","completed":true}'
curl -b jar -c jar -X POST $BASE/api/auth/logout
curl -b jar $BASE/api/auth/me # -> 401
# then delete the test user from Postgres
```

See `GOAL.md` for product roadmap and `AGENTS.md` for agent conventions
(feature branches `feat/<scope>-<short>`, Conventional Commits, stacked PRs).
