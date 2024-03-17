"use client";

import { QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "~/components/theme-provider";
import { WalletProvider } from "~/context/useWalletContext";
import { TRPCReactProvider } from "~/trpc/react";
import { WebSocketProvider } from "next-ws/client";
import { env } from "~/env";

export const queryClient = new QueryClient();

function Provider({ children }: { children: React.ReactNode }) {
  // TODO handle the animation route without the usual layout
  /* const pathname = usePathname(); */
  return (
    <WebSocketProvider url={env.NEXT_PUBLIC_WS_URL}>
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
    </WebSocketProvider>
  );
}

export default Provider;
