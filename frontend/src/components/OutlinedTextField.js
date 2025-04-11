import * as React from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { useRef } from "react";

export default function OutlinedTextField({
  label,
  ref1,
  value,
  onChange,
  setIdError,
  isValidId,
  setPasswordError,
  isValidPassword,
  setTelError,
  setPwAnsError,
  onKeyPress,
  name,
}) {
  const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  const changeVal = (e) => {
    //  console.log(e.target.value);

    if (
      label === "변경할 이메일 주소를 입력해주세요" ||
      label === "이메일 주소를 입력해주세요"
    ) {
      console.log(e.target.value);
      onChange(e.target.value);
      setIdError(
        isValidId(e.target.value) ? "" : "정확한 이메일 주소를 입력해주세요."
      );
      if (e.target.value === "") {
        setIdError("이메일 주소를 입력해주세요.");
      }
    } else if (
      label === "변경할 비밀번호를 입력해주세요" ||
      label === "비밀번호를 입력해주세요"
    ) {
      onChange(e.target.value);
      setPasswordError(
        isValidPassword(e.target.value)
          ? ""
          : "비밀번호는 4~20자 사이여야 합니다."
      );
      if (e.target.value === "") {
        setPasswordError("비밀번호를 입력해주세요.");
      }
    } else if (label === "변경할 휴대폰 번호를 입력해주세요") {
      onChange(
        e.target.value
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})(\d{0,1})$/g, "$1-$2-$3")
          .replace(/(\-{1,2})$/g, "")
          .slice(0, 13)
      );
      console.log(e.target.value.slice(0, 13));
      setTelError(
        phoneRegex.test(e.target.value.slice(0, 13))
          ? ""
          : "올바른 휴대폰 번호를 입력하세요."
      );

      if (e.target.value === "") {
        setTelError("휴대폰 번호를 입력하세요.");
      }
    } else if (label === "비밀번호 찾기 질문에 대한 답을 입력해주세요") {
      onChange(e.target.value);

      if (e.target.value === "") {
        setPwAnsError("비밀번호 찾기 답을 입력해주세요");
      } else {
        setPwAnsError("");
      }
    }
  };

  return (
    <Box sx={{ width: 360, mb: 3 }} noValidate autoComplete="off">
      <OutlinedInput
        onKeyPress={onKeyPress}
        autoComplete="off"
        name={name}
        required
        ref={ref1}
        onChange={changeVal}
        value={value}
        inputProps={{ style: { color: "white" } }}
        InputLabelProps={{ style: { color: "white" } }}
        sx={{
          my: 1,
          width: 360,
          background: "#38393b",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
        placeholder={label}
      />
    </Box>
  );
}
