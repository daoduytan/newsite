import { fetcher } from "@/lib/fetcher";
import { ResponseData } from "@/types/response";
import { Category, Post } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export type PostResponse = Post & { categories: Category[] };

const requestPosts = () =>
  fetcher
    .get<ResponseData<PostResponse[]>>("/dashboard/posts")
    .then((res) => res.data.data);

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: requestPosts,
    initialData: [],
  });
}

const requestPost = (postId?: string) =>
  fetcher
    .get<ResponseData<Post>>(`/dashboard/post/${postId}`)
    .then((res) => res.data.data);

export function usePost() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const postId = router.query.id as string | undefined;

  return useQuery({
    queryKey: ["posts", { postId }],
    queryFn: () => requestPost(postId),
    // enable: !!postId,
    initialData: () =>
      queryClient.getQueryData(["posts"]) ||
      [].find((item: Post) => item.id === postId),
  });
}
