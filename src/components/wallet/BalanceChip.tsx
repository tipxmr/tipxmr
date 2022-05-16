import { Box, Chip, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";
import { balanceAtom } from "~/store";

interface IWalletBalance {}

const WalletBalance: FC<IWalletBalance> = ({}) => {
  const [balance] = useAtom(balanceAtom);

  return (
    <Box>
      <Typography
        align="center"
        component="p"
        variant="button"
        sx={{ paddingRight: 1 }}
      >
        Balance
      </Typography>

      <Chip label={`${balance} XMR`} sx={{ width: "100px" }} />
    </Box>
  );
};

export default WalletBalance;
