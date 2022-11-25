"use client";

import "~/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";

import Layout from "~/components/Layout";
import { usePathname } from "next/navigation";

export const queryClient = new QueryClient();

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="en" className={`h-full bg-gray-100`}>
      <body className="h-full">
        <QueryClientProvider client={queryClient}>
          {pathname?.startsWith("/animation") ? (
            children
          ) : (
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </Layout>
          )}

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
