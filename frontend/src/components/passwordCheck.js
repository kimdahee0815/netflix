import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import OutlinedTextField from "./OutlinedTextField";
import SelectInput from "./SelectInput";
import CustomizedButton from "./CustomizedButton";
import { useRef, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import PasswordChange from "./PasswordChange";

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
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  width: 560,
  bgcolor: "black",
  border: "1px solid white",
  boxShadow: 24,
  p: 4,
};

export default function PasswordCheck({ openModal, handleOpen, handleClose }) {
  const [open, setOpen] = React.useState(openModal);

  const [id, setId] = useState("");
  //email 상태값 업데이트
  const [idError, setIdError] = React.useState("");
  const [passwordQuestion, setPasswordQuestion] = useState("");
  const [pwQError, setPwQError] = useState("");
  const [passwordAnswer, setPasswordAnswer] = useState("");
  const [pwAnsError, setPwAnsError] = useState("");
  const [password, setPassword] = useState("");

  const emailInput2 = document.querySelector("[name=email2]");
  const pwQInput2 = document.querySelector("[name=pwQ]");
  const pwAInput2 = document.querySelector("[name=pwAInput2]");

  const pwQFocus = () => {
    console.log(pwQInput2);
    pwQInput2.focus();
  };

  const pwAFocus = () => {
    pwAInput2.focus();
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

  const [passwordSearch, setPasswordSearch] = useState(false);

  const [openPwModal, setOpenPwModal] = useState(false);

  const handlePwOpen = () => {
    setOpenPwModal(true);
  };
  const handlePwClose = () => {
    console.log(openPwModal);
    setOpenPwModal(false);
  };

  const handleClose2 = () => {
    setOpen(false);
    handleClose();
  };

  const passwordSearchSubmit = () => {
    if (handlePasswordCheck()) {
      axios
        .post("http://localhost:8080/passwordSearch", {
          member_id: id,
          pw_question: passwordQuestion,
          pw_answer: passwordAnswer,
        })
        .then((res) => {
          console.log("passwordSearch =>", res);
          if (res.data === 1) {
            axios
              .post("http://localhost:8080/selectMember", {
                member_id: id,
              })
              .then((res) => {
                setPassword(res.data.member_pw);
              });
            setPasswordSearch(true);
            handlePwOpen();
          } else {
            alert("관련 정보 없음!");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  const isValidId = (email) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
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

  const handlePasswordCheck = (event) => {
    let check = true;
    let validEmail =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
        id
      );

    if (!id) {
      setIdError("이메일을 입력해주세요.");
      check = false;
    } else if (!validEmail) {
      setIdError("정확한 이메일 주소를 입력해주세요.");
      check = false;
    }
    if (passwordAnswer === "") {
      setPwAnsError("비밀번호 질문에 대한 답을 입력해주세요.");
      check = false;
    } else {
      setPwAnsError("");
    }
    if (passwordQuestion === "") {
      setPwQError("비밀번호 질문을 선택해주세요.");
      check = false;
    } else {
      setPwQError("");
    }
    return check;
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      passwordSearchSubmit();
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
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{ width: 160, mx: "auto", mb: 3 }}
              id="spring-modal-title"
              variant="h5"
              component="h2"
            >
              비밀번호 찾기
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                이메일 주소
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <OutlinedTextField
                  name="email2"
                  onKeyPress={gotoPwQInput}
                  required
                  isValidId={isValidId}
                  value={id}
                  onChange={setId}
                  setIdError={setIdError}
                  label="이메일 주소를 입력해주세요"
                />
                <FormHelperText
                  sx={{ mt: -3, mb: 2, color: "red", fontSize: "0.9em" }}
                >
                  {idError}
                </FormHelperText>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                비밀번호 찾기 질문
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <SelectInput
                  required
                  name="pwQInput2"
                  onKeyPress={gotoPwAInput}
                  setPwQError={setPwQError}
                  passwordQuestion={passwordQuestion}
                  setPasswordQuestion={setPasswordQuestion}
                />
                <FormHelperText
                  sx={{ mt: 1, mb: 2, color: "red", fontSize: "0.9em" }}
                >
                  {pwQError}
                </FormHelperText>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                비밀번호 찾기 답변
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", mt: -1 }}>
                <OutlinedTextField
                  required
                  name="pwAInput2"
                  value={passwordAnswer}
                  setPwAnsError={setPwAnsError}
                  onChange={setPasswordAnswer}
                  onKeyPress={checkenterSubmit}
                  label="비밀번호 찾기 질문에 대한 답을 입력해주세요"
                />
                <FormHelperText
                  sx={{ mt: -2, mb: 2, color: "red", fontSize: "0.9em" }}
                >
                  {pwAnsError}
                </FormHelperText>
              </Box>
            </Box>
            <Box sx={{ mx: "auto", width: 50 }}>
              <CustomizedButton
                label="찾기"
                value="passwordAnswer"
                onClick={passwordSearchSubmit}
              ></CustomizedButton>
              {passwordSearch ? (
                <PasswordChange
                  label="비밀번호 찾기 변경"
                  passwordChangeEmail={id}
                  setPasswordSearch={setPasswordSearch}
                  openPwModal={openPwModal}
                  setOpenPwModal={setOpenPwModal}
                  handlePwOpen={handlePwOpen}
                  handlePwClose={handlePwClose}
                  handleCloseAll={handleClose2}
                  password={password}
                />
              ) : null}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
