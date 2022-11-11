import { FC } from "react";

import Copyright from "./Copyright";

const Footer: FC = () => {
  return (
    <footer className="px-2 py-3 mt-auto bg-gray-200 text-center">
      <Copyright />
    </footer>
  );
};

export default Footer;
