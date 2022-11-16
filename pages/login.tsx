import { Box, Card, CardBody, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { AuthLayout, LoginForm } from "../components";

export default function LoginPage() {
  return (
    <AuthLayout>
      <VStack spacing="30px">
        <Text fontWeight="bold" fontSize="2xl">
          Login
        </Text>
        <Card>
          <CardBody>
            <LoginForm />
          </CardBody>
        </Card>
        <Box>
          <Link href="/register">Register</Link>
        </Box>
      </VStack>
    </AuthLayout>
  );
}
