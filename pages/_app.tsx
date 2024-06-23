import "@/styles/globals.css";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <DynamicContextProvider
          settings={{
            environmentId: "2582ee24-6500-4383-9bf2-73b6c4225626",
            walletConnectors: [StarknetWalletConnectors],
            bridgeChains: [
              {
                chain: "STARK",
              },
            ],
          }}
        >
          <Component {...pageProps} />
        </DynamicContextProvider>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
