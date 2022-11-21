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
          id:true,
          title:true,
          slug:true,

          posts :{
            select: {
              id: true,
              title:true,
              slug: true   
            }
          }
        },
       
      }
    }
  });
}

export const postService = {
  all: getAllPostService,
  add: addPost,
};
