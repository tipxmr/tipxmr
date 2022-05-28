import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import PaperWrapper from "~/components/PaperWrapper";

interface SeedOutputProps {
  seedPhrase: string;
}

const SeedOutput: FC<SeedOutputProps> = ({ seedPhrase }) => {
  return (
    <Tooltip title="This is your XMR seed" placement="bottom">
      <PaperWrapper>
        <Typography
          component="p"
          variant="h3"
          sx={{ fontSize: "1.1rem" }}
          align="center"
        >
          {seedPhrase.toLowerCase()}
        </Typography>
      </PaperWrapper>
    </Tooltip>
  );
};

export default SeedOutput;
