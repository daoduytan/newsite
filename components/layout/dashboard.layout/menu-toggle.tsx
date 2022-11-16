import { Bars3Icon } from "@heroicons/react/24/outline";
import { useDashboardStore } from "../../../store/dashboard.store";

export function MenuToggle() {
  const { toggle } = useDashboardStore();
  return <Bars3Icon className="w-6 h-6 cursor-pointer" onClick={toggle} />;
}
