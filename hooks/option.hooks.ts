import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

function requestOptions() {
  return fetcher.get("/dashboard/options").then((res) => res.data.data);
}

export const useOptions = () => {
  return useQuery({
    queryKey: ["options"],
    queryFn: requestOptions,
  });
};
