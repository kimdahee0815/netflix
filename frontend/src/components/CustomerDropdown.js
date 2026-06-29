import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import config from "../config";

export default function PositionedMenu() {
    const memberId = window.sessionStorage.getItem("id");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const location = useLocation();

    const user = useState(window.sessionStorage.getItem("id"));

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        window.sessionStorage.clear();
        window.localStorage.removeItem("profile_num");
        navigate("/login", { replace: true });
    };

    const login = () => {
        navigate("/login", { replace: true });
    };

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
                {memberId && (
                    <MenuItem component={Link} to="/mypage">
                        My Page
                    </MenuItem>
                )}
                {location.pathname === "/customercenter" ? null : (
                    <MenuItem component={Link} to="/customercenter">
                        Customer Center
                    </MenuItem>
                )}
                {memberId && (
                    <MenuItem component={Link} to="/profiles">
                        Manage Profile
                    </MenuItem>
                )}

                <Divider />
                {memberId !== null ? (
                    <MenuItem onClick={logout} component={Link} to="/">
                        Logout
                    </MenuItem>
                ) : (
                    <MenuItem onClick={login} component={Link} to="/login">
                        Login
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}
