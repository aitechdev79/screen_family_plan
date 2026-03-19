# Screen Family Plan

This repository contains the application source for a localized Family Media Plan product built with:

- Next.js App Router
- Prisma + PostgreSQL
- NextAuth credentials auth
- Server Actions for preview/save flows
- Rule-based media plan generation

This repo is now scaffolded to run standalone with a minimal Next.js project setup, including `package.json`, lockfile, app layout, global styles, and build scripts.

## What Is Included

- Multi-step questionnaire for family and child media habits
- Plan preview flow backed by server actions
- Auth flow with register/login pages and route protection middleware
- Saved plans dashboard, detail page, edit flow, and print view
- Prisma schema with user, child profile, media plan, and version history models
- Rule-based plan engine in `src/lib/plan-engine`
- Localized UI text for Vietnamese and English

## Project Structure

- `src/app/[locale]/plan/*`: public questionnaire and preview pages
- `src/app/[locale]/auth/*`: login and registration pages
- `src/app/[locale]/dashboard/*`: authenticated saved-plan pages
- `src/app/actions/*`: server actions for auth and plan flows
- `src/app/api/*`: API routes still available for integration and compatibility
- `src/components/questionnaire/*`: questionnaire UI
- `src/components/plan/*`: result, preview, and print components
- `src/lib/plan-engine/*`: rule-based plan generator
- `src/lib/server/*`: Prisma-backed persistence logic
- `src/lib/i18n/*`: UI text dictionary
- `prisma/schema.prisma`: database schema
- `middleware.ts`: route protection for dashboard and plan APIs

## Setup

1. Install dependencies.
2. Add environment variables.
3. Run Prisma generate/migrate/seed.
4. Start the dev server.

## Required Dependencies

Dependencies are already declared in `package.json`.

Install everything with:

```bash
npm install
```

Build verification:

```bash
npm run build
```

## Environment Variables

Create `.env` with at least:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
AUTH_SECRET="replace-with-a-long-random-secret"
AUTH_URL="http://localhost:3000"
```

Notes:

- `DATABASE_URL` is required by Prisma.
- `AUTH_SECRET` is required by NextAuth.
- Depending on your deployment setup, `AUTH_URL` may be optional locally, but it is recommended.

## Prisma Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Create and apply a migration:

```bash
npx prisma migrate dev --name init
```

Seed the demo user:

```bash
npx prisma db seed
```

The included seed creates:

- Email: `demo@example.com`
- Password: `Password123!`

## Auth Behavior

- Credentials-based auth only
- Protected routes are enforced by `middleware.ts`
- Protected areas:
  - `/:locale/dashboard/**`
  - `/api/plans/**`

## Main Flows

### Public

- `/:locale/plan/new`: questionnaire
- `/:locale/plan/result`: preview before saving
- `/:locale/auth/login`: login
- `/:locale/auth/register`: register

### Authenticated

- `/:locale/dashboard/plans`: saved plans dashboard
- `/:locale/dashboard/plans/:id`: plan detail
- `/:locale/dashboard/plans/:id/edit`: edit + preview update flow
- `/:locale/dashboard/plans/:id/print`: print-friendly version

## Server Actions

- `src/app/actions/plan-actions.ts`
  - generate preview
  - save new plan
  - update existing plan
- `src/app/actions/auth-actions.ts`
  - register user

## API Routes

The repo also includes API routes for compatibility and direct integration:

- `src/app/api/plan/generate/route.ts`
- `src/app/api/plans/route.ts`
- `src/app/api/plans/[id]/route.ts`
- `src/app/api/register/route.ts`
- `src/app/api/auth/[...nextauth]/route.ts`

## Current Limitations

- No tested deployment config is included yet
- No automated test suite is included yet
- Prisma still warns that `package.json#prisma` seed config is deprecated and should later move to `prisma.config.ts`

## Suggested Next Steps

- Add form-level validation messaging and disabled-state polish
- Add automated tests for server actions and repository updates
- Add share/export workflows for saved plans

## Main Code Paths

- `src/lib/plan-engine/*`
- `src/lib/validations/media-plan.ts`
- `src/lib/server/plan-repository.ts`
- `src/app/actions/plan-actions.ts`
- `src/app/[locale]/dashboard/plans/*`
- `prisma/schema.prisma`

## Notes

- Plan generation is rule-based, not LLM-based.
- Templates and scoring logic are stored in code.
- Plan version history is persisted in PostgreSQL.
