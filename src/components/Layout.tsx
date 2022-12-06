"use client";

import { FC, ReactNode } from "react";

import Drawer from "~/components/Drawer";
import Footer from "~/components/Footer";
import useUser from "~/lib/useUser";

import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { user: session } = useUser();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar />
      <div className="flex grow flex-row">
        {session?.isLoggedIn && <Drawer />}
        <main className="container mt-8 mb-2">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
