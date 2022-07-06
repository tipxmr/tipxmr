import { Box } from "@mui/material";
import { ReactNode } from "react";

const HorizontalCenter = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <Box
        sx={{
          mx: "auto",
          p: 1,
          m: 1,
          borderRadius: 1,
          textAlign: "center",
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default HorizontalCenter;
