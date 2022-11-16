import { useCategories } from "@/hooks/category.hooks";
import { HStack, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export function CategoryList() {
  const router = useRouter();
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {data.map((item) => (
        <HStack key={item.id}>
          <Text>{item.title}</Text>
          <Link href={`${router.pathname}/${item.id}`}>Go</Link>
        </HStack>
      ))}
    </div>
  );
}
