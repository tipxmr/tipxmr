import { Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { PaperWrapper } from "~/components";

interface ISeedOutput {
  seedPhrase: string;
}

const SeedOutput: FC<ISeedOutput> = ({ seedPhrase }) => {
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
