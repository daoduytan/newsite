import { fetcher } from "@/lib/fetcher";
import { ResponseData } from "@/types/response";
import { Post } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const requestPosts = () =>
  fetcher
    .get<ResponseData<Post[]>>("/dashboard/posts")
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
  const postId = router.query.id;

  return useQuery({
    queryKey: ["posts", postId?.toString()],
    queryFn: () => requestPost(postId?.toString()),
    enable: !!postId,
    initialData: () =>
      queryClient
        .getQueryData(["posts"])
        ?.find((item: Post) => item.id === postId),
  });
}
