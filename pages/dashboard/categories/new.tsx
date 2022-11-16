import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { FormAddCategory } from "@/components/pages";

export default function FormAddCategoryPage() {
  return (
    <DashboardLayout>
      <DashboardLayoutContent title="Form category">
        <FormAddCategory />
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
