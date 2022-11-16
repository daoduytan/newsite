import { Card, CardBody } from "@chakra-ui/react";
import { AuthLayout, RegisterForm } from "../components";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <Card>
        <CardBody>
          <RegisterForm />
        </CardBody>
      </Card>
    </AuthLayout>
  );
}
