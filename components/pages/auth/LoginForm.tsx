import { useLogin } from "@/hooks/auth";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  username: z.string().min(1, { message: "User is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type FormLoginData = z.infer<typeof schema>;

export function LoginForm() {
  const mutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <VStack spacing="6" as="form" noValidate onSubmit={onSubmit}>
      <FormControl isRequired isInvalid={!!errors?.username}>
        <FormLabel>Username</FormLabel>
        <Input {...register("username")} placeholder="Type usename here" />
        <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors?.password}>
        <FormLabel>Password</FormLabel>
        <Input {...register("password")} placeholder="Type password here" />
        <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
      </FormControl>
      <Button isLoading={mutation.isLoading} type="submit" colorScheme="blue">
        Login
      </Button>
    </VStack>
  );
}
