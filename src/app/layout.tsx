import "~/styles/globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Suspense } from "react";

import Layout from "~/components/Layout";

import Provider from "./provider";

export const metadata: Metadata = {
  title: "TipXMR - Monero Tipping Service",
  description:
    "TipXMR is a Monero Tipping Service. Tip your favorite content creators with Monero! Earn Monero by going live!",
  robots: "index, follow",
  keywords:
    "monero, xmr, tip, tipping, service, livestream, stream, live, tipxmr, monero obs, obs, streamlabs",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Provider>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
