"use client";
import { slugify } from "@/helps/slugify";
import { useCategories } from "@/hooks/category.hooks";
import { PostResponse } from "@/hooks/post.hooks";
import { fetcher } from "@/lib/fetcher";
import { ResponseData } from "@/types/response";
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
import { pick } from "lodash";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is Required" }),
  content: z.string(),
  description: z.string(),
  categoryIds: z.array(z.string()),
});

export type AddPostData = z.infer<typeof schema>;

const requestAddPost = (data: AddPostData) =>
  fetcher
    .post<ResponseData<PostResponse>>("/dashboard/post", data)
    .then((res) => res.data.data);

type PostUpdateData = AddPostData & { id: string };

const requestUpdatePost = ({ id, ...rest }: PostUpdateData) =>
  fetcher
    .put<ResponseData<PostResponse>>(`/dashboard/post/${id}`, { ...rest })
    .then((res) => res.data.data);

interface Props {
  post?: PostResponse;
}

export function FormPost({ post }: Props) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPostData>({
    resolver: zodResolver(schema),
    defaultValues: pick(post, [
      "title",
      "content",
      "description",
      "categoryIds",
    ]),
  });

  const { data: categoriesData } = useCategories();

  const mutationAddPost = useMutation({
    mutationFn: requestAddPost,
    onSuccess: async (dataResponse: any) => {
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

  const mutationUpdatePost = useMutation({
    mutationFn: requestUpdatePost,
    onSuccess: async (dataResponse) => {
      queryClient.setQueryData(["posts", { postId: post?.id }], dataResponse);
      toast({
        status: "success",
        title: "Update post Success",
      });
    },
    onError() {
      toast({
        status: "error",
        title: "Update post Failure",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    if (!!post) {
      mutationUpdatePost.mutate({ ...data, id: post.id });
    } else {
      mutationAddPost.mutate(data);
    }
  });

  console.log({ errors });

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
        <select
          {...register("categoryIds")}
          placeholder="Select Category"
          multiple
        >
          {categoriesData?.map((i) => (
            <option key={i.id} value={i.id}>
              {i.title}
            </option>
          ))}
        </select>
      </FormControl>

      <Box>
        <Button
          isLoading={mutationAddPost.isLoading || mutationUpdatePost.isLoading}
          type="submit"
        >
          {!!post ? "Update post" : "Add post"}
        </Button>
      </Box>
    </VStack>
  );
}
