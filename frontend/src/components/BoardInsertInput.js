import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

const ariaLabel = { "aria-label": "description" };

export default function BoardInsertInput({ label }) {
  return (
    <Input sx={{ width: "100%" }} placeholder={label} inputProps={ariaLabel} />
  );
}
