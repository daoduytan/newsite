import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

export function requestSetting() {
  return fetcher.get("/dashboard/setting").then((res) => res.data.data);
}

export const useSetting = () => {
  return useQuery({
    queryKey: ["setting"],
    queryFn: requestSetting,
  });
};
