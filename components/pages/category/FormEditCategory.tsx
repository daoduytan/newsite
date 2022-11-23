import { Editor } from "@/components/ui";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is Required" }),
  slug: z.string().min(1, { message: "Slug is Required" }),
  content: z.string(),
  description: z.string(),
});

type FormEditCategoryData = z.infer<typeof schema>;

const requestEditCategory = (data: FormEditCategoryData, categoryId?: string) =>
  fetcher.put(`/dashboard/category/${categoryId}`, data);

export function FormEditCategory() {
  const router = useRouter();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: (data: FormEditCategoryData) =>
      requestEditCategory(data, router.query.id?.toString()),
    onSuccess: async (dataResponse) => {
      // queryClient.setQueryData(["user"], dataResponse);
      toast({
        status: "success",
        title: "Edit category Success",
      });
      reset();
    },
    onError() {
      toast({
        status: "error",
        title: "Edit category Failure",
      });
    },
  });

  const queryClient = useQueryClient();

  const {
    formState: { errors },
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
  } = useForm<FormEditCategoryData>({
    resolver: zodResolver(schema),
    defaultValues: queryClient.getQueryData(["categories", router.query.id]),
  });

  const handleChangeContent = (value?: string) => {
    setValue("content", value || "");
  };

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const content = watch("content");

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

      <FormControl isRequired isInvalid={!!errors?.title}>
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <Input {...register("slug")} placeholder="Type slug category" />
        <FormErrorMessage>{errors?.slug?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.content}>
        <FormLabel htmlFor="content">Content</FormLabel>
        <Editor value={content} onChange={handleChangeContent} />
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
