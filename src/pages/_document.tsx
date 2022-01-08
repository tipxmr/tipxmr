// import type {
//     GetServerSideProps,
//     InferGetServerSidePropsType,
//     NextPage,
//   } from "next";
//   import Head from "next/head";
//   import { Streamer } from "../data/types";
//   import prisma from "../lib/prisma";

import Document, { Head, Html, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";

import createEmotionCache from "../styles/createEmotionCache";
import theme from "../styles/theme";
//   type Props = {
//     streamers: Streamer[];
//   };

//   export const getServerSideProps: GetServerSideProps<Props> = async () => {
//     const streamers = await prisma.streamer.findMany({});
//     return { props: { streamers } };
//   };

//   type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

//   const Home: NextPage<ServerSideProps> = ({ streamers }) => {
//     return (
//       <div>
//         <Head>
//           <title>TipXMR</title>
//           <meta name="description" content="" />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>
//         <main>
//           <ul>
//             {streamers.map((streamer) => (
//               <li key={streamer.id}>{streamer.name}</li>
//             ))}
//           </ul>
//         </main>
//       </div>
//     );
//   };

//   export default Home;

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

export default MyDocument;
