import { ReactNode, FC } from "react";

import Drawer from "~/components/Drawer";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import useUser from "~/lib/useUser";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { user: session } = useUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-row grow">
        {session?.isLoggedIn && <Drawer />}
        <main className="container mx-auto mt-8 mb-2">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
