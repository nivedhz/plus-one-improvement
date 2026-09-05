# improve.

## Product goal

Build a focused, mobile-first study companion for Kerala Plus One improvement exam students. Resources are currently scattered across YouTube, education websites, textbooks, and question-paper archives. `improve.` should bring the best paths together and help a student decide what to study next.

The product should feel calm, practical, and encouraging, not like an advertising-heavy course marketplace.

## Audience

- Kerala Plus One students preparing for improvement examinations.
- Students who may use Malayalam, English, or both.
- Students who need a clear plan, not just more links.

## Current state (Sep 2026)

Shipped and merged to `main`:

- Marketing homepage (`/`, visitors only) with hero, exam countdown, quotes, and CTAs.
- Auth pages (`/auth/login`, `/auth/sign-up`) with mutual redirects for signed-in users.
- Member dashboard (`/dashboard`, login required) with study-schedule calendar, countdown + streak, today's focus, subject strip, continue learning, and tutor teaser.
- 8-subject catalog (Physics, Chemistry, Mathematics, English, Malayalam, Computer Science, Zoology, Botany) with a CS/Biology stream split, chapter pages, key points, and real video/note counts.
- Curated video lessons per chapter (click-to-play privacy-enhanced embeds, deep-link timestamps), linked chapter notes, and year-grouped previous-year papers with answers.
- Real binary chapter progress (`CompleteToggle`), per-user streaks, and recent completions — no mock data anywhere in the UI.
- Priority planner (`/calculator`, login required): last-exam marks in, per-subject study priorities out. Marks stay private to the account.
- Improvement trio: the exam allows at most 3 subjects, so the planner recommends the 3 weakest and the student locks in their choice. Dashboard, schedule, focus card, and subjects list show only those (undecided students see the full stream).
- JWT sessions in an `httpOnly` cookie, logout with server-side revocation, production-only rate limits.
- Light/dark themes with a persisted switcher; logout confirmation modal.

Still open (not yet built):

- Quizzes and chapter performance breakdowns.
- Study planner with revision and mock-test days (schedule display exists).
- AI tutor (teaser UI only).
- Email verification and password reset (required before public launch).
- Malayalam/English explanations and low-bandwidth/PWA support.

## Architecture snapshot

- Next.js 16 App Router + TypeScript + Tailwind CSS 4.
- SSR-first pages; interactivity lives in small `"use client"` islands (countdown, quotes, theme toggle, forms, logout modal).
- Backend is Route Handlers (`app/api/**/route.ts`); no separate server.
- Postgres via Prisma 7. Models: `User` (uuid id, unique email, bcrypt hash, `tokenVersion`, `stream`), `ChapterProgress` (unique per user+subject+chapter), `PreviousMark` (unique per user+subject).
- Auth: JWT (`HS256`, 7-day expiry, `iss: improve`, `aud: improve-web`) in the `improve_session` cookie (`httpOnly`, `SameSite=Lax`, `secure` in production). `AUTH_SECRET` must be 32+ chars or boot fails.
- Route guards are page-level `getSession()` checks plus Edge `proxy.ts` JWT redirects (signature only — DB checks stay in pages): `/` and `/auth/*` redirect sessions inward; `/dashboard`, `/subjects/**`, `/calculator` redirect visitors to login.
- Client data fetching uses the native-`fetch` wrapper in `app/lib/api.ts` (relative `/api` base) + TanStack Query mutations. No axios anywhere.
- Env keys (gitignored `.env`, documented in `.env.example`): `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL`.
- Exam target: 12 October 2026, 9:30 AM IST (`EXAM_DATE_ISO` in `app/lib/site.ts`).

## Decisions log

