# taiwan-labor-tools Agent Rules

## Project
- Next.js/TypeScript/MDX Taiwan labor calculators and SEO content.
- Keep calculator behavior source-backed; do not invent labor-law values without a credible source.

## Commands
- Install: `npm ci`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Test: `npm test`
- Build: `npm run build`
- SEO audit: `npm run seo:audit`
- Design audit: `npm run design:audit`

## Safety
- Before repo edits, run `git fetch` and `git status --short --branch`; stop if behind or diverged.
- Do not commit generated artifacts such as `tsconfig.tsbuildinfo`, `.next/`, screenshots, or `.DS_Store`.
- For Browser/Playwright/LHCI checks, use `PLAYWRIGHT_BROWSERS_PATH=/Volumes/CODEX/Workspace/Toolchains/ms-playwright`.
- No production deploys, analytics/OAuth setup, or secret changes without explicit approval.

