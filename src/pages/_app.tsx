import Head from "next/head";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SWRConfig } from "swr";
import createEmotionCache from "../styles/createEmotionCache";
import Layout from "~/components/Layout";
import fetchJson from "~/lib/fetchJson";

import theme from "../styles/theme";
import store from "../store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

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
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
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
    </SWRConfig>
  );
}

export default MyApp;

/*
 *
 * export default function StickyFooter() {
 *   return (
 *     <Box
 *       sx={{
 *         display: 'flex',
 *         flexDirection: 'column',
 *         minHeight: '100vh',
 *       }}
 *     >
 *       <CssBaseline />
 *       <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
 *         <Typography variant="h2" component="h1" gutterBottom>
 *           Sticky footer
 *         </Typography>
 *         <Typography variant="h5" component="h2" gutterBottom>
 *           {'Pin a footer to the bottom of the viewport.'}
 *           {'The footer will move as the main element of the page grows.'}
 *         </Typography>
 *         <Typography variant="body1">Sticky footer placeholder.</Typography>
 *       </Container>
 *
 *     </Box>
 *   );
 * } */
