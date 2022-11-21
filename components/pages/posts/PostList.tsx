import { usePost, usePosts } from "@/hooks/post.hooks";

export function PostList() {
  const { isLoading, data } = usePosts();

  console.log({ isLoading, data });

  return <div className="border rounded border-slate-300">post list</div>;
}
