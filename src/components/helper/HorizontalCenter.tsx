import { ReactNode } from "react";

const HorizontalCenter = ({ children }: { children?: ReactNode }) => {
  return <div className="center m-1 mx-auto rounded p-1">{children}</div>;
};

export default HorizontalCenter;
