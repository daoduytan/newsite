import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { FormEditCategory } from "@/components/pages";
import { useCategory } from "@/hooks/category.hooks";
import { Spinner } from "@chakra-ui/react";

export default function CategoryDetailPage() {
  const { isLoading, data } = useCategory();

  console.log({ data, isLoading });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <DashboardLayout>
      <DashboardLayoutContent title={data.title}>
        <FormEditCategory />
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
