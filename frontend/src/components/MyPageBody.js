import { useCallback, useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import EmailChange from "./EmailChange";
import PasswordChange from "./PasswordChange";
import PhoneChange from "./PhoneChange";
import CustomizedButton from "./CustomizedButton";
import config from "../config";

const MyPageBody = () => {
    const theme = useTheme();
    const [passwordSearch, setPasswordSearch] = useState(false);
    const [email, setEmail] = useState(window.sessionStorage.getItem("id"));
    const [tel, setTel] = useState("");
    const [pw, setPw] = useState("");
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const user = window.sessionStorage.getItem("id");

    const [profileImg, setProfileImg] = useState("");
    const profileImages = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRVHHNwcCOQ4Y7ulfRG1cZb9joFo5CV921mN1Ha1skrsyRx7PJcLa1stsjBm79z7QV9pQ&usqp=CAU",
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png",
        "https://external-preview.redd.it/0dTT-3SprPcsNCqo1GTCI-nqGM9EdZYwqyYr_pZ-baE.jpg?auto=webp&s=a1e8532d326f5aa122df2f31694bf142f117fc06",
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png",
    ];

    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`${config.API_URL}/selectMember?member_id=${user}`)
            .then((res) => {
                if (res.data !== null) {
                } else {
                    alert("Failed to confirm info!");
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }, [user]);
    useEffect(() => {
        axios
            .get(`${config.API_URL}/selectMember?member_id=${email}`)
            .then((res) => {
                if (res.data !== null) {
                    setTel(res.data.member_tel);
                    setPw(res.data.member_pw);
                } else {
                    alert("Failed to confirm info!");
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }, [email, pw, tel]);

    const memberID = window.sessionStorage.getItem("id");
    const [profileNickname, setProfileNickName] = useState("No Profile.");
    const profileNum = window.localStorage.getItem("profile_num");

    const loadProfiles = useCallback(
        (memberID) => {
            axios
                .post(`${config.API_URL}/profiles`, {
                    member_id: memberID,
                })
                .then((res) => {
                    if (res.data.length > 0) {
                        if (profileNum !== undefined) {
                            setProfileNickName(res.data[profileNum - 1].nickname);
                            setProfileImg(profileImages[profileNum - 1]);
                        } else {
                            setProfileNickName(res.data[0].nickname);
                            setProfileImg(profileImages[0]);
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error loading profiles:", error);
                });
        },
        [profileImages, profileNum],
    );

    useLayoutEffect(() => {
        loadProfiles(memberID);
    }, [loadProfiles, memberID]);

    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [openPwModal, setOpenPwModal] = useState(false);
    const [openPhoneModal, setOpenPhoneModal] = useState(false);

    const handleEmailOpen = () => {
        setOpenEmailModal(true);
    };
    const handleEmailClose = () => {
        setOpenEmailModal(false);
    };

    const handlePwOpen = () => {
        setOpenPwModal(true);
    };
    const handlePwClose = () => {
        setOpenPwModal(false);
    };

    const handlePhoneOpen = () => {
        setOpenPhoneModal(true);
    };
    const handlePhoneClose = () => {
        setOpenPhoneModal(false);
    };

    const gotoMemberBoard = () => {
        navigate("/memberBoard");
    };
    const deleteAccount = () => {
        axios
            .post(`${config.API_URL}/deleteMember`, {
                member_id: email,
            })
            .then((res) => {
                if (res.data === 1) {
                    alert("Account deleted successfully.");
                    axios
                        .post(`${config.API_URL}/favmovie/remove`, {
                            member_id: window.sessionStorage.getItem("id"),
                        })
                        .then((res) => {
                            window.localStorage.removeItem("profile_num");
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                    axios
                        .post(`${config.API_URL}/customer/deletebyid`, {
                            member_id: window.sessionStorage.getItem("id"),
                        })
                        .then((res) => {})
                        .catch((e) => {
                            console.error(e);
                        });
                    axios
                        .post(`${config.API_URL}/deleteProfileMember`, {
                            member_id: window.sessionStorage.getItem("id"),
                        })
                        .then((res) => {})
                        .catch((e) => {
                            console.error(e);
                        });

                    if (window.localStorage.getItem("id") === window.sessionStorage.getItem("id")) {
                        window.localStorage.clear();
                    }
                    window.sessionStorage.clear();

                    navigate("/", { return: true });
                } else {
                    alert("Failed to delete account!");
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const deleteLoginInfo = () => {
        if (window.localStorage.getItem("id") !== null) {
            if (window.sessionStorage.getItem("id") === window.localStorage.getItem("id")) {
                window.localStorage.clear();
                alert("Login info deleted!");
            } else {
                alert("You do not have permission to delete login info!");
            }
        } else {
            alert("No saved login info found!");
        }
    };

    return (
        <Container sx={{ paddingTop: "100px" }}>
            <Typography sx={{ fontSize: 35, mb: 2 }}>Account</Typography>
            <Divider />
            {openEmailModal && (
                <EmailChange
                    value="Email Address"
                    openModal={openEmailModal}
                    setOpenModal={setOpenEmailModal}
                    handleOpen={handleEmailOpen}
                    handleClose={handleEmailClose}
                    setEmail={setEmail}
                />
            )}
            {openPwModal && (
                <PasswordChange
                    label="Change Password"
                    openPwModal={openPwModal}
                    setOpenPwModal={setOpenPwModal}
                    handlePwOpen={handlePwOpen}
                    handlePwClose={handlePwClose}
                    setPasswordSearch={setPasswordSearch}
                    setPw={setPw}
                    pw={pw}
                />
            )}
            {openPhoneModal && (
                <PhoneChange
                    value="Phone Number"
                    openModal={openPhoneModal}
                    setOpenModal={setOpenPhoneModal}
                    handleOpen={handlePhoneOpen}
                    handleClose={handlePhoneClose}
                    setTel={setTel}
                    tel={tel}
                />
            )}
            {/* Membership & Payment Info */}
            <Box sx={{ m: 2 }}>
                <Typography sx={{ fontSize: 19, fontWeight: "bold", mb: 2 }}>Membership & Payment Info</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography sx={{ color: "gray" }}>Email Address: {email}</Typography>
                        <Box sx={{ flexShrink: 0 }}>
                            <CustomizedButton label="Change Email" value="emailChange" onClick={handleEmailOpen} />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography sx={{ color: "gray" }}>Password: {pw}</Typography>
                        <Box sx={{ flexShrink: 0 }}>
                            <CustomizedButton label="Change Password" value="passwordChange" onClick={handlePwOpen} />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography sx={{ color: "gray" }}>Phone Number: {tel}</Typography>
                        <Box sx={{ flexShrink: 0 }}>
                            <CustomizedButton
                                label="Change Phone Number"
                                value="phoneChange"
                                onClick={handlePhoneOpen}
                            />
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    <Typography>No payment information</Typography>
                </Box>
            </Box>

            <Divider />

            {/* Membership Details */}
            <Box sx={{ m: 2 }}>
                <Typography sx={{ fontSize: 19, fontWeight: "bold", mb: 2 }}>Membership Details</Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography>You are not subscribed to a streaming membership.</Typography>
                    {!isSmallScreen && (
                        <Typography sx={{ fontSize: 14, color: "blue", textAlign: "right" }}>
                            Add Streaming Membership
                        </Typography>
                    )}
                </Box>
            </Box>

            <Divider />

            {/* Profile & Parental Control Settings */}
            <Box sx={{ m: 2 }}>
                <Typography sx={{ fontSize: 19, fontWeight: "bold", mb: 2 }}>
                    Profile & Parental Control Settings
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {profileImg === "" ? (
                        <AccountBoxIcon sx={{ fontSize: 80 }} />
                    ) : (
                        <Box
                            component="img"
                            sx={{
                                ml: 2,
                                mr: 3,
                                height: 100,
                                width: 100,
                                maxHeight: { xs: 70, md: 100 },
                                maxWidth: { xs: 70, md: 100 },
                            }}
                            src={profileImg}
                        />
                    )}
                    <Typography
                        sx={{
                            pl: 2,
                            display: "flex",
                            alignItems: "center",
                            height: "80px",
                            fontWeight: "bold",
                            fontSize: "1.8em",
                        }}
                    >
                        {profileNickname}
                    </Typography>
                </Box>
            </Box>

            <Divider />

            {/* Settings */}
            <Box sx={{ m: 2 }}>
                <Typography sx={{ fontSize: 19, fontWeight: "bold", mb: 2 }}>Settings</Typography>
                <Typography sx={{ color: "blue" }}>Marketing Communications</Typography>
            </Box>

            <Divider />

            {/* Buttons */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    justifyContent: "end",
                    alignItems: isSmallScreen ? "end" : "center",
                    mt: 5,
                    gap: 2,
                    m: 2,
                }}
            >
                {user === "admin@email.com" && (
                    <CustomizedButton label="Manage Netflix Members" onClick={gotoMemberBoard} />
                )}
                <CustomizedButton label="Delete Login Info" onClick={deleteLoginInfo} />
                <CustomizedButton label="Delete Account" onClick={deleteAccount} />
            </Box>
        </Container>
    );
};

export default MyPageBody;
