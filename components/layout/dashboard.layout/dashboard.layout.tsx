import { useUser } from "@/hooks/auth";
import { Box, Center, Flex, Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { SidebarDashboardLayout } from "./sidebar.dashboard.layout";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const toast = useToast();
  const router = useRouter();
  const { isLoading, data } = useUser();

  useEffect(() => {
    if (!isLoading && !data) {
      toast({
        status: "error",
        title: "Not allowed",
      });

      router.push("/");
    }
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex overflow="hidden">
      <SidebarDashboardLayout />
      <Box flex="1" className="h-screen">
        {children}
      </Box>
    </Flex>
  );
}
