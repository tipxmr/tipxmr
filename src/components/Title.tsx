import { ReactNode, FC } from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
  children?: ReactNode;
}

const Title: FC<TitleProps> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      align="center"
      gutterBottom
    >
      {children}
    </Typography>
  );
};

export default Title;
