"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { WalletProvider } from "~/context/useWalletContext";

export const queryClient = new QueryClient();

function Provider({ children }: { children: React.ReactNode }) {
  // TODO handle the animation route without the usual layout
  /* const pathname = usePathname(); */
  return (
    <SessionProvider>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          {/* {pathname?.startsWith("/animation") ? children : { ( <>children</> ) }} */}
          {children}
        </QueryClientProvider>
      </WalletProvider>
    </SessionProvider>
  );
}

export default Provider;
