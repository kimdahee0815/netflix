import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect } from "react";
import { Divider } from "@mui/material";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const location = useLocation();

  const [user, setUser] = React.useState(window.sessionStorage.getItem("id"));
  const [userName, setUserName] = React.useState("");

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

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            display: { sm: "block", md: "block" },
            textAlign: "center",
            fontFamily: "Georgia, serif",
            fontWeight: 9,
            fontSize: "1.3em",
            color: "white",
          }}
          textTransform="none"
        >
          {user}
        </Typography>

        <ArrowDropDownIcon style={{ fontSize: "3rem", color: "red" }} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ mt: 6 }}
      >
        <MenuItem component={Link} to="/mypage">
          마이페이지
        </MenuItem>
        {location.pathname === "/customercenter" ? null : (
          <MenuItem component={Link} to="/customercenter">
            고객센터
          </MenuItem>
        )}
        <MenuItem component={Link} to="/profiles">
          프로필 관리
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout} component={Link} to="/">
          로그아웃
        </MenuItem>
      </Menu>
    </div>
  );
}
