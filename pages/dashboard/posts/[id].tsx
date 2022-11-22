import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { FormPost } from "@/components/pages";
import { usePost } from "@/hooks/post.hooks";
import { Spinner } from "@chakra-ui/react";

export default function PostDetailpage() {
  const { data, isLoading } = usePost();

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    return <FormPost post={data} />;
  };

  return (
    <DashboardLayout>
      <DashboardLayoutContent title="Detail post">
        {renderContent()}
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
