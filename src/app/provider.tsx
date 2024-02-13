"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "~/components/theme-provider";
import { WalletProvider } from "~/context/useWalletContext";
import { TRPCReactProvider } from "~/trpc/react";

export const queryClient = new QueryClient();

function Provider({ children }: { children: React.ReactNode }) {
  // TODO handle the animation route without the usual layout
  /* const pathname = usePathname(); */
  return (
    <TRPCReactProvider>
      <ThemeProvider
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        attribute="class"
      >
        <SessionProvider>
          <WalletProvider>
            {/* {pathname?.startsWith("/animation") ? children : { ( <>children</> ) }} */}
            {children}
          </WalletProvider>
        </SessionProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
}

export default Provider;
