import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/outline";
import { MenuToggle } from "./menu-toggle";

export function DashboardLayoutHeading() {
  return (
    <HStack px="6" h="20">
      <MenuToggle />
      <Spacer />

      <Box>
        <Menu matchWidth placement="right-end">
          <MenuButton>
            <UserIcon className="h-5 w-5" />
            <ChevronDownIcon className="h-3 w-3" />
          </MenuButton>
          <MenuList>
            <MenuItem>dasd</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </HStack>
  );
}
