import create from "zustand";

export const useTestStore = create<{ loading: boolean }>()((set) => ({
  loading: true,
}));
