import { usePages } from "@/hooks/page.hooks";
import {
  Card,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const PageList = (props: {}) => {
  const { isLoading, data } = usePages();
  return (
    <div>
      {JSON.stringify(data)}

      <Card>
        <TableContainer>
          <Table>
            <Thead>
              <Th>Title</Th>
            </Thead>
            <Tbody>
              {data?.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.title}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};
