import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import Link from "next/link";

export default function PostsPage() {
  return (
    <DashboardLayout>
      <DashboardLayoutContent
        title="Posts page"
        extra={<Link href="posts/new">New Page</Link>}
      >
        <div>Postspage content</div>
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
