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
- Verify auth/backend changes live with curl (sign-up → login → me → logout → replay old token), then delete test users/rows from Postgres.
- Leave the dev database free of test rows when done.
