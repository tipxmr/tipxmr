import { Typography } from "@mui/material";
import Link from "next/link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link href="/">TipXMR</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
