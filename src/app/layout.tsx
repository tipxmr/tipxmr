"use client";

import "~/styles/globals.css";

import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

import Layout from "~/components/Layout";

export const queryClient = new QueryClient();

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="en" className={`h-full`}>
      <body className="h-full">
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {pathname?.startsWith("/animation") ? (
              children
            ) : (
              <Layout>
                <TooltipProvider>
                  <Suspense fallback={<div>Loading...</div>}>
                    {children}
                  </Suspense>
                </TooltipProvider>
              </Layout>
            )}

            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
