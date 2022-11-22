import { AddPostData } from "@/components/pages";
import { slugify } from "@/helps/slugify";
import prisma from "@/lib/prisma";

function addPost(data: AddPostData) {
  const slug = slugify(data.title);

  return prisma.post.createMany({
    data: {
      ...data,
      slug,
    },
  });
}

function getAllPostService() {
  return prisma.post.findMany({
    include: {
      categories: {
        select: {
          id: true,
          title: true,
          slug: true,

          posts: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      },
    },
  });
}

function getPostDetailService(postId: string) {
  return prisma.post.findFirst({
    where: {
      id: postId,
    },
  });
}

function updatePostService(postId: string, data: any) {
  return prisma.post.update({
    where: { id: postId },
    data,
  });
}

export const postService = {
  all: getAllPostService,
  add: addPost,
  get: getPostDetailService,
  update: updatePostService,
};
