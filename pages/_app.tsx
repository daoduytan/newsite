import { ChakraProvider } from "@chakra-ui/react";
import { Setting } from "@prisma/client";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { SettingContext } from "context/setting.context";
import type { AppProps } from "next/app";
import { useState } from "react";

import "../styles/globals.css";

type Props = AppProps & {
  setting?: Setting;
};

export default function App({ Component, pageProps, setting }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  console.log({ setting });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <ChakraProvider>
          <SettingContext setting={setting}>
            <Component {...pageProps} />
          </SettingContext>
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

App.getInitialProps = async () => {
  const client = new QueryClient();

  const data = await client.fetchQuery({
    queryKey: ["setting"],
    queryFn: () =>
      axios
        .get("http://localhost:3000/api/dashboard/setting")
        .then((res) => res.data.data),
  });

  return {
    setting: data,
  };
};
