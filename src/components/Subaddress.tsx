import { Chip, Snackbar } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { FC, useState } from "react";

interface SubaddressProps {
  address: string;
}

const Subaddress: FC<SubaddressProps> = ({ address }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(String(address));
  };

  return (
    <>
      <Chip
        icon={<ReceiptIcon color="primary" />}
        label={address}
        onClick={handleClick}
      />
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        message="Copied XMR address to clipboard"
      />
    </>
  );
};

export default Subaddress;
