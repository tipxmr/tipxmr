import Head from "next/head";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import createEmotionCache from "../styles/createEmotionCache";
import Layout from "~/components/Layout";
import theme from "../styles/theme";
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
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
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
