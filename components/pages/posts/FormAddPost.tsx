"use client";
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  VStack,
  Box,
  FormErrorMessage,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useCategories } from "@/hooks/category.hooks";
import { slugify } from "@/helps/slugify";

const schema = z.object({
  title: z.string().min(1, { message: "Title is Required" }),
  content: z.string(),
  description: z.string(),
  categoryIds: z.array(z.string()),
  // slug: z.string()
});

export type AddPostData = z.infer<typeof schema>;

const requestAddPost = (data: AddPostData) =>
  fetcher.post("/dashboard/post", data);

export function FormAddPost() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPostData>({
    resolver: zodResolver(schema),
  });

  const { data: categoriesData } = useCategories();

  const mutation = useMutation({
    mutationFn: requestAddPost,
    onSuccess: async (dataResponse) => {
      console.log({dataResponse})
      // queryClient.setQueryData(["user"], dataResponse);
      toast({
        status: "success",
        title: "Add post Success",
      });
      reset();
    },
    onError() {
      toast({
        status: "error",
        title: "Add post Failure",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    const slug = slugify(data.title)
    mutation.mutate({...data});
  });

  console.log({errors})

  return (
    <VStack
      align="stretch"
      spacing="5"
      as="form"
      onSubmit={onSubmit}
      noValidate
    >
      <FormControl isInvalid={!!errors?.title} isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          {...register("title")}
          name="title"
          placeholder="Type title post here"
        />
        <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="content">Content</FormLabel>
        <Textarea
          {...register("content")}
          name="content"
          placeholder="Type description post here"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          {...register("description")}
          name="description"
          placeholder="Type description post here"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Categories</FormLabel>
        <select {...register("categoryIds")} placeholder="Select Category" multiple>
          {categoriesData?.map((i) => (
            <option key={i.id} value={i.id}>
              {i.title}
            </option>
          ))}
        </select>
      </FormControl>

      <Box>
        <Button isLoading={mutation.isLoading} type="submit">
          Add post
        </Button>
      </Box>
    </VStack>
  );
}
