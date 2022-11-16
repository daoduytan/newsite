import { fetcher } from "@/lib/fetcher";
import type { ResponseData } from "@/types/response";
import type { Category } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const requestCategories = () =>
  fetcher
    .get<ResponseData<Category[]>>("/dashboard/categories")
    .then((res) => res.data.data);

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: requestCategories,
    initialData: [],
  });
}

const requestCategory = (categoryId?: string) =>
  fetcher
    .get<ResponseData<Category>>(`/dashboard/category/${categoryId}`)
    .then((res) => res.data.data);

export function useCategory() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const categoryId = router.query.id;

  return useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => requestCategory(categoryId?.toString()),
    enabled: !!categoryId,
    initialData: () =>
      queryClient
        .getQueryData(["categories"])
        ?.find((item: Category) => item.id === categoryId),
  });
}
