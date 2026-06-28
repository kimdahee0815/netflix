import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";

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
    if (
      label === "Enter the new email address" ||
      label === "Enter your email address"
    ) {
      onChange(e.target.value);
      setIdError(
        isValidId(e.target.value) ? "" : "Please enter a valid email address."
      );
      if (e.target.value === "") {
        setIdError("Please enter an email address.");
      }
    } else if (
      label === "Enter new password" ||
      label === "Enter your password"
    ) {
      onChange(e.target.value);
      setPasswordError(
        isValidPassword(e.target.value)
          ? ""
          : "Password must be 4-20 characters."
      );
      if (e.target.value === "") {
        setPasswordError("Please enter your password.");
      }
    } else if (label === "Enter new phone number") {
      onChange(
        e.target.value
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})(\d{0,1})$/g, "$1-$2-$3")
          .replace(/(-{1,2})$/g, "")
          .slice(0, 13)
      );
      setTelError(
        phoneRegex.test(e.target.value.slice(0, 13))
          ? ""
          : "Please enter a valid phone number."
      );

      if (e.target.value === "") {
        setTelError("Please enter your phone number.");
      }
    } else if (label === "Enter the answer to your security question") {
      onChange(e.target.value);

      if (e.target.value === "") {
        setPwAnsError("Please enter your security answer.");
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
