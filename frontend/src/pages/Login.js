import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import PasswordCheck from "../components/passwordCheck";
import CustomizedButton from "../components/CustomizedButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUp from "../components/SignUp";
import config from "../config";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff",
        },
    },
});

function Login() {
    const emailRef = useRef();
    const pwRef = useRef();

    const navigate = useNavigate();
    const { profile_num } = useParams();

    window.profile_num = { profile_num };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [saveAccount, setSaveAccount] = useState(false);

    const emailLabel = "Email Address";
    const pwLabel = "Password";

    const emailInput = document.querySelector("[name=email]");
    const passwordInput = document.querySelector("[name=password]");

    const emailFocus = () => {
        emailInput?.focus();
    };

    const passwordFocus = () => {
        passwordInput?.focus();
    };

    const gotoPasswordInput = (e) => {
        if (e.key === "Enter") {
            passwordFocus();
        }
    };

    useEffect(() => {
        emailFocus();
        if (window.localStorage.getItem("id") !== null) {
            setSaveAccount(true);
            setEmail(window.localStorage.getItem("id"));
            axios
                .post(`${config.API_URL}/selectMember`, {
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
    };

    const isValidPassword = (password) => {
        const passwordRegex = password.length >= 4 && password.length <= 20;
        return passwordRegex;
    };

    const handleEmailChange = (event) => {
        setEmail((value) => event.target.value);
        setEmailError(isValidEmail(event.target.value) ? "" : "Please enter a valid email address.");
    };

    const handlePasswordChange = (event) => {
        setPassword((value) => event.target.value);
        setPasswordError(isValidPassword(event.target.value) ? "" : "Password must be 4-20 characters.");
    };

    const checkSubmit = (event) => {
        let validEmail = /\S+@\S+.\S+/.test(email);
        let validPassword = password.length >= 4 && password.length <= 60;
        if (!email) {
            setEmailError("Please enter your email.");
            emailRef.current.focus();
        } else if (!validEmail) {
            setEmailError("Please enter a valid email address.");
            emailRef.current.focus();
        }
        if (!password) {
            setPasswordError("Please enter your password.");
            pwRef.current.focus();
        } else if (!validPassword) {
            setPasswordError("Password must be 4-20 characters.");
            pwRef.current.focus();
        }
        if (validEmail && validPassword) {
            handleLogin();
        }
    };

    const handleLogin = () => {
        axios
            .post(`${config.API_URL}/selectMember`, {
                member_id: email,
            })
            .then((res) => {
                if (res.data) {
                    axios
                        .post(`${config.API_URL}/login`, {
                            member_id: email,
                            member_pw: password,
                        })
                        .then((res) => {
                            if (res.data === 1) {
                                window.sessionStorage.setItem("id", email);
                                window.localStorage.removeItem("profile_num");
                                if (saveAccount === true) {
                                    window.localStorage.clear();
                                    window.localStorage.setItem("id", email);
                                } else {
                                    if (
                                        window.localStorage.getItem("id") !== null &&
                                        window.localStorage.getItem("id") === window.sessionStorage.getItem("id")
                                    ) {
                                        window.localStorage.clear();
                                    }
                                }
                                navigate("/");
                            } else {
                                alert("Incorrect password!");
                                navigate("/login");
                            }
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                } else {
                    alert("No matching email address found!");
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

    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => {
        setOpenModal(false);
    };

    const [openSignUp, setOpenSignUp] = useState(false);

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
        <ThemeProvider theme={theme}>
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
                        Sign In
                    </Typography>
                    <TextField
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
                    />
                    <FormHelperText sx={{ padding: "1px", color: "red" }}>{emailError}</FormHelperText>

                    <TextField
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
                                    label="Remember me"
                                    sx={{ mr: "auto" }}
                                />
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: "50%", justifyContent: "end" }}>
                            <Box>
                                <CustomizedButton
                                    label="Forgot Password"
                                    value="forgot-password"
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
                        Sign In
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
                                label="Sign Up Now"
                                value="sign-up"
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
        </ThemeProvider>
    );
}

export default Login;
