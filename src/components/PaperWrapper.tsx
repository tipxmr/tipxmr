import { Paper } from "@mui/material";
import { FC, forwardRef, ReactNode } from "react";
import Title from "~/components/Title";
import { styled } from "@mui/material/styles";

interface PaperWrapperProps {
  title?: string;
  children: ReactNode;
}

const MyPaper = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(4)};
`;

const PaperWrapper: FC<PaperWrapperProps> = forwardRef<
  HTMLDivElement,
  PaperWrapperProps
>(function PaperWrapper({ title, children }, ref) {
  return (
    <MyPaper elevation={3} ref={ref}>
      <Title>{title}</Title>
      {children}
    </MyPaper>
  );
});

export default PaperWrapper;
