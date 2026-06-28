import { forwardRef, cloneElement, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import config from "../config";
import SelectInput from "./SelectInput";
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
    width: 600,
    height: 700,
    bgcolor: "black",
    border: "1px solid white",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
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
    const [open, setOpen] = useState(openMemberUpdateForm);

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
    const id = info.member_id;
    const [name, setName] = useState(info.member_name);
    const [addr, setAddr] = useState(info.member_addr);
    const [tel, setTel] = useState(info.member_tel);
    const [pwCheck, setPwCheck] = useState(info.pw_answer);
    const [password, setPassword] = useState(info.member_pw);
    const [ConfirmPassword, setConfirmPassword] = useState(info.member_pw);
    const [passwordQuestion, setPasswordQuestion] = useState(info.pw_question);

    const [nameError, setNameError] = useState("");
    const [addrError, setAddrError] = useState("");
    const [pwCheckError, setPwCheckError] = useState("");
    const [telError, setTelError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [pwQError, setPwQError] = useState("");

    const emailInput = document.querySelector("[name=memberemail]");
    const passwordInput = document.querySelector("[name=memberpassword]");
    const passwordConfirmInput = document.querySelector("[name=memberpasswordconfirm]");
    const nameInput = document.querySelector("[name=membername]");
    const telInput = document.querySelector("[name=membertel]");
    const addrInput = document.querySelector("[name=memberaddr]");
    const pwQInput = document.querySelector("[name=pwQ]");
    const pwAInput = document.querySelector("[name=memberpwA]");

    const passwordFocus = () => {
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
            e.preventDefault();
            addrFocus();
        }
    };
    const gotoPwQInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            pwQFocus();
        }
    };
    const gotoPwAInput = (e) => {
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
    };
    const isValidatePhone = (tel) => {
        const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
        return phoneRegex.test(tel.slice(0, 13));
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError(isValidPassword(event.target.value) ? "" : "Password must be 4-20 characters.");
        if (event.target.value === "") {
            setPasswordError("Please enter your password.");
        }
    };

    const handleAddrChange = (event) => {
        setAddr(event.target.value);
        if (event.target.value !== "") {
            setAddrError("");
        } else {
            setAddrError("Please enter your address.");
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
        if (event.target.value !== "") {
            setNameError("");
        } else {
            setNameError("Please enter your name.");
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

        setTelError(isValidatePhone(event.target.value) ? "" : "Please enter a valid phone number.");
        if (event.target.value === "") {
            setTelError("Please enter your phone number.");
        }
    };
    const handlePwCheckChange = (event) => {
        setPwCheck(event.target.value);
        if (event.target.value !== "") {
            setPwCheckError("");
        } else {
            setPwCheckError("Please enter the security answer.");
        }
    };

    const loginCheck = (event) => {
        let check = true;
        if (password !== ConfirmPassword && password !== "") {
            alert("Passwords do not match.");
            check = false;
        }

        let validPassword = password.length >= 4 && password.length <= 20;
        let validTel = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/.test(tel.slice(0, 13));

        if (!password) {
            setPasswordError("Please enter your password.");
            check = false;
        } else if (!validPassword) {
            setPasswordError("Password must be 4-20 characters.");
            check = false;
        }
        if (!name) {
            setNameError("Please enter your name.");
            check = false;
        } else {
            setNameError("");
        }
        if (!tel) {
            setTelError("Please enter your phone number.");
            check = false;
        } else if (!validTel) {
            setTelError("Please enter a valid phone number.");
            check = false;
        }
        if (!addr) {
            setAddrError("Please enter your address.");
            check = false;
        } else {
            setAddrError("");
        }
        if (!passwordQuestion) {
            setPwQError("Please select a security question.");
            check = false;
        } else {
            setPwQError("");
        }
        if (!pwCheck) {
            setPwCheckError("Please enter the security answer.");
            check = false;
        } else {
            setPwCheckError("");
        }

        return check;
    };

    const infoChange = (e) => {
        if (loginCheck()) {
            axios
                .post(`${config.API_URL}/updateMembers`, {
                    member_id: id,
                    member_pw: password,
                    member_name: name,
                    member_tel: tel,
                    member_addr: addr,
                    pw_question: passwordQuestion,
                    pw_answer: pwCheck,
                })
                .then((res) => {
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
                            alert("No changes detected!");
                        } else {
                            alert("Member info updated successfully!");
                        }
                        handleClose2();
                    } else {
                        alert("Failed to update member info!");
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
                            Update Member Info
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
                            <Typography sx={{ width: "150px", mr: 5, mt: 3 }} variant="h10" component="h4">
                                Email Address
                            </Typography>
                            <div
                                style={{
                                    height: "57.6px",
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                                <Typography sx={{ width: "150px", ml: 1, mt: 3, mb: 2 }} variant="h10" component="h4">
                                    {info.member_id}
                                </Typography>
                            </div>
                        </Box>
                        <Box sx={inputFormStyle}>
                            <Typography sx={{ width: "150px", mr: 5, mt: 3 }} variant="h10" component="h4">
                                Password
                            </Typography>
                            <TextField
                                sx={{
                                    my: 1,
                                    width: "360px",
                                    color: "white",
                                    background: "#38393b",
                                    fontSize: "20px",
                                    borderRadius: 1,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "transparent",
                                        "& fieldset": {
                                            borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "&.Mui-focused fieldset": {
                                            border: "2px solid white",
                                        },
                                    },
                                }}
                                autoComplete="off"
                                name="memberpassword"
                                onKeyPress={gotoPasswordConfirmInput}
                                label="Enter your password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <FormHelperText sx={{ color: "red" }}>{passwordError}</FormHelperText>
                        </Box>
                        <Box sx={inputFormStyle}>
                            <Typography sx={{ width: "150px", mr: 5, mt: 3 }} variant="h10" component="h4">
                                Confirm Password
                            </Typography>
                            <TextField
                                sx={{
                                    my: 1,
                                    width: "360px",
                                    color: "white",
                                    background: "#38393b",
                                    fontSize: "20px",
                                    borderRadius: 1,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "transparent",
                                        "& fieldset": {
                                            borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "&.Mui-focused fieldset": {
                                            border: "2px solid white",
                                        },
                                    },
                                }}
                                autoComplete="off"
                                name="memberpasswordconfirm"
                                onKeyPress={gotoNameInput}
                                required
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                                label="Enter your password"
                                type="password"
                                value={ConfirmPassword}
                                onChange={onConfirmPasswordHandler}
                            />
                        </Box>
                        <Box sx={inputFormStyle}>
                            <Typography sx={{ width: "150px", mr: 5, mt: 3 }} variant="h10" component="h4">
                                Name
                            </Typography>
                            <TextField
                                sx={{
                                    my: 1,
                                    width: "360px",
                                    color: "white",
                                    background: "#38393b",
                                    fontSize: "20px",
                                    borderRadius: 1,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "transparent",
                                        "& fieldset": {
                                            borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "&.Mui-focused fieldset": {
                                            border: "2px solid white",
                                        },
                                    },
                                }}
                                autoComplete="off"
                                name="membername"
                                onKeyPress={gotoTelInput}
                                label="Enter your name"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                required
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <FormHelperText sx={{ color: "red" }}>{nameError}</FormHelperText>
                        </Box>
                        <Box sx={inputFormStyle}>
                            <Typography sx={{ width: "150px", mr: 5, mt: 3 }} variant="h10" component="h4">
                                Phone Number
                            </Typography>
                            <TextField
                                sx={{
                                    my: 1,
                                    width: "360px",
                                    color: "white",
                                    background: "#38393b",
                                    fontSize: "20px",
                                    borderRadius: 1,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "transparent",
                                        "& fieldset": {
                                            borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "&.Mui-focused fieldset": {
                                            border: "2px solid white",
                                        },
                                    },
                                }}
                                autoComplete="off"
                                name="membertel"
                                onKeyPress={gotoAddrInput}
                                label="Enter your phone number"
                                required
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                                value={tel}
                                onChange={handleTelChange}
                            />
                            <FormHelperText sx={{ color: "red" }}>{telError}</FormHelperText>
                        </Box>
                        <Box sx={inputFormStyle}>
                            <Typography sx={{ width: "150px", mr: 5, mt: 3 }} variant="h10" component="h4">
                                Address
                            </Typography>
                            <TextField
                                sx={{
                                    my: 1,
                                    width: "360px",
                                    color: "white",
                                    background: "#38393b",
                                    fontSize: "20px",
                                    borderRadius: 1,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "transparent",
                                        "& fieldset": {
                                            borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "&.Mui-focused fieldset": {
                                            border: "2px solid white",
                                        },
                                    },
                                }}
                                autoComplete="off"
                                name="memberaddr"
                                onKeyPress={gotoPwQInput}
                                label="Enter your address"
                                required
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                                value={addr}
                                onChange={handleAddrChange}
                            />

                            <FormHelperText sx={{ color: "red" }}>{addrError}</FormHelperText>
                        </Box>
                        <Box sx={inputFormStyle} style={{ marginTop: "2px", height: "92px" }}>
                            <Typography sx={{ width: "150px", mr: 5, mt: 3 }} variant="h10" component="h4">
                                Security Question
                            </Typography>
                            <SelectInput
                                sx={{
                                    my: 1,
                                    width: "360px",
                                    color: "white",
                                    background: "#38393b",
                                    fontSize: "20px",
                                    borderRadius: 1,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "transparent",
                                        "& fieldset": {
                                            borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "&.Mui-focused fieldset": {
                                            border: "2px solid white",
                                        },
                                    },
                                }}
                                autoComplete="off"
                                onKeyPress={gotoPwAInput}
                                setPwQError={setPwQError}
                                passwordQuestion={passwordQuestion}
                                setPasswordQuestion={setPasswordQuestion}
                            />
                            <FormHelperText sx={{ color: "red", mt: -3, mb: 3 }}>{pwQError}</FormHelperText>
                        </Box>
                        <Box sx={inputFormStyle}>
                            <Typography sx={{ width: "150px", mr: 5, mt: 3 }} variant="h10" component="h4">
                                Security Answer
                            </Typography>

                            <TextField
                                sx={{
                                    my: 1,
                                    width: "360px",
                                    color: "white",
                                    background: "#38393b",
                                    fontSize: "20px",
                                    borderRadius: 1,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "transparent",
                                        "& fieldset": {
                                            borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "&.Mui-focused fieldset": {
                                            border: "2px solid white",
                                        },
                                    },
                                }}
                                autoComplete="off"
                                name="memberpwA"
                                label="Answer to the security question"
                                required
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                                value={pwCheck}
                                onChange={handlePwCheckChange}
                                onKeyPress={checkenterSubmit}
                            />
                            <FormHelperText sx={{ color: "red" }}>{pwCheckError}</FormHelperText>
                        </Box>
                        <Box sx={{ mx: "auto", width: 100, marginTop: "15px" }}>
                            <CustomizedButton label="Save Changes" onClick={infoChange}></CustomizedButton>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
