import { fetcher } from "@/lib/fetcher";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string(),
  description: z.string(),
});

type FormAddPageData = z.infer<typeof schema>;

const requestAddPage = (data) => fetcher.post("/dashboard/page", data);

export function FormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAddPageData>({ resolver: zodResolver(schema) });

  const mutationAddPage = useMutation({
    mutationFn: (data) => requestAddPage(data),
  });

  const onSubmit = handleSubmit((data) => {
    mutationAddPage.mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <FormControl isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
        <Input {...register("title")} />
      </FormControl>
      <FormControl isInvalid={!!errors?.title}>
        <FormLabel>Description</FormLabel>
        <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
        <Textarea {...register("content")} />
      </FormControl>
      <FormControl isInvalid={!!errors?.title}>
        <FormLabel>Content</FormLabel>
        <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
        <Textarea {...register("description")} />
      </FormControl>

      <Button isLoading={mutationAddPage.isLoading} type="submit">
        Add page
      </Button>
    </form>
  );
}
