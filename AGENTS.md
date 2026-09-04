<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

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
