import React from "react";
import Container from "@mui/material/Container";
import { Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CustomizedButton from "./CustomizedButton";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OutlinedTextField from "./OutlinedTextField";
import EmailChange from "./EmailChange";
import PasswordChange from "./PasswordChange";
import PhoneChange from "./PhoneChange";
import axios from "axios";
import { useMediaQuery, useTheme } from "@mui/material";
import { useLayoutEffect, useEffect } from "react";

const MyPageBody = () => {
  const theme = useTheme();
  const [passwordSearch, setPasswordSearch] = useState(false);
  const [email, setEmail] = useState(window.sessionStorage.getItem("id"));
  const [tel, setTel] = useState("");
  const [pw, setPw] = useState("");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isxSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isMiddleScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [user, setUser] = React.useState(window.sessionStorage.getItem("id"));
  const [userName, setUserName] = React.useState("");
  const [profiles, setProfiles] = useState();
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
      .post("http://localhost:8080/selectMember", {
        member_id: user,
      })
      .then((res) => {
        console.log("selectMember =>", res);
        if (res.data !== null) {
          setUserName(res.data.member_name);
          // alert("정보 확인 성공!");
        } else {
          alert("정보 확인 실패!");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  useEffect(() => {
    axios
      .post("http://localhost:8080/selectMember", {
        member_id: email,
      })
      .then((res) => {
        console.log("selectMember =>", res);
        if (res.data !== null) {
          setTel(res.data.member_tel);
          setPw(res.data.member_pw);
          // alert("정보 확인 성공!");
        } else {
          alert("정보 확인 실패!");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [email, pw, tel]);

  const [memberID, setMemberID] = useState(window.sessionStorage.getItem("id"));
  const [profileNickname, setProfileNickName] =
    useState("저장된 프로필이 없습니다");
  const profileNum = window.localStorage.getItem("profile_num");

  useLayoutEffect(() => {
    loadProfiles(memberID);
  }, [memberID]);

  const loadProfiles = (memberID) => {
    console.log("MEMBERID", memberID);
    axios
      .post("http://localhost:8080/profiles", {
        member_id: memberID,
      })
      .then((res) => {
        console.log("res profiles", res.data);
        if (res.data.length > 0) {
          if (profileNum !== undefined) {
            console.log("profileNum1", profileNum);
            setProfileNickName(res.data[profileNum - 1].nickname);
            setProfileImg(profileImages[profileNum - 1]);
          } else {
            console.log("profileNum2", profileNum);
            setProfileNickName(res.data[0].nickname);
            setProfileImg(profileImages[0]);
          }
        }
      })
      .catch((error) => {
        console.error("Error loading profiles:", error);
      });
  };

  const [openEmailModal, setOpenEmailModal] = React.useState(false);
  const [openPwModal, setOpenPwModal] = React.useState(false);
  const [openPhoneModal, setOpenPhoneModal] = React.useState(false);

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
      .post("http://localhost:8080/deleteMember", {
        member_id: email,
      })
      .then((res) => {
        console.log("deleteMember =>", res);
        if (res.data === 1) {
          alert("회원 탈퇴되었습니다.");
          axios
            .post("http://localhost:8080/favmovie/remove", {
              member_id: window.sessionStorage.getItem("id"),
            })
            .then((res) => {
              window.localStorage.removeItem("profile_num");
            })
            .catch((e) => {
              console.error(e);
            });
          axios
            .post("http://localhost:8080/customer/deletebyid", {
              member_id: window.sessionStorage.getItem("id"),
            })
            .then((res) => {})
            .catch((e) => {
              console.error(e);
            });
          axios
            .post("http://localhost:8080/deleteProfileMember", {
              member_id: window.sessionStorage.getItem("id"),
            })
            .then((res) => {})
            .catch((e) => {
              console.error(e);
            });

          if (
            window.localStorage.getItem("id") ===
            window.sessionStorage.getItem("id")
          ) {
            window.localStorage.clear();
          }
          window.sessionStorage.clear();

          navigate("/", { return: true });
        } else {
          alert("회원 탈퇴 실패!");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const deleteLoginInfo = () => {
    if (window.localStorage.getItem("id") !== null) {
      if (
        window.sessionStorage.getItem("id") ===
        window.localStorage.getItem("id")
      ) {
        window.localStorage.clear();
        alert("로그인 정보가 삭제되었습니다!");
      } else {
        alert("로그인 정보 삭제 권한이 없습니다!");
      }
    } else {
      alert("저장된 로그인 정보가 없습니다!");
    }
  };

  return (
    <Container sx={{ paddingTop: "100px" }}>
      <Typography sx={{ fontSize: 35, mb: 2 }}>계정</Typography>
      <Divider />
      <Grid container sx={{ m: 1 }}>
        {isSmallScreen ? (
          <Grid
            item
            xs={12}
            sx={{ fontSize: 19, color: "black", mb: 3, fontWeight: "bold" }}
          >
            멤버십 & 결제 정보
          </Grid>
        ) : (
          <Grid
            item
            xs={3}
            sx={{ fontSize: 19, color: "black", fontWeight: "bold" }}
          >
            멤버십 & 결제 정보
          </Grid>
        )}

        <Grid item xs={9} sx={{ direction: "column" }}>
          <Grid container>
            <Grid item xs={9} sx={{ pl: 2, pt: 3, color: "gray" }}>
              이메일 주소 : {email}
            </Grid>
            <Grid item xs={2} sx={{ p: 2 }}>
              <Box sx={{ width: 200 }}>
                <CustomizedButton
                  label="이메일 주소 변경"
                  value="emailChange"
                  onClick={handleEmailOpen}
                ></CustomizedButton>
                {openEmailModal ? (
                  <EmailChange
                    value="이메일 주소"
                    openModal={openEmailModal}
                    setOpenModal={setOpenEmailModal}
                    handleOpen={handleEmailOpen}
                    handleClose={handleEmailClose}
                    setEmail={setEmail}
                  ></EmailChange>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={9} sx={{ pl: 2, pt: 3, color: "gray" }}>
              비밀번호 : {pw}
            </Grid>
            <Grid item xs={2} sx={{ p: 2 }}>
              <Box sx={{ width: "200%" }}>
                <CustomizedButton
                  label="비밀번호 변경"
                  value="passwordChange"
                  onClick={handlePwOpen}
                ></CustomizedButton>
                {openPwModal ? (
                  <PasswordChange
                    label="마이페이지 비밀번호 변경"
                    openPwModal={openPwModal}
                    setOpenPwModal={setOpenPwModal}
                    handlePwOpen={handlePwOpen}
                    handlePwClose={handlePwClose}
                    setPasswordSearch={setPasswordSearch}
                    setPw={setPw}
                    pw={pw}
                  ></PasswordChange>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={9} sx={{ pl: 2, pt: 3, color: "gray" }}>
              휴대폰 번호 : {tel}
            </Grid>
            <Grid item xs={2} sx={{ p: 2 }}>
              <Box sx={{ width: 200, mb: 2 }}>
                <CustomizedButton
                  label="휴대폰 번호 변경"
                  value="phoneChange"
                  onClick={handlePhoneOpen}
                ></CustomizedButton>
                {openPhoneModal ? (
                  <PhoneChange
                    value="휴대폰 번호"
                    openModal={openPhoneModal}
                    setOpenModal={setOpenPhoneModal}
                    handleOpen={handlePhoneOpen}
                    handleClose={handlePhoneClose}
                    setTel={setTel}
                    tel={tel}
                  ></PhoneChange>
                ) : null}
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={10} sx={{ p: 2 }}>
              결제 정보가 없습니다
            </Grid>
            <Grid item xs={2} sx={{ p: 2 }}></Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider />

      <Grid container sx={{ m: 1 }}>
        {isSmallScreen ? (
          <Grid
            item
            xs={12}
            sx={{ fontSize: 19, color: "black", mb: 3, fontWeight: "bold" }}
          >
            멤버십 상세 정보
          </Grid>
        ) : (
          <Grid
            item
            xs={3}
            sx={{ fontSize: 19, color: "black", fontWeight: "bold" }}
          >
            멤버십 상세 정보
          </Grid>
        )}

        <Grid item xs={9} sx={{ direction: "column" }}>
          {isSmallScreen ? (
            <Grid container>
              <Grid item xs={12} sx={{ p: 2 }}>
                스트리밍 멤버십에 가입하지 않으셨습니다.
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={9} sx={{ p: 2 }}>
                스트리밍 멤버십에 가입하지 않으셨습니다.
              </Grid>
              <Grid item xs={3} sx={{ pr: 2 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    mr: 5,
                    mb: 3,
                    color: "blue",
                    textAlign: "right",
                    mt: 2,
                  }}
                >
                  스트리밍 멤버십 추가
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Divider />

      <Grid container sx={{ m: 1 }}>
        {isSmallScreen ? (
          <Grid
            item
            xs={12}
            sx={{ fontSize: 19, color: "black", mb: 3, fontWeight: "bold" }}
          >
            프로필 & 자녀 보호 설정
          </Grid>
        ) : (
          <Grid
            item
            xs={3}
            sx={{ fontSize: 19, color: "black", fontWeight: "bold" }}
          >
            프로필 & 자녀 보호 설정
          </Grid>
        )}

        <Grid item xs={9} sx={{ direction: "row" }}>
          <Grid container>
            <Box sx={{ display: "flex" }}>
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
            <Grid></Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider />
      <Grid container sx={{ m: 1 }}>
        <Grid
          item
          xs={3}
          sx={{ fontSize: 19, color: "black", fontWeight: "bold" }}
        >
          설정
        </Grid>
        <Grid item xs={9} sx={{ color: "blue" }}>
          마케팅 커뮤니케이션
        </Grid>
      </Grid>
      <Divider />
      {isSmallScreen ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            mt: 5,
          }}
        >
          {user === "admin@email.com" ? (
            <Box sx={{ mr: 3 }}>
              <CustomizedButton
                label="넷플릭스 회원 관리하기"
                onClick={gotoMemberBoard}
              ></CustomizedButton>
            </Box>
          ) : null}
          <Box sx={{ mr: 3, mt: 2 }}>
            <CustomizedButton
              label="로그인 정보 삭제하기"
              value="로그인 정보 삭제하기2"
              onClick={deleteLoginInfo}
            ></CustomizedButton>
          </Box>
          <Box sx={{ mr: 3, mt: 2 }}>
            <CustomizedButton
              label="탈퇴하기"
              value="탈퇴하기2"
              onClick={deleteAccount}
            ></CustomizedButton>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "end", mt: 5 }}>
          {user === "admin@email.com" ? (
            <Box sx={{ mr: 3 }}>
              <CustomizedButton
                label="넷플릭스 회원 관리하기"
                onClick={gotoMemberBoard}
              ></CustomizedButton>
            </Box>
          ) : null}
          <Box sx={{ mr: 3 }}>
            <CustomizedButton
              label="로그인 정보 삭제하기"
              onClick={deleteLoginInfo}
            ></CustomizedButton>
          </Box>
          <Box>
            <CustomizedButton
              label="탈퇴하기"
              onClick={deleteAccount}
            ></CustomizedButton>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default MyPageBody;
