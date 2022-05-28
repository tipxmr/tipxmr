import { FC } from "react";
import { TextField } from "@mui/material";

interface SeedInputProps {}

const SeedInput: FC<SeedInputProps> = ({}) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id="seed"
      label="XMR seed"
      name="seed"
      rows={4}
      multiline
      autoFocus
    />
  );
};

export default SeedInput;
