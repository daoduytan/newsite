import { Setting } from "@prisma/client";
import { createContext, ReactNode, useContext, useMemo } from "react";

interface IContext {
  setting?: Setting;
}

const Context = createContext<IContext>({});

interface Props {
  children: ReactNode;
  setting?: Setting;
}

export const SettingContext = ({ children, setting }: Props) => {
  const value = useMemo(() => ({ setting }), [setting]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSetting = () => {
  return useContext(Context);
};
