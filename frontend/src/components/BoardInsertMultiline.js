import * as React from "react";
import TextField from "@mui/material/TextField";

export default function BoardInsertMultiline() {
  return (
    <div>
      <TextField
        sx={{ width: 630, mt: 3 }}
        id="outlined-multiline-static"
        multiline
        rows={10}
        placeholder="내용을 입력하세요"
      />
    </div>
  );
}
