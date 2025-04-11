import MyPageNavbar from "../components/MyPageNavbar";
import MyPageBody from "../components/MyPageBody";
import { useEffect } from "react";

const MyPage = () => {
  return (
    <div>
      <MyPageNavbar />
      <MyPageBody />
    </div>
  );
};

export default MyPage;
