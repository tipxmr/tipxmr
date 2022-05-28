import { useState, FC, ChangeEvent } from "react";
import { Box, OutlinedInput, InputAdornment } from "@mui/material";

interface NumberInputProps {
  label?: string;
  unit?: string;
}

const NumberInput: FC<NumberInputProps> = ({ label, unit = "XMR" }) => {
  const [amount, setAmount] = useState(0);
  const handleChangeAmount = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setAmount(Number(e.target.value));
  };
  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <OutlinedInput
        label={label}
        value={amount}
        onChange={handleChangeAmount}
        endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
        name="numberformat"
        id="numberformat-input"
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
      />
    </Box>
  );
};
export default NumberInput;
