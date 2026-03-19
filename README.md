# Media Plan App Starter

This folder contains a production-oriented starter set of files for the Family Media Plan web app discussed in the chat.

## Included

- Rule-based plan engine in TypeScript
- Zod validation
- Next.js App Router API route for plan generation
- Prisma schema for PostgreSQL
- Minimal sample pages for input/result flow
- Reusable result components
- Basic i18n message files

## Suggested install dependencies

```bash
npm install zod clsx tailwind-merge
npm install -D prisma
npm install @prisma/client
```

## Main code paths

- `src/lib/plan-engine/*`
- `src/lib/validations/media-plan.ts`
- `src/app/api/plan/generate/route.ts`
- `src/app/[locale]/plan/result/page.tsx`
- `prisma/schema.prisma`

## Notes

- The generator is rule-based, not LLM-based.
- Templates are stored in code for simplicity.
- You can later move templates into PostgreSQL if you want a CMS/admin workflow.
