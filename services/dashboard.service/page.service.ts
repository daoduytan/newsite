import { slugify } from "@/helps/slugify";
import prisma from "@/lib/prisma";

function getAllPageService() {
  return prisma.page.findMany({});
}

function addPageService(data: any) {
  const slug = slugify(data.title);

  return prisma.page.create({
    data: {
      ...data,
      slug,
    },
  });
}

export const pageService = {
  all: getAllPageService,
  add: addPageService,
};
