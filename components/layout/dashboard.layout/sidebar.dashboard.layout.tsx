import { useDashboardStore } from "@/store/dashboard.store";
import { Flex, HStack, Text } from "@chakra-ui/react";
import {
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  NewspaperIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { cloneElement, ReactElement } from "react";

const menus: Array<{ label: string; href: string; icon: ReactElement }> = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Squares2X2Icon />,
  },
  {
    label: "Posts",
    href: "/dashboard/posts",
    icon: <NewspaperIcon />,
  },
  {
    label: "Categories",
    href: "/dashboard/categories",
    icon: <FolderIcon />,
  },
  {
    label: "Pages",
    href: "/dashboard/pages",
    icon: <DocumentDuplicateIcon />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Cog6ToothIcon />,
  },
];

function Navigation() {
  const { open } = useDashboardStore();

  return (
    <div className="grid gap-4">
      {menus.map((item) => (
        <Link
          className="flex items-center px-5 text-sm hover:text-white"
          href={item.href}
          key={item.href}
        >
          <div className="mr-4">
            {cloneElement(item.icon, { className: "w-6 h-6" })}
          </div>
          {open && <span>{item.label}</span>}
        </Link>
      ))}
    </div>
  );
}

export function SidebarDashboardLayout() {
  const { open } = useDashboardStore();

  return (
    <Flex
      direction="column"
      h="100vh"
      borderRight="1px"
      borderRightColor="gray.800"
      bgColor="gray.900"
      w={open ? "250px" : "64px"}
      color="slategray"
    >
      <HStack px="6" h="20">
        <Text>Logo</Text>
      </HStack>
      <Navigation />
      <div className="flex-1"></div>
      <div className="flex items-center border-t border-slate-800 h-20 px-4">
        footer
      </div>
    </Flex>
  );
}
