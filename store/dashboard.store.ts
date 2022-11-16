import create from "zustand";

type DashboardState = {
  open: boolean;
};
const initialState: DashboardState = {
  open: true,
};

type DashboardStore = DashboardState & {
  toggle: () => void;
};

export const useDashboardStore = create<DashboardStore>()((set) => ({
  ...initialState,
  toggle: () => set((state) => ({ open: !state.open })),
}));
