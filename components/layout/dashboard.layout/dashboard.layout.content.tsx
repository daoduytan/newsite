import { Box, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { DashboardLayoutHeading } from "./dashboard.layout.heading";

interface Props {
  children: ReactNode;
  title?: string;
  extra?: ReactNode;
}

export function DashboardLayoutContent({ children, title, extra }: Props) {
  return (
    <Flex overflow="hidden" direction="column" flex={1}>
      <DashboardLayoutHeading />
      <VStack align="stretch" px="6" spacing="6">
        <HStack>
          <Text fontSize="xl">{title}</Text>
          <Spacer />
          {extra}
        </HStack>
        <Box>{children}</Box>
      </VStack>
    </Flex>
  );
}
