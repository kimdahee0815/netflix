import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import SearchResult from "../pages/SearchResult";
import DownLoadmany from "./DownLoadmany";
import GoodMany from "./GoodMany";
import NewDateAdd from "./NewDateAdd";
import FavMovieList from "./FavMovieList";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";

import React from "react";

const Layout = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [menuClick, setMenuClick] = useState(false);
  const [menuKind, setMenuKind] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  let profile_num = location.pathname.slice(7);

  //console.log(profile_num);
  // console.log("param 값은: " + profile_num);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const footerLayout = isSmallScreen
    ? {
        display: "none",
      }
    : {};

  useEffect(() => {
    //로그인 상태인지 체크
    const login_id = window.sessionStorage.getItem("id"); // 세션스토리지에 저장되어 있는 id값 읽음
    console.log("window.sessionStorage(login_id) =>", login_id);
    if (login_id === null) {
      alert("로그인후 사용가능합니다!!");
      navigate("/");
    }
    const handleResize = () => {
      const main = document.querySelector("main");
      const footer = document.querySelector("footer");

      main.style.minHeight = `calc(100vh - ${header.offsetHeight}px - ${footer.offsetHeight}px)`;
    };

    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");

    main.style.minHeight = `calc(100vh - ${header.offsetHeight}px - ${footer.offsetHeight}px)`;

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadProfiles(window.sessionStorage.getItem("id"));
    document.body.style.backgroundColor = "rgb(42, 43, 43)";
    if (profile_num === "") {
      // /login으로 접속했을 경우
      if (window.localStorage.getItem("profile_num") === "") {
        //한번도 프로필 변경을 하지 않은 경우
        window.localStorage.setItem("profile_num", 1);
      } else {
        // localStorage에 프로필 값이 저장이 되어 있는 경우
        //아무것도 하지 않는다(값 그대로 유지)
      }
    } else {
      //login/param 으로 접속한 경우
      window.localStorage.setItem("profile_num", profile_num);
    }
  });

  const loadProfiles = (login_id) => {
    console.log("MEMBERID", login_id);
    axios
      .post("http://localhost:8080/profiles", {
        member_id: login_id,
      })
      .then((res) => {
        // console.log("res profiles", res.data.length);
        if (res.data.length === 0) {
          window.localStorage.setItem("profile_num", 1);
        } else {
          if (window.localStorage.getItem("profile_num") === null) {
            window.localStorage.setItem("profile_num", 1);
          }
        }
      })
      .catch((error) => {
        console.error("Error loading profiles:", error);
      });
  };

  const menuName = menuKind;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <header>
        <NavBar
          search={search}
          setSearch={setSearch}
          menuClick={menuClick}
          setMenuClick={setMenuClick}
          menuKind={menuKind}
          setMenuKind={setMenuKind}
        />
      </header>
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 110px)",
        }}
      >
        {menuClick === false ? (
          search === "" ? (
            <div>
              <Outlet />
            </div>
          ) : (
            <SearchResult search={search} />
          )
        ) : search === "" ? (
          menuName === "다운로드 가장 많은 영화" ? (
            <DownLoadmany />
          ) : menuName === "좋아요 가장 많은 영화" ? (
            <GoodMany />
          ) : menuName === "최근 추가 된 영화" ? (
            <NewDateAdd />
          ) : (
            <FavMovieList />
          )
        ) : (
          <SearchResult search={search} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
