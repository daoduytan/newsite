import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { PostList } from "@/components/pages";
import { Button, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PostsPage() {
  return (
    <DashboardLayout>
      <DashboardLayoutContent
        title="Posts page"
        extra={
          <Link href="posts/new">
            <Button
              size="sm"
              colorScheme="blue"
              leftIcon={<Icon as={PlusIcon} w="5" h="5" />}
            >
              New Page
            </Button>
          </Link>
        }
      >
        <PostList />
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
