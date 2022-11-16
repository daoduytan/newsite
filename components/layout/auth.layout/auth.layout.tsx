import { useUser } from "@/hooks/auth";
import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

export function AuthLayout({ children }: Props) {
  const router = useRouter();
  const { isLoading, data } = useUser();
  useEffect(() => {
    if (!isLoading && !!data) {
      router.push("/dashboard");
    }
  }, [data, isLoading]);

  return <Center minH="100vh">{children}</Center>;
}
