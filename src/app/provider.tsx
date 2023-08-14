"use client";

import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export const queryClient = new QueryClient();

function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {pathname?.startsWith("/animation") ? (
          children
        ) : (
          <TooltipProvider>{children}</TooltipProvider>
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default Provider;
