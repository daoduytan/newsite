import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { PostList } from "@/components/pages";
import Link from "next/link";

export default function PostsPage() {
  return (
    <DashboardLayout>
      <DashboardLayoutContent
        title="Posts page"
        extra={<Link href="posts/new">New Page</Link>}
      >
        <PostList />
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
