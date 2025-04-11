import { useEffect, useRef, useState } from "react";
import { useNavigate, useHistory } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SettingsDropdown from "./SettingDropdown";
import MenuButton from "./MenuButton";
import { useMediaQuery, useTheme } from "@mui/material";

const pages = [
  "다운로드 가장 많은 영화",
  "좋아요 가장 많은 영화",
  "최근 추가 된 영화",
  "찜목록",
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 20,
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavBar = ({
  search,
  setSearch,
  menuClick,
  setMenuClick,
  menuKind,
  setMenuKind,
}) => {
  //Link 컴포넌트를 사용하지 않고 다른 페이지로 이동해야 할때 사용
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  const goSearch = (e) => {
    setSearch(e.target.value);
  };

  const goLogout = () => {
    window.sessionStorage.clear(); // 세션스토리지에 저장된 속성값 모두 삭제
    window.localStorage.removeItem("profile_num");
    navigate("/", { replace: true });
    // 2 방법. window.location.replace("/");
    // 3 방법. return <Navigate to="/" replace={false} />;
  };

  const showSearchResult = (e) => {
    setMenuClick(true);
    setMenuKind(e.target.value);
    // console.log(e.target.value);
    setSearch("");
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const typographySx = isSmallScreen
    ? {
        mr: 2,
        display: { xs: "none" },
        fontFamily: "helvetica",
        fontWeight: 1000,
        letterSpacing: ".1rem",
        color: "red",
        textDecoration: "none",
        fontSize: "1.7em",
      }
    : {
        mr: 2,
        display: "flex",
        fontFamily: "helvetica",
        fontWeight: 1000,
        letterSpacing: ".1rem",
        color: "red",
        textDecoration: "none",
        fontSize: "2em",
        flexGrow: 1,
        [theme.breakpoints.up("md")]: {
          flexGrow: 0,
        },
      };

  return (
    <AppBar position="fixed" style={{ background: "#212121" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ArrowBackIosNewIcon
            sx={{
              display: "flex",
              marginRight: "10px",
              "&:hover": {
                cursor: "pointer",
                boxSizing: "border-box",
                fontWeight: "bold",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
            onClick={goBack}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: { md: "none" },
            }}
          >
            <MenuButton
              search={search}
              setSearch={setSearch}
              menuClick={menuClick}
              setMenuClick={setMenuClick}
              menuKind={menuKind}
              setMenuKind={setMenuKind}
            />
          </Box>

          <Typography noWrap component="a" href="/login" sx={typographySx}>
            NETFLIX
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": {
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "red",
                    opacity: [0.9, 0.8, 0.7],
                    transform: "scale(1.1)",
                  },
                }}
                onClick={showSearchResult}
                value={page}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Search>
            {/* searchbar */}
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={goSearch}
            />
          </Search>
          <Box>
            <SettingsDropdown onClick={goLogout} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
{
  /* searchBar input의 onChange함수에 처음 값이 바뀌었을 때 goLogout 함수를 통해
   navbar(자식컴포넌트)에서 state값 변경해서 부모컴포넌트(LayOut)에  state값 전달, 
   아래에 입력한 값의 변화에 따라 searchResult 띄우기(footer 없어짐)
    logout버튼 누르면 / 로 이동(처음 로그인 페이지) 
    searcbar버튼을 눌렀을 때나 엔터를 쳤을 때 searchResult Link걸어서 searchResult 아래에 보여줌
    
  */
}
