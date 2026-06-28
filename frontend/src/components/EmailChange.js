import { useState, forwardRef, cloneElement } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import FormHelperText from "@mui/material/FormHelperText";
import config from "../config";
import OutlinedTextField from "./OutlinedTextField";
import CustomizedButton from "./CustomizedButton";

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

export default function EmailChange({ openModal, handleOpen, handleClose, setEmail }) {
    const [open, setOpen] = useState(openModal);
    const [newEmail, setNewEmail] = useState("");
    const email2 = useState(window.sessionStorage.getItem("id"));

    const [idError, setIdError] = useState("");

    const handleClose2 = () => {
        handleClose();
        setOpen(false);
    };
    const isValidId = (id) => {
        const idRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return idRegex.test(id);
    };

    const idDuplicateCheck = () => {
        if (newEmail !== "") {
            if (isValidId(newEmail)) {
                axios
                    .post(`${config.API_URL}/idDuplicateCheck`, {
                        member_id: newEmail,
                    })
                    .then((res) => {
                        if (res.data === 1) {
                            setIdError("This email is already in use.");
                            return false;
                        } else {
                            setIdError("This email is available.");
                            return true;
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            } else {
                setIdError("Please enter a valid email address.");
            }
        } else {
            setIdError("Please enter an email address.");
        }
    };

    const emailChangeCheck = (event) => {
        let check = true;

        idDuplicateCheck();
        if (idError === "") {
            alert("Please check for duplicate email first.");
            check = false;
        } else if (idError === "This email is already in use.") {
            check = false;
        }

        let validId =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
                newEmail
            );

        if (!newEmail) {
            setIdError("Please enter your email.");
            check = false;
        } else if (!validId) {
            setIdError("Please enter a valid email address.");
            check = false;
        }

        return check;
    };

    const handleUpdate = (e) => {
        if (emailChangeCheck()) {
            axios
                .post(`${config.API_URL}/emailUpdate`, {
                    member_id: email2,
                    member_new_id: newEmail,
                })
                .then((res) => {
                    if (res.data === 1) {
                        axios
                            .post(`${config.API_URL}/profileEmailUpdate`, {
                                member_id: email2,
                                member_new_id: newEmail,
                            })
                            .then((res) => {
                                window.sessionStorage.setItem("id", newEmail);
                            })
                            .catch((e) => {
                                console.error(e);
                            });
                        axios
                            .post(`${config.API_URL}/customer/modifyid`, {
                                new_member_id: newEmail,
                                old_member_id: email2,
                            })
                            .then((res) => {})
                            .catch((e) => {
                                console.error(e);
                            });
                        axios
                            .post(`${config.API_URL}/favmovie/modifyid`, {
                                new_member_id: newEmail,
                                old_member_id: email2,
                            })
                            .then((res) => {})
                            .catch((e) => {
                                console.error(e);
                            });
                        if (window.localStorage.getItem("id") === window.sessionStorage.getItem("id")) {
                            window.localStorage.setItem("id", newEmail);
                        }

                        alert("Email address updated successfully!");
                        window.sessionStorage.setItem("id", newEmail);

                        setEmail(newEmail);

                        handleClose2();
                    } else {
                        alert("Failed to update email address!");
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
                            Change Email Address
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                            <Typography sx={{ width: "150px", mr: 5, mt: 3 }} variant="h10" component="h4">
                                Enter Email Address
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <OutlinedTextField
                                    value={newEmail}
                                    onChange={setNewEmail}
                                    isValidId={isValidId}
                                    setIdError={setIdError}
                                    label="Enter the new email address"
                                    onKeyPress={checkenterSubmit}
                                />
                                <FormHelperText sx={{ mt: -2, fontSize: "1em", color: "red" }}>
                                    {idError}
                                </FormHelperText>
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", mt: 2, ml: 47 }}>
                            <Box sx={{ mr: 3 }}>
                                <CustomizedButton label="Check Duplicate" onClick={idDuplicateCheck}></CustomizedButton>
                            </Box>
                            <CustomizedButton
                                label="Confirm"
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
