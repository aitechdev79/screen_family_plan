import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { FamilyInput } from "@/lib/plan-engine/types";
import type { GeneratedPlan } from "@/lib/plan-engine/types";

function toJsonValue(value: FamilyInput | GeneratedPlan): Prisma.InputJsonValue {
  return value as unknown as Prisma.InputJsonValue;
}

async function createChildProfiles(
  tx: Prisma.TransactionClient,
  userId: string,
  children: FamilyInput["children"],
) {
  const childIds: string[] = [];

  for (const child of children) {
    const childProfile = await tx.childProfile.create({
      data: {
        userId,
        nickname: child.nickname,
        ageBand: child.ageBand,
        devicesJson: child.devices,
        concernsJson: child.concerns,
        screenHoursWeekday: child.screenHoursWeekday,
        screenHoursWeekend: child.screenHoursWeekend,
        mainUsageJson: child.mainUsage,
        hasDeviceInBedroom: child.hasDeviceInBedroom,
        usesScreenForCalming: child.usesScreenForCalming,
        hasPersonalDevice: child.hasPersonalDevice,
      },
      select: { id: true },
    });
    childIds.push(childProfile.id);
  }

  return childIds;
}

export async function listUserPlans(userId: string) {
  return prisma.mediaPlan.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      familyName: true,
      locale: true,
      status: true,
      version: true,
      createdAt: true,
      updatedAt: true,
      generatedPlanJson: true,
    },
  });
}

export async function getUserPlanById(userId: string, planId: string) {
  return prisma.mediaPlan.findFirst({
    where: { id: planId, userId },
    include: {
      versions: {
        orderBy: { version: "desc" },
        take: 5,
      },
    },
  });
}

export async function createPlan(params: {
  userId: string;
  familyName: string;
  locale: string;
  answersJson: FamilyInput;
  generatedPlanJson: GeneratedPlan;
  notes?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const childIds = await createChildProfiles(tx, params.userId, params.answersJson.children);

    return tx.mediaPlan.create({
      data: {
        userId: params.userId,
        familyName: params.familyName,
        locale: params.locale,
        answersJson: toJsonValue(params.answersJson),
        generatedPlanJson: toJsonValue(params.generatedPlanJson),
        notes: params.notes,
        children: {
          create: childIds.map((childProfileId) => ({ childProfileId })),
        },
        versions: {
          create: {
            version: 1,
            answersJson: toJsonValue(params.answersJson),
            generatedPlanJson: toJsonValue(params.generatedPlanJson),
          },
        },
      },
    });
  });
}

export async function updatePlan(params: {
  userId: string;
  planId: string;
  familyName: string;
  locale: string;
  answersJson: FamilyInput;
  generatedPlanJson: GeneratedPlan;
  notes?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.mediaPlan.findFirst({
      where: { id: params.planId, userId: params.userId },
      select: {
        id: true,
        version: true,
        children: {
          select: {
            childProfileId: true,
          },
        },
      },
    });

    if (!existing) {
      throw new Error("Plan not found");
    }

    const nextVersion = existing.version + 1;
    const previousChildIds = existing.children.map((child) => child.childProfileId);
    const nextChildIds = await createChildProfiles(tx, params.userId, params.answersJson.children);

    const updatedPlan = await tx.mediaPlan.update({
      where: { id: params.planId },
      data: {
        familyName: params.familyName,
        locale: params.locale,
        answersJson: toJsonValue(params.answersJson),
        generatedPlanJson: toJsonValue(params.generatedPlanJson),
        notes: params.notes,
        version: nextVersion,
        children: {
          deleteMany: {},
          create: nextChildIds.map((childProfileId) => ({ childProfileId })),
        },
        versions: {
          create: {
            version: nextVersion,
            answersJson: toJsonValue(params.answersJson),
            generatedPlanJson: toJsonValue(params.generatedPlanJson),
          },
        },
      },
    });

    if (previousChildIds.length > 0) {
      await tx.childProfile.deleteMany({
        where: {
          id: { in: previousChildIds },
          userId: params.userId,
        },
      });
    }

    return updatedPlan;
  });
}
