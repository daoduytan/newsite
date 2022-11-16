import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { CategoryList } from "@/components/pages";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <DashboardLayoutContent
        extra={<Link href="categories/new">Add new</Link>}
        title="Categories"
      >
        <CategoryList />
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
