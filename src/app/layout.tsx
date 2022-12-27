"use client";

import "~/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";

import Layout from "~/components/Layout";

export const queryClient = new QueryClient();

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="en" className={`h-full`}>
      <body className="h-full">
        <QueryClientProvider client={queryClient}>
          {pathname?.startsWith("/animation") ? (
            children
          ) : (
            <Layout>
              <TooltipProvider>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </TooltipProvider>
            </Layout>
          )}

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
