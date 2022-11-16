import { fetcher } from "@/lib/fetcher";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FormLoginData, FormRegisterData } from "../components";

const requestUser = () => fetcher.get("/auth/user").then((res) => res.data);

export function useUser() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: requestUser,
  });

  return query;
}

const requestLogin = (data: FormLoginData) => fetcher.post("/auth/login", data);

export function useLogin() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: requestLogin,
    onSuccess: async (dataResponse) => {
      queryClient.setQueryData(["user"], dataResponse);
      toast({
        status: "success",
        title: "Login Success",
      });
    },
    onError() {
      toast({
        status: "error",
        title: "Login Failure",
      });
    },
  });

  return mutation;
}

const registerRequest = (data: FormRegisterData) =>
  fetcher.post("/auth/register", data);

export function useRegister() {
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Register Success",
      });
    },
    onError() {
      toast({
        status: "error",
        title: "Register Failure",
      });
    },
  });

  return mutation;
}
