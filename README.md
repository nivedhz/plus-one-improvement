# improve. — Kerala Plus One study companion

A calm, mobile-first study companion for Kerala Plus One improvement exams:
subject catalog, chapter key points, trusted video links, progress tracking,
marks-based priorities, and an exam countdown.

## Tech stack

- **Framework:** Next.js 16 App Router + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS 4 with brand `@theme` tokens, light/dark themes
- **Backend:** Route Handlers (`app/api/**/route.ts`); Edge `proxy.ts` for auth redirects
- **DB:** Postgres + Prisma 6 (`User`, `ChapterProgress`, `PreviousMark`)
- **Auth:** JWT (`jose`, HS256, 7-day) in an `httpOnly` cookie + `tokenVersion` revocation, `bcryptjs` (cost 12), Zod validation, prod rate limits + same-origin guard
- **Client data:** native `fetch` (`app/lib/api.ts`) + TanStack Query mutations
- **Quality:** ESLint (next core-web-vitals), `tsc --noEmit`, Vitest, Prettier, GitHub Actions CI

## Getting started

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL + AUTH_SECRET (32+ chars)
npx prisma db push
npm run db:seed        # validates the subject catalog
npm run dev            # http://localhost:3000
```

## Scripts

| Script                            | Purpose                  |
| --------------------------------- | ------------------------ |
| `npm run dev`                     | local dev server         |
| `npm run build` / `start`         | production build / serve |
| `npm run lint`                    | ESLint                   |
| `npm run typecheck`               | `tsc --noEmit`           |
| `npm run test:run`                | Vitest (unit)            |
| `npm run format` / `format:check` | Prettier write / check   |
| `npm run db:seed`                 | catalog integrity check  |

## API & health

- `GET /api/health` — liveness + DB readiness (`{ status, database, time }`)
- Auth: `POST /api/auth/sign-up|login|logout`, `GET /api/auth/me`
- Data: `GET|PUT /api/marks`, `GET|PUT /api/progress`, `GET|PUT /api/profile`
- Errors: `{ error, code }` envelope (`UNAUTHORIZED`, `BAD_REQUEST`, `RATE_LIMITED`, …)

## Verify auth changes live

```bash
BASE=http://localhost:3000
curl -c jar -X POST $BASE/api/auth/sign-up -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@example.com","password":"password123"}'
curl -b jar $BASE/api/auth/me
curl -b jar -c jar -X POST $BASE/api/auth/logout
curl -b jar $BASE/api/auth/me # -> 401
# then delete the test user from Postgres
```

See `GOAL.md` for product roadmap and `AGENTS.md` for git conventions
(feature branches `feat/<scope>-<short>`, Conventional Commits, stacked PRs).
