import { useUpdateSetting } from "@/hooks/setting.hooks";
import { fetcher } from "@/lib/fetcher";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Setting } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  title: z.string(),
  description: z.string(),
});

type SettingData = z.infer<typeof schema>;

interface Props {
  setting?: Setting;
}

function requestUpdateSetting(data: any) {
  return fetcher.post("/dashboard/setting", data);
}

export function SettingForm({ setting }: Props) {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: setting?.title,
      description: setting?.description,
    },
  });

  console.log({ errors });

  const { mutate, isLoading } = useMutation({
    mutationFn: requestUpdateSetting,
    onSuccess(data) {
      toast({
        status: "success",
        title: "Update post Success",
      });
    },
    onError() {
      toast({
        status: "error",
        title: "Update setting failed",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <VStack spacing="5" align="stretch">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input {...register("title")} placeholder="Type title" />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            {...register("description")}
            placeholder="Type description"
          />
        </FormControl>
        <Box>
          <Button isLoading={isLoading} type="submit">
            Save
          </Button>
        </Box>
      </VStack>
    </form>
  );
}
