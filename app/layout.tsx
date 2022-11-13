"use client";

import "../src/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";

import Layout from "~/components/Layout";

const queryClient = new QueryClient();

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full bg-gray-100`}>
      <body className="h-full">
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
          </Layout>
        </QueryClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
