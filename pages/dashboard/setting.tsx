import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { SettingForm } from "@/components/pages";
import { useSetting } from "@/hooks/setting.hooks";

export default function SettingPage() {
  const { data, isLoading } = useSetting();

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <SettingForm setting={data} />;
  };

  return (
    <DashboardLayout>
      <DashboardLayoutContent title="Setting">
        {renderContent()}
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
