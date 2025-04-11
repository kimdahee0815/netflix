import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MypageDropDown = () => {
  const memberID = window.sessionStorage.getItem("id");
  const profileNum = window.localStorage.getItem("profile_num");
  const [profileNickname, setProfileNickName] = useState("USER");
  useEffect(() => {
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
            // console.log(window.profile_num);
            setProfileNickName(res.data[profileNum - 1].nickname);
            setProfileImg(profileImages[profileNum - 1]);
          } else {
            // console.log(window.profile_num);
            setProfileNickName(res.data[0].nickname);
            setProfileImg(profileImages[0]);
          }
        }
      })
      .catch((error) => {
        console.error("Error loading profiles:", error);
      });
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("");
  const profileImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRVHHNwcCOQ4Y7ulfRG1cZb9joFo5CV921mN1Ha1skrsyRx7PJcLa1stsjBm79z7QV9pQ&usqp=CAU",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png",
    "https://external-preview.redd.it/0dTT-3SprPcsNCqo1GTCI-nqGM9EdZYwqyYr_pZ-baE.jpg?auto=webp&s=a1e8532d326f5aa122df2f31694bf142f117fc06",
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png",
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    window.sessionStorage.clear(); // 세션스토리지에 저장된 속성값 모두 삭제
    window.localStorage.removeItem("profile_num");
    navigate("/", { replace: true }); // 로그인페이지로 이동
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {profileImg === "" ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: 350,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                pr: 2,
              }}
            >
              <Typography sx={{ fontSize: 15, color: "white", mt: 2 }}>
                SELECT PROFILE
              </Typography>
            </Box>
            <AccountBoxIcon
              sx={{
                fontSize: 40,
                color: "grey",
              }}
            />
            <ArrowDropDownIcon
              style={{
                marginTop: 6,
                marginLeft: 5,
                fontSize: "2rem",
                color: "white",
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: 350,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                pr: 2,
              }}
            >
              <Typography
                sx={{
                  textTransform: "none",
                  fontSize: 25,
                  color: "white",
                  mt: 1,
                }}
              >
                {profileNickname}
              </Typography>
            </Box>
            <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                maxHeight: { xs: 50, md: 50 },
                maxWidth: { xs: 50, md: 50 },
              }}
              src={profileImg}
            />
            <ArrowDropDownIcon
              style={{
                marginTop: 10,
                marginLeft: 5,
                fontSize: "2rem",
                color: "white",
              }}
            />
          </Box>
        )}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mt: 6 }}
      >
        <MenuItem component={Link} to="/profiles">
          프로필 관리
        </MenuItem>

        <MenuItem component={Link} to="/customercenter">
          고객 센터
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout} component={Link} to="/">
          로그아웃
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MypageDropDown;
