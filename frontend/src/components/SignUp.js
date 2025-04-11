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

export default function SignUp({ openSignUp, signUpOpen, signUpClose }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(openSignUp);

  const handleClose2 = () => {
    setOpen(false);
    signUpClose();
  };
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [tel, setTel] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [passwordQuestion, setPasswordQuestion] = useState("");

  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [addrError, setAddrError] = useState("");
  const [pwCheckError, setPwCheckError] = useState("");
  const [telError, setTelError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pwQError, setPwQError] = useState("");

  const emailInput = document.querySelector("[name=email]");
  const passwordInput2 = document.querySelector("[name=password2]");
  const passwordConfirmInput = document.querySelector("[name=passwordconfirm]");
  const nameInput = document.querySelector("[name=name]");
  const telInput = document.querySelector("[name=tel]");
  const addrInput = document.querySelector("[name=addr]");
  const pwQInput = document.querySelector("[name=pwQ]");
  const pwAInput = document.querySelector("[name=pwA]");

  const emailFocus = () => {
    emailInput.focus();
  };

  const passwordFocus = () => {
    passwordInput2.focus();
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
      passwordConfirmFocus();
    }
  };
  const gotoNameInput = (e) => {
    if (e.key === "Enter") {
      nameFocus();
    }
  };
  const gotoTelInput = (e) => {
    if (e.key === "Enter") {
      telFocus();
    }
  };
  const gotoAddrInput = (e) => {
    if (e.key === "Enter") {
      addrFocus();
    }
  };
  const gotoPwQInput = (e) => {
    if (e.key === "Enter") {
      pwQFocus();
    }
  };
  const gotoPwAInput = (e) => {
    if (e.key === "Enter") {
      pwAFocus();
    }
  };

  // React.useEffect(() => {
  //   emailFocus();
  // }, []);

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const isValidId = (id) => {
    const idRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return idRegex.test(id);
    // 이메일 주소의 유효성을 검사하는 코드를 작성한다.
    // 유효한 이메일 주소인 경우 true, 그렇지 않은 경우 false를 반환한다.
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

  const handleIdChange = (event) => {
    setId(event.target.value);
    // setEmail 함수를 이용해 email 상태값을 업데이트한다.
    setIdError(
      isValidId(event.target.value) ? "" : "정확한 이메일 주소를 입력해주세요."
    );
    if (event.target.value === "") {
      setIdError("이메일을 입력하세요");
    }
  };

  const handlePasswordChange = (event) => {
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

    idDuplicateCheck();
    if (idError === "") {
      alert("아이디 중복확인 해주세요.");
      check = false;
    } else if (idError === "아이디가 중복됩니다.") {
      check = false;
    }

    let validId =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
        id
      );
    let validPassword = password.length >= 4 && password.length <= 20;
    let validTel = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/.test(
      tel.slice(0, 13)
    );
    if (!id) {
      setIdError("이메일을 입력해주세요.");
      check = false;
    } else if (!validId) {
      setIdError("정확한 이메일 주소를 입력해주세요.");
      check = false;
    }
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

  const loginSubmit = (e) => {
    if (loginCheck()) {
      axios
        .post("http://localhost:8080/insertMember", {
          member_id: id,
          member_pw: password,
          member_name: name,
          member_tel: tel,
          member_addr: addr,
          pw_question: passwordQuestion,
          pw_answer: pwCheck,
        })
        .then((res) => {
          console.log("insertMember =>", res);
          if (res.data === 1) {
            alert("회원가입 성공!");
            handleClose2();
          } else {
            alert("회원가입 실패!");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const idDuplicateCheck = () => {
    if (id !== "") {
      if (isValidId(id)) {
        axios
          .post("http://localhost:8080/idDuplicateCheck", {
            member_id: id,
          })
          .then((res) => {
            console.log("idDuplicateCheck =>", res);
            if (res.data === 1) {
              setIdError("아이디가 중복됩니다.");
              return false;
            } else {
              setIdError("사용가능한 아이디입니다.");
              return true;
            }
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
        setIdError("정확한 이메일 주소를 입력해주세요.");
      }
    } else {
      setIdError("이메일 주소를 입력하세요.");
    }
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      loginSubmit();
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
              sx={{ width: "150px", mx: "auto", mb: 3 }}
              id="spring-modal-title"
              variant="h5"
              component="h2"
            >
              회원가입
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                height: "73.6",
                marginBottom: "5px",
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
                <TextField
                  classes={{
                    root: classes.root,
                  }}
                  name="email"
                  onKeyPress={gotoPasswordInput}
                  autoComplete="off"
                  label="이메일 주소를 입력해주세요"
                  type="email"
                  value={id}
                  onChange={handleIdChange}
                  required
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                  sx={{
                    my: 1,
                    width: "255px",
                    color: "white",
                    background: "#38393b",
                    fontSize: "20px",
                    borderRadius: 1,
                    marginRight: "10px",
                    height: "53px",
                  }}
                />

                <CustomizedButton
                  label="중복확인"
                  value="check"
                  onClick={idDuplicateCheck}
                ></CustomizedButton>
              </div>
              <FormHelperText sx={{ padding: "1px", color: "red" }}>
                {idError}
              </FormHelperText>
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
                name="password2"
                onKeyPress={gotoPasswordConfirmInput}
                autoComplete="off"
                label="비밀번호를 입력해주세요"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                setPwQError={setPwQError}
                passwordQuestion={passwordQuestion}
                setPasswordQuestion={setPasswordQuestion}
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
                name="passwordconfirm"
                onKeyPress={gotoNameInput}
                autoComplete="off"
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
                name="name"
                onKeyPress={gotoTelInput}
                autoComplete="off"
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
                name="tel"
                onKeyPress={gotoAddrInput}
                autoComplete="off"
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
                name="addr"
                onKeyPress={gotoPwQInput}
                autoComplete="off"
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
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
              style={{ alignItems: "center" }}
            >
              <Typography
                sx={{
                  width: "150px",
                  mr: 5,
                  height: "56px",
                  // marginBottom: "-10px",
                  display: "flex",
                  alignItems: "center",
                }}
                variant="h10"
                component="h4"
              >
                비밀번호 찾기 질문
              </Typography>
              <SelectInput
                classes={{
                  root: classes.root,
                }}
                onKeyPress={gotoPwAInput}
                autoComplete="off"
                setPwQError={setPwQError}
                passwordQuestion={passwordQuestion}
                setPasswordQuestion={setPasswordQuestion}
              />
              <FormHelperText sx={{ color: "red" }}>{pwQError}</FormHelperText>
            </Box>
            <Box sx={inputFormStyle} style={{ alignItems: "center" }}>
              <Typography
                sx={{ width: "150px", mr: 5 }}
                variant="h10"
                component="h4"
              >
                비밀번호 찾기 답변
              </Typography>

              <TextField
                classes={{
                  root: classes.root,
                }}
                name="pwA"
                autoComplete="off"
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
                label="회원가입"
                onClick={loginSubmit}
              ></CustomizedButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
