import { useOptions } from "@/hooks/option.hooks";

export function OptionList() {
  const { isLoading, data } = useOptions();
  if (isLoading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
