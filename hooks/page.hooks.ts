import { fetcher } from "@/lib/fetcher";
import { ResponseData } from "@/types/response";
import { Page } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

function requestPages() {
  return fetcher
    .get<ResponseData<Page[]>>("/dashboard/pages")
    .then((res) => res.data.data);
}

export const usePages = () => {
  return useQuery({
    queryKey: ["pages"],
    queryFn: requestPages,
  });
};
