"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export const queryClient = new QueryClient();

function Provider({ children }: { children: React.ReactNode }) {
  // TODO handle the animation route without the usual layout
  /* const pathname = usePathname(); */
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {/* {pathname?.startsWith("/animation") ? children : { ( <>children</> ) }} */}
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default Provider;
