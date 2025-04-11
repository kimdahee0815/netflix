import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import SelectInput from "./SelectInput";
import CustomizedButton from "./CustomizedButton";
import { useState } from "react";
import { TextField } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import {
  createMuiTheme,
  makeStyles,
  createStyles,
  Theme as AugmentedTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // color: green[900],

      "& .MuiOutlinedInput-root": {
        backgroundColor: "transparent",
        "& fieldset": {
          borderColor: "rgba(0, 0, 0, 0.23)", // default
        },
        "&.Mui-focused fieldset": {
          border: "2px solid white", // customized
        },
      },
    },
  })
);
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  width: 600,
  height: 700,
  bgcolor: "black",
  border: "1px solid white",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

const formStyle = {
  my: 1,
  width: "360px",
  color: "white",
  background: "#38393b",
  fontSize: "20px",
  borderRadius: 1,
};
const inputFormStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

export default function MemberUpdateForm({
  openMemberUpdateForm,
  setOpenMemberUpdateForm,
  updateFormOpen,
  updateFormClose,
  info,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(openMemberUpdateForm);

  const handleClose2 = () => {
    setOpen(false);
    updateFormClose();
  };
  const originalData = {
    member_id: info.member_id,
    member_pw: info.member_pw,
    member_name: info.member_name,
    member_addr: info.member_addr,
    member_tel: info.member_tel,
    pw_answer: info.pw_answer,
    pw_question: info.pw_question,
  };
  const [id, setId] = useState(info.member_id);
  const [name, setName] = useState(info.member_name);
  const [addr, setAddr] = useState(info.member_addr);
  const [tel, setTel] = useState(info.member_tel);
  const [pwCheck, setPwCheck] = useState(info.pw_answer);
  const [password, setPassword] = useState(info.member_pw);
  const [ConfirmPassword, setConfirmPassword] = useState(info.member_pw);
  const [passwordQuestion, setPasswordQuestion] = useState(info.pw_question);

  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [addrError, setAddrError] = useState("");
  const [pwCheckError, setPwCheckError] = useState("");
  const [telError, setTelError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pwQError, setPwQError] = useState("");

  const emailInput = document.querySelector("[name=memberemail]");
  const passwordInput = document.querySelector("[name=memberpassword]");
  const passwordConfirmInput = document.querySelector(
    "[name=memberpasswordconfirm]"
  );
  const nameInput = document.querySelector("[name=membername]");
  const telInput = document.querySelector("[name=membertel]");
  const addrInput = document.querySelector("[name=memberaddr]");
  const pwQInput = document.querySelector("[name=pwQ]");
  const pwAInput = document.querySelector("[name=memberpwA]");

  const emailFocus = () => {
    emailInput.focus();
  };

  const passwordFocus = () => {
    // console.log(passwordInput);
    passwordInput.focus();
  };
  const passwordConfirmFocus = () => {
    passwordConfirmInput.focus();
  };

  const nameFocus = () => {
    nameInput.focus();
  };
  const telFocus = () => {
    telInput.focus();
  };

  const addrFocus = () => {
    addrInput.focus();
  };
  const pwQFocus = () => {
    console.log(pwQInput);
    pwQInput.focus();
  };

  const pwAFocus = () => {
    pwAInput.focus();
  };

  const gotoPasswordInput = (e) => {
    if (e.key === "Enter") {
      passwordFocus();
    }
  };
  const gotoPasswordConfirmInput = (e) => {
    if (e.key === "Enter") {
      console.log(passwordConfirmInput);
      passwordConfirmFocus();
    }
  };
  const gotoNameInput = (e) => {
    if (e.key === "Enter") {
      console.log(nameInput);
      nameFocus();
    }
  };
  const gotoTelInput = (e) => {
    console.log(telInput);
    if (e.key === "Enter") {
      telFocus();
    }
  };
  const gotoAddrInput = (e) => {
    console.log(addrInput);
    if (e.key === "Enter") {
      e.preventDefault();
      addrFocus();
    }
  };
  const gotoPwQInput = (e) => {
    console.log(pwQInput);
    if (e.key === "Enter") {
      e.preventDefault();
      pwQFocus();
    }
  };
  const gotoPwAInput = (e) => {
    console.log(pwAInput);
    if (e.key === "Enter") {
      pwAFocus();
    }
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const isValidPassword = (password) => {
    const passwordRegex = password.length >= 4 && password.length <= 20;
    return passwordRegex;
    // 패스워드의 유효성을 검사하는 코드를 작성한다.
    // 유효한 패스워드인 경우 true, 그렇지 않은 경우 false를 반환한다.
  };
  const isValidatePhone = (tel) => {
    const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    return phoneRegex.test(tel.slice(0, 13));
  };

  const handlePasswordChange = (event) => {
    console.log(event);
    setPassword(event.target.value);
    // setPassword 함수를 이용해 password 상태값을 업데이트한다.
    setPasswordError(
      isValidPassword(event.target.value)
        ? ""
        : "비밀번호는 4~20자 사이여야 합니다."
    );
    if (event.target.value === "") {
      setPasswordError("비밀번호를 입력하세요");
    }
  };

  const handleAddrChange = (event) => {
    setAddr(event.target.value);
    if (event.target.value !== "") {
      setAddrError("");
    } else {
      setAddrError("주소를 입력하세요");
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      setNameError("");
    } else {
      setNameError("이름을 입력하세요");
    }
  };

  const handleTelChange = (event) => {
    setTel(
      event.target.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})(\d{0,1})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
        .slice(0, 13)
    );
    console.log(event.target.value);
    setTelError(
      isValidatePhone(event.target.value)
        ? ""
        : "올바른 휴대폰 번호를 입력하세요."
    );
    if (event.target.value === "") {
      setTelError("휴대폰 번호를 입력하세요");
    }
  };
  const handlePwCheckChange = (event) => {
    setPwCheck(event.target.value);
    if (event.target.value !== "") {
      setPwCheckError("");
    } else {
      setPwCheckError("비밀번호 찾기 답을 입력하세요");
    }
  };

  const loginCheck = (event) => {
    let check = true;
    if (password !== ConfirmPassword && password !== "") {
      alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
      check = false;
    }

    let validPassword = password.length >= 4 && password.length <= 20;
    let validTel = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/.test(
      tel.slice(0, 13)
    );

    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      check = false;
    } else if (!validPassword) {
      setPasswordError("비밀번호는 4~20자 사이여야 합니다.");
      check = false;
    }
    if (!name) {
      setNameError("이름을 입력해주세요.");
      check = false;
    } else {
      setNameError("");
    }
    if (!tel) {
      setTelError("전화번호를 입력해주세요.");
      check = false;
    } else if (!validTel) {
      setTelError("올바른 휴대폰 번호를 입력하세요.");
      check = false;
    }
    if (!addr) {
      setAddrError("주소를 입력해주세요.");
      check = false;
    } else {
      setAddrError("");
    }
    if (!passwordQuestion) {
      setPwQError("비밀번호 질문을 선택해주세요.");
      check = false;
    } else {
      setPwQError("");
    }
    if (!pwCheck) {
      setPwCheckError("비밀번호 확인 답변을 입력해주세요.");
      check = false;
    } else {
      setPwCheckError("");
    }
    console.log("return check : " + check);
    return check;
  };

  const infoChange = (e) => {
    if (loginCheck()) {
      axios
        .post("http://localhost:8080/updateMembers", {
          member_id: id,
          member_pw: password,
          member_name: name,
          member_tel: tel,
          member_addr: addr,
          pw_question: passwordQuestion,
          pw_answer: pwCheck,
        })
        .then((res) => {
          console.log("updateMember =>", res);
          if (res.data !== 0) {
            if (
              originalData.member_id === id &&
              originalData.member_pw === password &&
              originalData.member_name === name &&
              originalData.member_tel === tel &&
              originalData.member_addr === addr &&
              originalData.pw_question === passwordQuestion &&
              originalData.pw_answer === pwCheck
            ) {
              alert("변경된 정보가 없습니다!");
            } else {
              alert("회원 정보 업데이트 성공!");
            }
            handleClose2();
          } else {
            alert("회원 정보 업데이트 실패!");
            handleClose2();
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      infoChange();
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {},
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{ width: "207px", mx: "auto", mb: 3 }}
              id="spring-modal-title"
              variant="h5"
              component="h2"
            >
              회원 정보 업데이트
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                height: "73.6",
                marginBottom: "5px",
                ml: 4,
              }}
            >
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                이메일 주소
              </Typography>
              <div
                style={{
                  height: "57.6px",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Typography
                  sx={{ width: "150px", ml: 1, mt: 3, mb: 2 }}
                  variant="h10"
                  component="h4"
                >
                  {info.member_id}
                </Typography>
              </div>
            </Box>
            <Box sx={inputFormStyle}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                비밀번호
              </Typography>
              <TextField
                classes={{
                  root: classes.root,
                }}
                autoComplete="off"
                name="memberpassword"
                onKeyPress={gotoPasswordConfirmInput}
                label="비밀번호를 입력해주세요"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                sx={formStyle}
              />
              <FormHelperText sx={{ color: "red" }}>
                {passwordError}
              </FormHelperText>
            </Box>
            <Box sx={inputFormStyle}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                비밀번호 확인
              </Typography>
              <TextField
                classes={{
                  root: classes.root,
                }}
                autoComplete="off"
                name="memberpasswordconfirm"
                onKeyPress={gotoNameInput}
                sx={formStyle}
                required
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                label="비밀번호를 입력해주세요"
                type="password"
                value={ConfirmPassword}
                onChange={onConfirmPasswordHandler}
              />
            </Box>
            <Box sx={inputFormStyle}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                이름
              </Typography>
              <TextField
                classes={{
                  root: classes.root,
                }}
                autoComplete="off"
                name="membername"
                onKeyPress={gotoTelInput}
                label="이름을 입력해주세요"
                type="text"
                value={name}
                onChange={handleNameChange}
                required
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                sx={formStyle}
              />
              <FormHelperText sx={{ color: "red" }}>{nameError}</FormHelperText>
            </Box>
            <Box sx={inputFormStyle}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                전화번호
              </Typography>
              <TextField
                classes={{
                  root: classes.root,
                }}
                autoComplete="off"
                name="membertel"
                onKeyPress={gotoAddrInput}
                label="전화번호를 입력해주세요"
                required
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                sx={formStyle}
                value={tel}
                onChange={handleTelChange}
              />
              <FormHelperText sx={{ color: "red" }}>{telError}</FormHelperText>
            </Box>
            <Box sx={inputFormStyle}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                주소
              </Typography>
              <TextField
                classes={{
                  root: classes.root,
                }}
                autoComplete="off"
                name="memberaddr"
                onKeyPress={gotoPwQInput}
                label="주소를 입력해주세요"
                required
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                sx={formStyle}
                value={addr}
                onChange={handleAddrChange}
              />

              <FormHelperText sx={{ color: "red" }}>{addrError}</FormHelperText>
            </Box>
            <Box
              sx={inputFormStyle}
              style={{ marginTop: "2px", height: "92px" }}
            >
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                비밀번호 찾기 질문
              </Typography>
              <SelectInput
                classes={{
                  root: classes.root,
                }}
                autoComplete="off"
                // name="memberpwQ"
                onKeyPress={gotoPwAInput}
                setPwQError={setPwQError}
                passwordQuestion={passwordQuestion}
                setPasswordQuestion={setPasswordQuestion}
              />
              <FormHelperText sx={{ color: "red", mt: -3, mb: 3 }}>
                {pwQError}
              </FormHelperText>
            </Box>
            <Box sx={inputFormStyle}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                비밀번호 찾기 답변
              </Typography>

              <TextField
                classes={{
                  root: classes.root,
                }}
                autoComplete="off"
                name="memberpwA"
                label="비밀번호 찾기 질문에 대한 답"
                required
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                sx={formStyle}
                value={pwCheck}
                onChange={handlePwCheckChange}
                onKeyPress={checkenterSubmit}
              />
              <FormHelperText sx={{ color: "red" }}>
                {pwCheckError}
              </FormHelperText>
            </Box>
            <Box sx={{ mx: "auto", width: 100, marginTop: "15px" }}>
              <CustomizedButton
                label="정보 수정"
                onClick={infoChange}
              ></CustomizedButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
