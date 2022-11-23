import prisma from "@/lib/prisma";

function getAllOptionService() {
  return prisma.option.findMany({});
}

export const optionService = {
  all: getAllOptionService,
};
