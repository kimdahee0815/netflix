import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import ProfileAdd from "../components/ProfileAdd";
import ProfilesManageBtn from "../components/ProfilesManageBtn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const PageTitle = ({ manageMode }) => {
  return (
    <div
      style={{
        color: "white",
        fontSize: "3em",
        textAlign: "center",
        paddingTop: "120px",
      }}
    >
      {manageMode ? "프로필 관리" : "넷플릭스를 시청할 프로필을 선택하세요. "}
    </div>
  );
};

function ProfileManager() {
  const [profiles, setProfiles] = useState([]);

  const memberID = window.sessionStorage.getItem("id");

  useEffect(() => {
    loadProfiles(memberID);
  }, [memberID]);

  const loadProfiles = (memberID) => {
    axios
      .post("http://localhost:8080/profiles", {
        member_id: memberID,
      })
      .then((res) => {
        console.log("res profiles", res.data);
        setProfiles(res.data);
      })
      .catch((error) => {
        console.error("Error loading profiles:", error);
      });
  };

  const addProfile = async (newNickname) => {
    try {
      await axios.post("http://localhost:8080/insertprofiles", {
        member_id: memberID,
        nickname: newNickname,
      });
      loadProfiles(memberID);
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const profileImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRVHHNwcCOQ4Y7ulfRG1cZb9joFo5CV921mN1Ha1skrsyRx7PJcLa1stsjBm79z7QV9pQ&usqp=CAU",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png",
    "https://external-preview.redd.it/0dTT-3SprPcsNCqo1GTCI-nqGM9EdZYwqyYr_pZ-baE.jpg?auto=webp&s=a1e8532d326f5aa122df2f31694bf142f117fc06",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png",
  ];

  const [manageMode, setManageMode] = useState(false);

  const toggleManageMode = () => {
    setManageMode(!manageMode);
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <ArrowBackIosNewIcon
        sx={{
          display: "flex",
          marginRight: "10px",
          color: "white",
          fontSize: "3em",
          "&:hover": {
            cursor: "pointer",
            boxSizing: "border-box",
            fontWeight: "bold",
            opacity: [0.9, 0.8, 0.7],
          },
          ml: 3,
          mt: 4,
        }}
        onClick={goBack}
      />
      <PageTitle manageMode={manageMode} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "45px 20px",
        }}
      >
        {profiles.map((profile, index) => (
          <Grid key={profile.profile_id} item xs={3} style={{ margin: "10px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 180,
                position: "relative",
                boxSizing: "border-box",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Link
                to={
                  manageMode
                    ? `/profile/edit/${memberID}/${profile.profile_id}`
                    : `/login/${profile.profile_id}`
                }
              >
                <Box
                  component="img"
                  sx={{
                    width: 180,
                    height: 180,
                    maxHeight: { xs: 180, md: 180 },
                    maxWidth: { xs: 180, md: 180 },
                    boxSizing: "border-box",
                    "&:hover": {
                      backgroundColor: "white",
                      opacity: [0.9, 0.8, 0.7],
                      cursor: "pointer",
                      border: "5px solid white",
                    },
                  }}
                  alt={`Profile ${profile.nickname}`}
                  src={profileImages[index % profileImages.length]}
                />
              </Link>
              {manageMode && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "1.5em",
                      fontWeight: "bold",
                    }}
                  >
                    수정
                  </div>
                </div>
              )}
              <Typography
                variant="h5"
                component="h1"
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                {profile.nickname}
              </Typography>
            </Box>
          </Grid>
        ))}
        {profiles.length < 4 && (
          <Grid item xs={3} style={{ margin: "10px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 180,
                position: "relative",
                boxSizing: "border-box",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => document.getElementById("addProfileImage").click()}
            >
              <Typography
                variant="h5"
                component="h1"
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                <ProfileAdd id="addProfileImage" onAddProfile={addProfile} />
                프로필 추가
              </Typography>
            </Box>
          </Grid>
        )}
      </div>
      <div style={{ textAlign: "center", paddingTop: "40px" }}>
        <ProfilesManageBtn
          onClick={toggleManageMode}
          label={manageMode ? "완료" : "프로필 관리"}
        />
      </div>
    </div>
  );
}

export default ProfileManager;
