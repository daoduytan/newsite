import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { OptionList } from "@/components/pages";
import { Button, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function OptionsPage() {
  return (
    <DashboardLayout>
      <DashboardLayoutContent
        title="Options"
        extra={
          <Link href="dashboard/options/new">
            <Button leftIcon={<Icon as={PlusIcon} />}>New option</Button>
          </Link>
        }
      >
        <OptionList />
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
