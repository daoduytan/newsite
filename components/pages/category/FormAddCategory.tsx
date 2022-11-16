import { fetcher } from "@/lib/fetcher";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is Required" }),
  content: z.string(),
  description: z.string(),
});

type FormAddCategoryData = z.infer<typeof schema>;

const requestAddCategory = (data: FormAddCategoryData) =>
  fetcher.post("/dashboard/category", data);

export function FormAddCategory() {
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: requestAddCategory,
    onSuccess: async (dataResponse) => {
      // queryClient.setQueryData(["user"], dataResponse);
      toast({
        status: "success",
        title: "Add category Success",
      });
      reset();
    },
    onError() {
      toast({
        status: "error",
        title: "Add category Failure",
      });
    },
  });

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<FormAddCategoryData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log({ data });
  });

  return (
    <VStack
      as="form"
      align="stretch"
      spacing="5"
      noValidate
      onSubmit={onSubmit}
    >
      <FormControl isRequired isInvalid={!!errors?.title}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input {...register("title")} placeholder="Type title category" />
        <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.content}>
        <FormLabel htmlFor="content">Content</FormLabel>
        <Textarea {...register("content")} placeholder="Type title category" />
        <FormErrorMessage>{errors?.content?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.description}>
        <FormLabel htmlFor="titlte">Description</FormLabel>
        <Textarea
          {...register("description")}
          placeholder="Type description category"
        />
        <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
      </FormControl>

      <Box>
        <Button isLoading={mutation.isLoading} type="submit">
          Submit
        </Button>
      </Box>
    </VStack>
  );
}
