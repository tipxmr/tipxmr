import { Paper } from "@mui/material";
import { FC, forwardRef, ReactNode } from "react";

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
      {title && <h3 className="text-center">{title}</h3>}
      {children}
    </Paper>
  );
});

export default PaperWrapper;
