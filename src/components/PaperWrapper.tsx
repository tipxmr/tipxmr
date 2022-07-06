import { Paper } from "@mui/material";
import { FC, forwardRef, ReactNode } from "react";
import Title from "~/components/Title";

interface PaperWrapperProps {
  title?: string;
  children: ReactNode;
}

const PaperWrapper: FC<PaperWrapperProps> = forwardRef<
  HTMLDivElement,
  PaperWrapperProps
>(function PaperWrapper(props, ref) {
  const { title, children } = props;

  return (
    <Paper elevation={3} sx={{ p: 4 }} ref={ref}>
      {title && <Title>{title}</Title>}
      {children}
    </Paper>
  );
});

export default PaperWrapper;
