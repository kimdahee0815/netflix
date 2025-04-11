import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import OutlinedTextField from "./OutlinedTextField";
import CustomizedButton from "./CustomizedButton";
import { useNavigate } from "react-router-dom";
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

export default function BoardPasswordCheck({
  openModal,
  handleOpen,
  handleClose,
  boardnum,
  modify,
  remove,
  owner,
}) {
  const [open, setOpen] = React.useState(openModal);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const isValidPassword = (password) => {
    const passwordRegex = password.length >= 4 && password.length <= 20;
    return passwordRegex;
    // 패스워드의 유효성을 검사하는 코드를 작성한다.
    // 유효한 패스워드인 경우 true, 그렇지 않은 경우 false를 반환한다.
  };

  const handleClose2 = () => {
    setOpen(false);
    handleClose();
  };
  const navigate = useNavigate();
  const handleUpdateDelete = (e) => {
    if (modify === true) {
      if (isValidPassword(password)) {
        axios
          .post("http://localhost:8080/login", {
            member_id: window.sessionStorage.getItem("id"),
            member_pw: password,
          })
          .then((res) => {
            if (res.data === 1) {
              if (window.sessionStorage.getItem("id") === owner) {
                alert("정보확인 성공!");
                navigate(`/boardModify/${boardnum}`);
              } else {
                alert("수정 권한이 없습니다!");
              }

              handleClose2();
            } else {
              alert("정보확인 실패!");
              handleClose2();
            }
          })
          .catch((e) => {
            console.error(e);
          });
      } else if (password === "") {
        setPasswordError("비밀번호를 입력해주세요.");
      }
    } else if (remove === true) {
      if (isValidPassword(password)) {
        axios
          .post("http://localhost:8080/login", {
            member_id: window.sessionStorage.getItem("id"),
            member_pw: password,
          })
          .then((res) => {
            if (res.data === 1) {
              if (window.sessionStorage.getItem("id") === owner) {
                axios
                  .get(
                    `http://localhost:8080/customer/delete?board_num=${boardnum}`
                  )
                  .then((res) => {
                    alert("정보 삭제 성공!");
                    navigate("/board");
                  })
                  .catch((e) => {
                    alert("정보 삭제 실패!");
                  });
              } else {
                alert("삭제 권한이 없습니다!");
                handleClose2();
              }
            } else {
              alert("정보확인 실패!");
              handleClose2();
            }
          })
          .catch((e) => {
            console.error(e);
          });
      } else if (password === "") {
        setPasswordError("비밀번호를 입력해주세요.");
      }
    }
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateDelete();
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
              게시판 수정 및 삭제하기
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
                  onChange={setPassword}
                  value={password}
                  setPasswordError={setPasswordError}
                  isValidPassword={isValidPassword}
                  onKeyPress={checkenterSubmit}
                  label="비밀번호를 입력해주세요"
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
                onClick={handleUpdateDelete}
              ></CustomizedButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
