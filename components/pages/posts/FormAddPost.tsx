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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is Required" }),
  content: z.string(),
  description: z.string(),
  categtory_ids: z.string(),
});

type FormAddPostData = z.infer<typeof schema>;

export function FormAddPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAddPostData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {});

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

      <Box>
        <Button type="submit">Add post</Button>
      </Box>
    </VStack>
  );
}
