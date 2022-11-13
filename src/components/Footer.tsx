import { FC } from "react";

import Copyright from "./Copyright";

const Footer: FC = () => {
  return (
    <footer className="mt-auto bg-gray-200 px-2 py-3 text-center">
      <Copyright />
    </footer>
  );
};

export default Footer;
