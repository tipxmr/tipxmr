import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={`h-full bg-gray-100`}>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className={`h-full`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
