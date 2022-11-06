import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Suspense } from "react";
import Layout from "~/components/Layout";
import createEmotionCache from "../styles/createEmotionCache";
import theme from "../styles/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Suspense
              fallback={<Typography variant="overline">Loading...</Typography>}
            >
              <Component {...pageProps} />
            </Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default MyApp;
