import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { FormPage } from "@/components/pages";

export default function NewPage() {
  return (
    <DashboardLayout>
      <DashboardLayoutContent title="New page">
        <FormPage />
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
