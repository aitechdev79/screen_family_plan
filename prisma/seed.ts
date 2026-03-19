import { PrismaClient } from "@prisma/client";
import { ACTION_TEMPLATES } from "../src/lib/plan-engine/templates";

const prisma = new PrismaClient();

async function main() {
  // Optional seed example: store starter plan data as a sample MediaPlan.
  // If you later create a dedicated ActionTemplate model in Prisma,
  // this file can be adapted to seed database-managed templates.

  await prisma.mediaPlan.upsert({
    where: { id: "sample-media-plan" },
    update: {},
    create: {
      id: "sample-media-plan",
      familyName: "Sample Family",
      locale: "vi",
      answersJson: {
        note: "Starter seed entry",
        templatesCount: ACTION_TEMPLATES.length,
      },
      generatedPlanJson: {
        summary: "Starter seed plan",
      },
    },
  });

  console.log(`Seed complete. Templates in codebase: ${ACTION_TEMPLATES.length}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
