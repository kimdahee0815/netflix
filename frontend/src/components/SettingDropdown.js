import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

export default function FadeMenu({ onClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{ p: 0 }}
          onClick={handleClick}
        >
          <SettingsIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "50px" }}
        id="menu-appbar"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem component={Link} to="/customercenter">
          <Typography textAlign="center">{"고객센터"}</Typography>
        </MenuItem>

        <MenuItem component={Link} to="/mypage">
          <Typography textAlign="center">{"마이페이지"}</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/profiles">
          <Typography textAlign="center">{"프로필 변경"}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onClick}>
          <Typography textAlign="center">{"로그아웃"}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
