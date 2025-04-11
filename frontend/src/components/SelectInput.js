import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectInput({
  ref1,
  onChange,
  passwordQuestion,
  setPasswordQuestion,
  setPwQError,
  kind,
  pw_question,
  onKeyPress,
}) {
  const handleChange = (event) => {
    console.log(event);
    setPasswordQuestion((value) => event.target.value);

    if (event.target.value === "") {
      setPwQError("비밀번호 질문을 선택해주세요.");
    } else {
      setPwQError("");
    }
  };

  if (kind === "memberupdate") {
    setPasswordQuestion((value) => pw_question);
  }

  // const handleKeyPress = (event) => {
  //   onKeyPress();
  //   setPasswordQuestion("자신의 보물 제1호는?");
  // };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          sx={{
            color: "white",

            pt: 1,
            mt: -1,
            fontSize: "20px",
          }}
          id="simple-select-label"
        >
          Password Questions
        </InputLabel>
        <Select
          onKeyPress={onKeyPress}
          labelId="simple-select-label"
          name="pwQ"
          id="simple-select"
          value={passwordQuestion}
          label="passwordQuestions"
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          labelStyle={{ color: "white" }}
          sx={{
            my: 1,
            width: 360,
            background: "#38393b",
            color: "white",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
        >
          <MenuItem value="자신의 보물 제1호는?">자신의 보물 제1호는?</MenuItem>
          <MenuItem value="추억하고 싶은 날짜가 있다면?">
            추억하고 싶은 날짜가 있다면?
          </MenuItem>
          <MenuItem value="인상 깊게 읽은 책 이름은?">
            인상 깊게 읽은 책 이름은?
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
