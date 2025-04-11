import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import PasswordCheck from "../components/passwordCheck";
import CustomizedButton from "../components/CustomizedButton";
import SignUp from "../components/SignUp";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  createMuiTheme,
  makeStyles,
  createStyles,
  Theme as AugmentedTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { orange, blue, green } from "@material-ui/core/colors";

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

function Login() {
  const classes = useStyles();
  const theme = createMuiTheme();
  const emailRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();
  const { profile_num } = useParams();

  window.profile_num = { profile_num };

  const [email, setEmail] = useState("");
  //email 상태값 업데이트
  const [password, setPassword] = useState("");
  //password 상태값 업데이트
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [saveAccount, setSaveAccount] = useState(false);

  const [emailLabel, setEmailLabel] = useState("이메일 주소");
  const [pwLabel, setPwLabel] = useState("비밀번호");

  const emailInput = document.querySelector("[name=email]");
  const passwordInput = document.querySelector("[name=password]");

  const emailFocus = () => {
    emailInput.focus();
  };

  const passwordFocus = () => {
    passwordInput.focus();
  };

  const gotoPasswordInput = (e) => {
    if (e.key === "Enter") {
      passwordFocus();
    }
  };

  useEffect(() => {
    // emailFocus();
    if (window.localStorage.getItem("id") !== null) {
      // alert("저장된 정보 있음!");
      setSaveAccount(true);
      setEmail(window.localStorage.getItem("id"));
      axios
        .post("http://localhost:8080/selectMember", {
          member_id: window.localStorage.getItem("id"),
        })
        .then((res) => {
          if (res.data !== null) {
            setPassword(res.data.member_pw);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
    // 이메일 주소의 유효성을 검사하는 코드를 작성한다.
    // 유효한 이메일 주소인 경우 true, 그렇지 않은 경우 false를 반환한다.
  };

  const isValidPassword = (password) => {
    const passwordRegex = password.length >= 4 && password.length <= 20;
    return passwordRegex;
    // 패스워드의 유효성을 검사하는 코드를 작성한다.
    // 유효한 패스워드인 경우 true, 그렇지 않은 경우 false를 반환한다.
  };

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEmail((value) => event.target.value);
    // setEmail 함수를 이용해 email 상태값을 업데이트한다.
    setEmailError(
      isValidEmail(event.target.value)
        ? ""
        : "정확한 이메일 주소를 입력해주세요."
    );
  };

  const handlePasswordChange = (event) => {
    setPassword((value) => event.target.value);
    // setPassword 함수를 이용해 password 상태값을 업데이트한다.
    setPasswordError(
      isValidPassword(event.target.value)
        ? ""
        : "비밀번호는 4~20자 사이여야 합니다."
    );
  };

  const checkSubmit = (event) => {
    let validEmail = /\S+@\S+.\S+/.test(email);
    let validPassword = password.length >= 4 && password.length <= 60;
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      console.log(emailRef);
      emailRef.current.focus();
    } else if (!validEmail) {
      setEmailError("정확한 이메일 주소를 입력해주세요.");
      emailRef.current.focus();
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      pwRef.current.focus();
    } else if (!validPassword) {
      setPasswordError("비밀번호는 4~20자 사이여야 합니다.");
      pwRef.current.focus();
    }
    if (validEmail && validPassword) {
      handleLogin();
    }
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/selectMember", {
        member_id: email,
      })
      .then((res) => {
        // console.log(res);
        if (res.data !== "") {
          axios
            .post("http://localhost:8080/login", {
              member_id: email,
              member_pw: password,
            })
            .then((res) => {
              console.log("handleLogin =>", res);
              if (res.data === 1) {
                window.sessionStorage.setItem("id", email);
                window.localStorage.removeItem("profile_num");
                if (saveAccount === true) {
                  // 로그인 정보 저장 버튼을 누르면 localstorage에 로그인 정보 저장
                  window.localStorage.clear();
                  window.localStorage.setItem("id", email);
                } else {
                  if (
                    window.localStorage.getItem("id") !== null &&
                    window.localStorage.getItem("id") ===
                      window.sessionStorage.getItem("id")
                  ) {
                    window.localStorage.clear();
                  }
                }
                navigate("/login");
              } else {
                alert("비밀번호가 다릅니다!");
                navigate("/");
              }
            })
            .catch((e) => {
              console.error(e);
            });
        } else {
          alert("일치하는 이메일 주소가 없습니다!");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      checkSubmit();
    }
  };

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const [openSignUp, setOpenSignUp] = React.useState(false);

  const signUpOpen = () => {
    setOpenSignUp(true);
  };
  const signUpClose = () => {
    setOpenSignUp(false);
  };

  const saveAccountChange = (e) => {
    setSaveAccount(e.target.checked);
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        marginTop: "25vh",
        padding: "300px",
        paddingTop: "220px",
        background: "black",
        color: "white",
        borderRadius: "15px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
        width: "100%",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
          width: "90%",
          minWidth: "400px",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mt: "30px", mb: "30px" }}>
          로그인
        </Typography>
        <TextField
          classes={{
            root: classes.root,
          }}
          autoComplete="off"
          onKeyPress={gotoPasswordInput}
          ref={emailRef}
          margin="normal"
          label={emailLabel}
          type="email"
          name="email"
          fullWidth
          variant="outlined"
          inputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
          sx={{
            my: 1,
            background: "#38393b",
            // border: "1.5px solid white",
            "&:hover": {
              border: "none",
            },
            "&:click": {
              backgroundColor: "transparent",
              border: "none",
            },
          }}
          required
          value={email}
          onChange={handleEmailChange}
          // 이메일 주소 입력란의 값이 변경될때마다 이 함수가 호출됨
        />
        <FormHelperText sx={{ padding: "1px", color: "red" }}>
          {emailError}
        </FormHelperText>

        <TextField
          classes={{
            root: classes.root,
          }}
          ref={pwRef}
          label={pwLabel}
          type="password"
          name="password"
          autoComplete="current-password"
          required
          fullWidth
          variant="outlined"
          inputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
          sx={{
            my: 1,
            background: "#38393b",
            "&:hover": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              backgroundColor: "transparent",
              border: "none",
            },
          }}
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={checkenterSubmit}
        />

        <FormHelperText sx={{ color: "red" }}>{passwordError}</FormHelperText>

        <Box sx={{ display: "flex", width: "100%", mt: 4, mb: 3 }}>
          <Box sx={{ display: "flex", width: "50%" }}>
            <Typography sx={{ justifyContent: "start" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      },
                    }}
                    checked={saveAccount}
                    onChange={saveAccountChange}
                    name="saveAccount"
                  />
                }
                label="로그인 정보 저장"
                sx={{ mr: "auto" }}
              />
            </Typography>
          </Box>
          <Box sx={{ display: "flex", width: "50%", justifyContent: "end" }}>
            <Box>
              <CustomizedButton
                label="비밀번호 찾기"
                value="비밀번호 찾기"
                onClick={handleOpen}
              ></CustomizedButton>
            </Box>
            {openModal ? (
              <PasswordCheck
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleOpen={handleOpen}
                handleClose={handleClose}
              ></PasswordCheck>
            ) : null}
          </Box>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ background: "#e50914", mt: "24px", mb: "16px" }}
          onClick={checkSubmit}
        >
          로그인
        </Button>

        <Box lg={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              background: "#e50914",
              mt: "24px",
              mb: "16px",
              borderRadius: "5px",
            }}
          >
            <CustomizedButton
              label="지금 가입하세요"
              value="지금 가입하세요"
              onClick={signUpOpen}
            ></CustomizedButton>
            {openSignUp ? (
              <ThemeProvider theme={theme}>
                <SignUp
                  openSignUp={openSignUp}
                  setOpenSignUp={setOpenSignUp}
                  signUpOpen={signUpOpen}
                  signUpClose={signUpClose}
                ></SignUp>
              </ThemeProvider>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
