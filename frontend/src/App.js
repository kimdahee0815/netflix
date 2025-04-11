import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/LayOut";
import Profiles from "./pages/Profiles";
import Customercenter from "./pages/CustomerCenter";
import ProfileUpdate from "./pages/ProfileUpdate";
import BoardInsert from "./pages/BoardInsert";
import { useEffect } from "react";
import Board from "./components/Board";
import BoardList from "./components/BoardList";
import BoardModify from "./pages/BoardModify";
import BoardDetail from "./components/BoardDetail";
import MemberBoard from "./pages/memberBoard";
import BoardSearch from "./pages/BoardSearch";
import { useState } from "react";
import axios from "axios";
import MemberSearch from "./pages/MemberSearch";

const App = () => {
  const location = useLocation();

  if (
    location.pathname === "/login" ||
    location.pathname === "/profiles" ||
    location.pathname === "/" ||
    location.pathname === "/search/" ||
    location.pathname === "/profileupdate"
  ) {
    document.body.style.backgroundColor = "rgb(42, 43, 43)";
  } else {
    document.body.style.backgroundColor = "white";
  }

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login/:profile" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/search/" element={<SearchResult />} />
      {/* SearchResult결과는 section3 컴포넌트 이용 */}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route
        path="/profile/edit/:member_id/:profileId"
        element={<ProfileUpdate />}
      />
      <Route path="/customercenter" element={<Customercenter />} />
      <Route path="/customercenter/board" element={<Board />} />
      <Route path="/board" element={<BoardList />} />
      <Route path="/board/:board_num" element={<BoardDetail />} />
      <Route path="/boardInsert" element={<BoardInsert />} />
      <Route path="/boardModify/:board_num" element={<BoardModify />} />
      <Route path="/boardSearch/:searchAny" element={<BoardSearch />} />
      <Route path="/memberBoard" element={<MemberBoard />} />
      <Route path="/memberSearch/:searchAny" element={<MemberSearch />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
