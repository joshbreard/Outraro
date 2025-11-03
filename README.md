# Outraro Client Dashboard

Next.js 14 + Prisma + NextAuth scaffold for the Outraro outbound performance portal.

## Getting started

```bash
pnpm install # or npm install
```

1. Copy `.env.example` to `.env` and update secrets.
2. Run `pnpm prisma:push` to sync the database schema.
3. Seed initial data with `pnpm prisma:seed`.
4. Launch the dev server with `pnpm dev`.

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui primitives
- Prisma ORM (PostgreSQL)
- NextAuth (Credentials + Google)
- Chart.js via `react-chartjs-2`
- UploadThing (placeholder endpoint)
- @vercel/cron (placeholder handlers)

## Project layout

Refer to `/components`, `/lib`, and `/app/dashboard` for feature modules. API routes live in `/app/api`. Prisma schema and seeds are under `/prisma`.

## Next steps

- Flesh out KPI tiles with live data
- Implement webhook ingestion and persistence
- Add automated tests (Vitest + Playwright)
- Integrate UploadThing for call storage
- Build granular access controls per role
