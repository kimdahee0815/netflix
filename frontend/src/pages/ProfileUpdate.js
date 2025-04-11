import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import TextField from "@mui/material/TextField";

const renderProfileImage = (profileId) => {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRVHHNwcCOQ4Y7ulfRG1cZb9joFo5CV921mN1Ha1skrsyRx7PJcLa1stsjBm79z7QV9pQ&usqp=CAU",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png",
    "https://external-preview.redd.it/0dTT-3SprPcsNCqo1GTCI-nqGM9EdZYwqyYr_pZ-baE.jpg?auto=webp&s=a1e8532d326f5aa122df2f31694bf142f117fc06",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png",
  ];

  return (
    <img
      src={images[profileId - 1]}
      alt={`프로필 ${profileId}`}
      style={{
        width: "180px",
        height: "180px",
        objectFit: "cover",
        marginLeft: "-15%",
        marginBottom: "-90px",
        marginRight: "30px",
      }}
    />
  );
};

const ProfileUpdate = () => {
  const [nickname, setNickname] = useState("");
  const { profileId } = useParams();
  const member_id = window.sessionStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(profileId);
    axios
      .post("http://localhost:8080/profileDetail", {
        member_id: member_id,
        profile_id: profileId,
      })
      .then((res) => {
        setNickname(res.data.nickname);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSave = () => {
    axios
      .put("http://localhost:8080/updateprofiles", {
        member_id: member_id,
        profile_id: parseInt(profileId, 10),
        nickname: nickname,
      })
      .then((res) => {
        if (res.data !== null) {
          alert("프로필 변경 성공!");
          navigate("/profiles");
        } else {
          alert("프로필 변경 실패!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = () => {
    axios
      .post("http://localhost:8080/profileDetail", {
        member_id: member_id,
        profile_id: profileId,
      })
      .then((res) => {
        axios
          .delete(
            `http://localhost:8080/deleteprofiles?member_id=${member_id}&profile_id=${profileId}`
          )
          .then(() => {
            if (window.localStorage.getItem("profile_num") === profileId) {
              window.localStorage.setItem("profile_num", 1);
            } else {
              window.localStorage.setItem(
                "profile_num",
                window.localStorage.getItem("profile_num") - 1
              );
            }

            navigate("/profiles");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    navigate("/profiles");
  };

  return (
    <Box sx={{ backgroundColor: "#141414", minHeight: "100vh" }}>
      <Box
        sx={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "30px 20px",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "4rem" }}>프로필 변경</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {renderProfileImage(parseInt(profileId, 10))}

          <TextField
            value={nickname}
            autoComplete="off"
            label="수정하실 닉네임을 적어주세요."
            variant="outlined"
            onChange={(e) => setNickname(e.target.value)}
            sx={{
              width: "40%",
              borderRadius: "10px",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
            InputLabelProps={{
              style: {
                color: "#fff",
              },
            }}
            InputProps={{
              style: {
                color: "#fff",
              },
            }}
          />
        </div>

        <ProfileUpdateForm />
        <div
          style={{
            marginRight: "40px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={handleSave}
            variant="outlined"
            sx={{
              color: "#c4c4c4",
              border: "1px solid #c4c4c4",
              backgroundColor: "#000",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#c4c4c4",
                color: "#000",
              },
            }}
          >
            저장
          </Button>
          <Button
            onClick={handleDelete}
            variant="outlined"
            sx={{
              color: "#c4c4c4",
              border: "1px solid #c4c4c4",
              backgroundColor: "#000",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#c4c4c4",
                color: "#000",
              },
            }}
          >
            삭제
          </Button>
          <Button
            onClick={handleCancel}
            variant="outlined"
            sx={{
              color: "#c4c4c4",
              border: "1px solid #c4c4c4",
              backgroundColor: "#000",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#c4c4c4",
                color: "#000",
              },
            }}
          >
            취소
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default ProfileUpdate;
