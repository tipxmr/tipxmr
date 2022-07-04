import Head from "next/head";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { SWRConfig } from "swr";
import createEmotionCache from "../styles/createEmotionCache";
import Layout from "~/components/Layout";
import fetchJson from "~/lib/fetchJson";

import theme from "../styles/theme";
import store from "../store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Suspense } from "react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Suspense
        fallback={<Typography variant="overline">Loading...</Typography>}
      >
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <CssBaseline />
              <ThemeProvider theme={theme}>
                <Layout>
                  <Component {...pageProps} />
                  <ReactQueryDevtools initialIsOpen={false} />
                </Layout>
              </ThemeProvider>
            </QueryClientProvider>
          </Provider>
        </CacheProvider>
      </Suspense>
    </SWRConfig>
  );
}

export default MyApp;
