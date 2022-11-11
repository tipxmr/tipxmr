import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Suspense } from "react";
import Layout from "~/components/Layout";

import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Component {...pageProps} />
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
