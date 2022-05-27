import { Paper } from "@mui/material";
import { FC, ReactNode } from "react";
import Title from "~/components/Title";

interface IPaperWrapper {
  title?: string;
  children: ReactNode;
}

const PaperWrapper: FC<IPaperWrapper> = (props) => {
  const { title, children } = props;

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      {title && <Title>{title}</Title>}
      {children}
    </Paper>
  );
};

export default PaperWrapper;
