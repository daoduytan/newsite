import prisma from "@/lib/prisma";

function getSettingService() {
  return prisma.setting.findFirst({});
}

async function updateSettingService(data: any) {
  const setting = await prisma.setting.findFirst({});

  if (setting) {
    return prisma.setting.update({
      where: {
        id: setting.id,
      },
      data,
    });
  }

  return prisma.setting.create({
    data,
  });
}

export const settingService = {
  get: getSettingService,
  update: updateSettingService,
};
