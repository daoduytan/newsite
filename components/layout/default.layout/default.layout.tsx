import { useSetting } from "context/setting.context";

export function DefaultLayout({}) {
  const { setting } = useSetting();
  return <div>DefaultLayout</div>;
}
