import { slugify } from "@/helps/slugify";
import prisma from "@/lib/prisma";

type AddCategoryData = {
  title: string;
  content?: string;
  description?: string;
};

function addCategoryService(data: AddCategoryData) {
  const slug = slugify(data.title);

  return prisma.category.create({
    data: {
      ...data,
      slug,
    },
  });
}

function getCategoryDetailService(id: string) {
  return prisma.category.findFirst({
    where: {
      id,
    },
  });
}

function getAllCategoriesService() {
  return prisma.category.findMany({});
}

function updateCategoryService(categoryId: string, data: any) {
  return prisma.category.update({
    where: {
      id: categoryId,
    },
    data,
  });
}

export const categoryService = {
  all: getAllCategoriesService,
  get: getCategoryDetailService,
  add: addCategoryService,
  update: updateCategoryService,
};
