import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { PageList } from "@/components/pages";
import { Button, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Pages() {
  return (
    <DashboardLayout>
      <DashboardLayoutContent
        title="Pages"
        extra={
          <Link href="/dashboard/pages/add">
            <Button leftIcon={<Icon as={PlusIcon} />}>Add page</Button>
          </Link>
        }
      >
        <PageList />
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
