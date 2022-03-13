import { ReactNode, FC } from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
  children?: ReactNode;
}

const Title: FC<TitleProps> = (props) => {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      align="center"
      gutterBottom
    >
      {props.children}
    </Typography>
  );
};

export default Title;
