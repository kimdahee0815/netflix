import { forwardRef, useState, cloneElement } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedTextField from "./OutlinedTextField";
import CustomizedButton from "./CustomizedButton";
import config from "../config";

const Fade = forwardRef(function Fade(props, ref) {
    const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props;
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

export default function BoardPasswordCheck({ openModal, handleOpen, handleClose, boardnum, modify, remove, owner }) {
    const [open, setOpen] = useState(openModal);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isValidPassword = (password) => {
        const passwordRegex = password.length >= 4 && password.length <= 20;
        return passwordRegex;
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
                    .post(`${config.API_URL}/login`, {
                        member_id: window.sessionStorage.getItem("id"),
                        member_pw: password,
                    })
                    .then((res) => {
                        if (res.data === 1) {
                            if (window.sessionStorage.getItem("id") === owner) {
                                alert("Identity confirmed!");
                                navigate(`/boardModify/${boardnum}`);
                            } else {
                                alert("You don't have permission to edit!");
                            }

                            handleClose2();
                        } else {
                            alert("Identity confirmation failed!");
                            handleClose2();
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            } else if (password === "") {
                setPasswordError("Please enter your password.");
            }
        } else if (remove === true) {
            if (isValidPassword(password)) {
                axios
                    .post(`${config.API_URL}/login`, {
                        member_id: window.sessionStorage.getItem("id"),
                        member_pw: password,
                    })
                    .then((res) => {
                        if (res.data === 1) {
                            if (window.sessionStorage.getItem("id") === owner) {
                                axios
                                    .get(`${config.API_URL}/customer/delete?board_num=${boardnum}`)
                                    .then((res) => {
                                        alert("Deleted successfully!");
                                        navigate("/board");
                                    })
                                    .catch((e) => {
                                        alert("Failed to delete!");
                                    });
                            } else {
                                alert("You don't have permission to delete!");
                                handleClose2();
                            }
                        } else {
                            alert("Identity confirmation failed!");
                            handleClose2();
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            } else if (password === "") {
                setPasswordError("Please enter your password.");
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
                            sx={{ textAlign:"center", mx: "auto", mb: 3 }}
                            id="spring-modal-title"
                            variant="h5"
                            component="h2"
                        >
                            Edit / Delete Post
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                            <Typography sx={{ width: "150px", mr: 5, mt: 3 }} variant="h10" component="h4">
                                Enter Password
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <OutlinedTextField
                                    onChange={setPassword}
                                    value={password}
                                    setPasswordError={setPasswordError}
                                    isValidPassword={isValidPassword}
                                    onKeyPress={checkenterSubmit}
                                    label="Enter your password"
                                />
                                <FormHelperText sx={{ mt: -2, fontSize: "1em", color: "red" }}>
                                    {passwordError}
                                </FormHelperText>
                            </Box>
                        </Box>

                        <Box sx={{ ml: 60 }}>
                            <CustomizedButton
                                label="Confirm"
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
