interface Props {
  posts: any[];
}

export function PostList({ posts = [] }: Props) {
  return <div className="border rounded border-slate-300">post list</div>;
}
