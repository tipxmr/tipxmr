import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";
import { progressAtom, syncEndHeightAtom, syncHeightAtom } from "~/store";

interface ISyncProgress {}

const SyncProgress: FC<ISyncProgress> = ({}) => {
  const [endHeight] = useAtom(syncEndHeightAtom);
  const [progress] = useAtom(progressAtom);
  const [height] = useAtom(syncHeightAtom);

  return (
    <Box>
      <Box mb={1}>
        <Typography
          align="center"
          component="p"
          variant="button"
          sx={{ paddingRight: 1 }}
        >
          Sync
        </Typography>

        <Chip label={`${progress}%`} sx={{ width: "100px" }} />
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: "200px" }}
      />

      <Typography variant="caption" align="right">
        {height} blocks synced out of {endHeight} blocks
      </Typography>
    </Box>
  );
};

export default SyncProgress;
