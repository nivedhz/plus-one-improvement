@AGENTS.md

## Git workflow (feature branches + conventional commits)

- Never commit, push, amend, or open PRs unless the user explicitly asks.
- Do all feature work on branches named `feat/<scope>-<short-description>` (e.g. `feat/modal-scroll-lock`), created in implementation order so they stack cleanly.
- Start each new task on a fresh feature branch BEFORE writing any code — never implement a new task on top of an unrelated branch.
- Commit messages follow Conventional Commits: `feat(scope): Small description`, then a blank line plus a longer body explaining why.
- Before every commit: run `npm run lint`, `npm run build`, and `git diff --check`; inspect `git status`, `git diff`, and `git log --oneline -10`.
- Stage only intended files. Never commit secrets: no `.env*`, password hashes, or local data stores (e.g. `data/users.json`).
- Pushing: push `main` first and keep it free of unreviewed feats, then push feature branches oldest-first.
- PRs: one PR per branch against `main`, opened oldest-first (stacked). Merge in PR-number order — once an earlier PR merges, later diffs narrow automatically and nothing conflicts.
- Always return the PR URLs when done.

## Local dev and verification

- Never kill the user's running dev server with broad patterns. If a restart is required (new `.env` values, regenerated Prisma client), kill only the exact `next dev` PID and start it again immediately.
- Restart `npm run dev` after adding or changing `.env` values — they load at boot only.
- Verify auth/backend changes live with curl (sign-up → login → me → progress PUT → logout → replay old token), then delete test users/rows from Postgres.
- Leave the dev database free of test rows when done.

## Architecture (read before changing code)

- **Rendering:** SSR-first pages; interactivity lives in small `"use client"`
  islands (`app/components/*`). Server components read the session via
  `getSession()` (`app/lib/auth.ts`) and redirect with `redirect()`.
- **Routing:** `/` and `/auth/*` are visitors-only; `/dashboard`,
  `/subjects/**`, `/calculator` require login. Guards live in pages plus
  Edge `proxy.ts` — middleware can't use Prisma, so never put DB calls there.
- **Client data:** all browser requests go through the axios instance in
  `app/lib/api.ts` (base URL from `NEXT_PUBLIC_APP_URL`) with TanStack
  Query mutations. No native `fetch` in components. `router.refresh()`
  re-reads server data after mutations.
- **Backend:** Route Handlers return `NextResponse.json`, validate bodies
  with Zod (`safeParse`, first-issue message), and use the `{ error, code }`
  envelope from `app/lib/http.ts`. Mutating routes apply the same-origin
  guard; auth mutation routes apply prod-only rate limits
  (`app/lib/rate-limit.ts` — dev stays unlimited).
- **DB:** Postgres via Prisma 7; config in `prisma.config.ts`, client
  generated to `prisma/generated/` (gitignored). Models: `User`
  (uuid, unique email, bcrypt hash, `tokenVersion`, `stream`),
  `ChapterProgress` (unique per user+subject+chapter), `PreviousMark`
  (unique per user+subject). Import the client from
  `prisma/generated/client`, never `@prisma/client`.
- **Auth model:** JWT HS256, 7-day expiry, `iss: improve` + `aud: improve-web`
  verified on every read, `AUTH_SECRET` ≥ 32 chars (boot fails otherwise).
  Session cookie `improve_session`: `httpOnly`, `SameSite=Lax`, `secure` in
  production. Logout bumps `tokenVersion` (revokes old tokens) and clears
  the cookie. Login errors stay generic.
- **Progress model:** binary only — `PUT /api/progress` accepts
  `{ completed: boolean }` and writes `100`/`0`; anything `< 100` reads as
  incomplete. Never reintroduce percentage steps.
- **Theme:** light default (green primary), dark is blackish `#111`
  (indigo accents). Toggle persists to `localStorage`. Red is reserved for
  destructive actions. Lucide icons only, no emojis in UI.

## Content libs (links + metadata only, never copied content)

- `app/lib/subjects.ts` — 8-subject catalog (slugs, Malayalam titles where
  applicable, `maxMarks`, key points). Slugs are stable IDs referenced by
  progress, marks, videos, and notes — renaming a slug orphans user rows.
- `app/lib/videos.ts` — hand-verified YouTube IDs per chapter (title-checked
  via oEmbed before adding); `startAt` seconds supported for deep links.
- `app/lib/notes.ts` — live-verified (HTTP 200) HSSLive chapter pages, with
  subject-level fallbacks.
- `app/lib/pyq.ts` — live-verified HSSLive paper pages grouped by year,
  newest-first, model sets last.
- Displayed counts (videos, notes, papers, chapters) must always derive
  from these maps. Never hardcode or invent counts.
- External resources keep attribution (source name + original URL) on screen.

## Testing

- Unit: Vitest (`*.test.ts` next to libs) — run `npm run test:run`.
- Live: curl matrix for every backend change (gates as logged-out user,
  signup → login → me → feature calls → logout → replay → 401, bad-input
  400s), then delete test rows. Dev server serves the working tree, so no
  rebuild is needed for manual checks — but restart it after Prisma
  regenerations or it serves the stale client.