- Dual-tone primary: fresh green (emerald) in light mode, indigo glow in dark mode. Red is reserved for destructive actions only.
- Dark theme is blackish (`#111`), never blue; surfaces are solid with hairline borders — no mesh, dots, or glass translucency (navbar blur excepted, it's functional).
- Lucide icons everywhere; no emojis in UI.
- Default to light theme; persist theme choice in `localStorage` with OS-preference first-visit fallback.
- Never ship dev/demo copy ("frontend demo", "homepage only") in production UI.
- External resources are links with attribution, never copied content. Partner URLs: Xylem, Eduport, Exam Winner (YouTube), HSSLive (`https://www.hsslive.in/`), HSSReporter (`https://www.hssreporter.com/`).
- Login errors stay generic ("Invalid email or password") so emails can't be enumerated.
- Local `data/users.json` store is retired and gitignored; Postgres is the only user store.
- Modals render via `createPortal` to `document.body` (sticky blurred navbars trap `position: fixed` children) and compensate for the disappearing scrollbar with measured `padding-right` instead of a persistent gutter.
- Progress is binary (done / not done) — never percentage steps; the `percent` column only ever holds `0`/`100`.
- Streams: science batches split into CS vs Biology (Botany + Zoology); all subject lists, dashboard, and planner filter to the active stream.
- Counts shown in UI (videos, notes, papers, chapters) are always derived from the content maps — invented counts were removed on sight.
- Videos/notes/papers are hand-verified links with attribution; titles checked via oEmbed and URLs checked live (HTTP 200) before adding. Unverifiable links are excluded, not guessed.
- Git: feature branches (`feat/<scope>-<short>`), Conventional Commits, stacked PRs merged oldest-first. See `AGENTS.md`.

## Trusted starting resources

Use these as linked resource sources and attribution references. Do not copy or republish protected content without permission.

- Xylem: all-round video teaching and revision.
- Eduport: all-round video teaching and revision.
- Exam Winner: all-round video teaching and revision.
- HSSLive: chapter summaries, textbooks, and previous-year questions.
- HSSReporter: previous-year question papers and exam resources.

Every external resource should retain its original URL, creator/source name, resource type, chapter, language, and last-reviewed date.

## Product roadmap

1. ~~Official syllabus and chapter catalog~~ — done with real chapter lists (Physics 14, Chemistry 9, Maths 14, English 19, Malayalam 19, CS 12, Zoology 12, Botany 10).
2. ~~Resources as metadata plus original links~~ — done per chapter: videos, notes, and papers.
3. Chapter notes, key points, formulas, diagrams — key points exist per chapter; formulas/diagrams still open.
4. ~~Marks calculator~~ — done as the privacy-first priority planner (per-subject ranks, no grouped totals).
5. ~~Progress persistence~~ — done and binary (done/not done everywhere).
6. Quizzes and chapter performance breakdowns — **natural next slice** (progress + priorities already feed it).
7. Study planner with revision and mock-test days — schedule display exists; needs interactivity.
8. Chapter-specific AI tutor using verified chapter content as retrieval context — needs a free-provider decision plus cost/limit strategy first.
9. Malayalam/English explanations and low-bandwidth/PWA support.
10. Account essentials before public launch: email verification, password reset.

## AI tutor principles

The integrated tutor must know which subject and chapter the student selected. It should answer from approved content, explain rather than simply give answers, admit uncertainty, and link to the source context when possible. It must not claim that a chapter or question is guaranteed to appear in the exam.

## Engineering principles

- Use Next.js App Router and TypeScript.
- Prefer small, readable components and data structures.
- Build mobile-first and test keyboard accessibility.
- Keep content separate from UI so a database can replace prototype data later.
- Validate educational claims and label historical trends as trends, not predictions.
- Never expose private student marks or personal information unnecessarily.
- Keep external resources attributed and easy to report or review.
- Never commit secrets (`.env*`, password hashes, local data stores).
- Verify auth/backend changes live with curl (signup → login → me → logout) and delete test rows afterward.

## Definition of a successful MVP

A student can enter the dashboard, understand how much time remains, identify their next useful study action, open a trusted chapter resource, practice questions, and see whether their chapter-level confidence is improving.
