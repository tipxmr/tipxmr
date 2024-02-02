import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { type Metadata } from "next";
import { env } from "~/env";
import { cn } from "~/lib/utils";
import { headers } from "next/headers";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { ThemeToggle } from "~/components/ThemeToggle";
import Provider from "./provider";
import { Navbar } from "~/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const APP_NAME = "TipXMR.live";
const APP_DEFAULT_TITLE = "TipXMR";
const APP_TITLE_TEMPLATE = "%s - TipXMR";
const APP_DESCRIPTION = "Easy Monero-donations in your livestream";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  metadataBase: new URL(env.DOMAIN),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  icons: [{ rel: "icon", url: "/img/icon-192x192.png" }],
  description: APP_DESCRIPTION,
  /* TODO make it PWA */
  /* manifest: "/manifest.json", */
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        // TODO change image
        url: `${env.DOMAIN}/img/logo.png`,
        width: 800,
        height: 600,
        alt: "Site logo",
      },
      {
        // TODO change image
        url: `${env.DOMAIN}/img/logo.png`,
        width: 1800,
        height: 1600,
        alt: "Site logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        // TODO change image
        url: `${env.DOMAIN}/img/logo.png`,
        width: 800,
        height: 600,
        alt: "Site logo",
      },
      {
        // TODO change image
        url: `${env.DOMAIN}/img/logo.png`,
        width: 1800,
        height: 1600,
        alt: "Site logo",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("h-full", inter.variable)}
      suppressHydrationWarning
    >
      <body className={`bg-background p-4 text-foreground`}>
        <Provider>
          <TRPCReactProvider>
            <ThemeProvider
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              attribute="class"
            >
              <main className="relative flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1 flex-grow">{children}</div>
              </main>
              <Toaster />
            </ThemeProvider>
          </TRPCReactProvider>
        </Provider>
      </body>
    </html>
  );
}
