import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import OutlinedTextField from "./OutlinedTextField";
import CustomizedButton from "./CustomizedButton";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";

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
  width: 560,
  bgcolor: "black",
  border: "1px solid white",
  boxShadow: 24,
  p: 4,
};

export default function PasswordChange({
  openPwModal,
  handlePwOpen,
  handlePwClose,
  setPasswordSearch,
  setPw,
  pw,
  passwordChangeEmail,
  label,
  handleCloseAll,
  password,
}) {
  const [open, setOpen] = React.useState(openPwModal);
  const [newPw, setNewPw] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [email, setEmail] = React.useState(window.sessionStorage.getItem("id"));
  if (email === null) {
    //비밃번호 찾기 일 경우에는 session에 저장된 아이디 없음.
    setEmail(passwordChangeEmail);
  }
  const handleClose2 = () => {
    setPasswordSearch(false);
    handlePwClose();
    setOpen(false);
    if (label === "비밀번호 찾기 변경") {
      handleCloseAll();
    }
  };

  const isValidPassword = (password) => {
    const passwordRegex = password.length >= 4 && password.length <= 20;
    return passwordRegex;
    // 패스워드의 유효성을 검사하는 코드를 작성한다.
    // 유효한 패스워드인 경우 true, 그렇지 않은 경우 false를 반환한다.
  };
  const handlePwUpdate = (e) => {
    if (isValidPassword(newPw)) {
      axios
        .post("http://localhost:8080/passwordUpdate", {
          member_id: email,
          member_pw: newPw,
        })
        .then((res) => {
          console.log("passwordUpdate =>", res);
          if (res.data === 1) {
            handleClose2();
            if (label === "마이페이지 비밀번호 변경") {
              if (pw === newPw) {
                alert("동일한 비밀번호 입니다!");
              } else {
                alert("비밀번호 업데이트 성공!");
              }
              setPw(newPw);
            } else {
              if (password === newPw) {
                alert("동일한 비밀번호 입니다!");
              } else {
                alert("비밀번호 업데이트 성공!");
              }
              setPw(newPw);
            }
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (newPw === "") {
      setPasswordError("비밀번호를 입력해주세요.");
    }
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      handlePwUpdate();
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
              sx={{ width: 270, mx: "auto", mb: 3 }}
              id="spring-modal-title"
              variant="h5"
              component="h2"
            >
              비밀번호 변경하기
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                비밀번호 입력
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <OutlinedTextField
                  value={newPw}
                  onChange={setNewPw}
                  isValidPassword={isValidPassword}
                  setPasswordError={setPasswordError}
                  label="변경할 비밀번호를 입력해주세요"
                  onKeyPress={checkenterSubmit}
                />
                <FormHelperText sx={{ mt: -2, fontSize: "1em", color: "red" }}>
                  {passwordError}
                </FormHelperText>
              </Box>
            </Box>

            <Box sx={{ ml: 60 }}>
              <CustomizedButton
                label="확인"
                value="updateDelete"
                onClick={handlePwUpdate}
              ></CustomizedButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
