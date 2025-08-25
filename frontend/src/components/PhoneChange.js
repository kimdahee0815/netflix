import { forwardRef, useState, cloneElement } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import { useSpring, animated } from "@react-spring/web";
import OutlinedTextField from "./OutlinedTextField";
import CustomizedButton from "./CustomizedButton";
import config from "../config";

const Fade = forwardRef(function Fade(props, ref) {
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
      {cloneElement(children, { onClick })}
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

export default function PhoneChange({
  openModal,
  handleOpen,
  handleClose,
  setTel,
  tel,
}) {
  const [open, setOpen] = useState(openModal);
  const [newTel, setNewTel] = useState("");
  const [telError, setTelError] = useState("");
  const email = window.sessionStorage.getItem("id");

  const handleClose2 = () => {
    setOpen(false);
    handleClose();
  };
  const isValidatePhone = () => {
    const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    return phoneRegex.test(newTel.slice(0, 13));
  };

  const handleUpdate = () => {
    if (isValidatePhone(newTel)) {
      axios
        .post(`${config.API_URL}/phoneUpdate`, {
          member_id: email,
          member_tel: newTel,
        })
        .then((res) => {
          if (res.data === 1) {
            if (tel === newTel) {
              alert("동일한 휴대폰 번호입니다!");
            } else {
              alert("휴대폰 번호 업데이트 성공!");
            }
            handleClose2();
            setTel(newTel);
          } else {
            alert("휴대폰 번호 업데이트 실패!");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (newTel === "") {
      setTelError("휴대폰 번호를 입력해주세요.");
    } else {
      setTelError("올바른 휴대폰 번호를 입력해주세요.");
    }
  };

  const checkenterSubmit = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      handleUpdate();
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
              휴대폰 번호 변경하기
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ width: "150px", mr: 5, mt: 3 }}
                variant="h10"
                component="h4"
              >
                휴대폰 번호 입력
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <OutlinedTextField
                  value={newTel}
                  onChange={setNewTel}
                  setTelError={setTelError}
                  label="변경할 휴대폰 번호를 입력해주세요"
                  onKeyPress={checkenterSubmit}
                />
                <FormHelperText sx={{ mt: -2, fontSize: "1em", color: "red" }}>
                  {telError}
                </FormHelperText>
              </Box>
            </Box>
            <Box sx={{ ml: 60 }}>
              <CustomizedButton
                label="확인"
                value="updateDelete"
                onClick={handleUpdate}
              ></CustomizedButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
