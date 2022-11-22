import { usePosts } from "@/hooks/post.hooks";
import {
  Button,
  Card,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function PostList() {
  const { isLoading, data } = usePosts();

  console.log({ isLoading, data });

  if (isLoading) {
    return <Spinner />;
  }

  const categories = data || [];

  return (
    <Card>
      <TableContainer>
        <Table>
          <Thead>
            <Th>Title</Th>
            <Th>Categories</Th>
            <Th />
          </Thead>
          <Tbody>
            {categories.map((item) => (
              <Tr key={item.id}>
                <Td>{item.title}</Td>
                <Td>
                  <HStack>
                    {item.categories.map((i) => (
                      <Tag key={i.id}>{i.title}</Tag>
                    ))}
                  </HStack>
                </Td>
                <Td textAlign="right">
                  <Link href={`/dashboard/posts/${item.id}`}>
                    <IconButton
                      size="sm"
                      icon={<Icon as={PencilSquareIcon} w="5" h="5" />}
                      aria-label="Edit"
                    ></IconButton>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}
