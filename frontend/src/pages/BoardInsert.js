import * as React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import BoardInsertInput from "../components/BoardInsertInput";
import BoardInsertMultiline from "../components/BoardInsertMultiline";
import StickyHeader from "../components/StickyHeader";
import TextField from "@mui/material/TextField";
import CustomizedButton from "../components/CustomizedButton";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function BoardInsert() {
  const [board_title, setTitle] = useState("");
  const [member_id, setWriter] = useState("");
  const [board_content, setContent] = useState("");
  const [board_pw, setpassword] = useState("");
  const [user, setUser] = React.useState(window.sessionStorage.getItem("id"));
  const [userName, setUserName] = React.useState("");

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

  const handleSubmit = () => {};
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/board");
  };
  const titleChange = (event) => {
    setTitle(event.target.value);
    console.log(board_title);
  };

  const contentChange = (event) => {
    setContent(event.target.value);
    console.log(board_content);
  };

  const handleInsert = () => {
    axios
      .post("http://localhost:8080/customer/insert", {
        member_id: window.sessionStorage.getItem("id"),
        board_title: board_title,
        board_content: board_content,
      })
      .then((res) => {
        console.log("handleInsert=>", res);
        navigate("/board");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <StickyHeader />
      <Paper sx={{ padding: "16px", height: "100vh" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            paddingTop: "250px",
            width: 800,
            mx: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              display: "flex",
              pb: 1,
            }}
          >
            <Typography
              sx={{ width: "150px", mt: 1, fontWeight: "bold" }}
              variant="h6"
              component="h4"
            >
              작성자
            </Typography>
            <Typography
              sx={{ width: "120px", mt: 1, fontWeight: "bold" }}
              variant="h6"
              component="h4"
            >
              {user}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              pb: 1,
            }}
          >
            <Typography
              sx={{ width: "150px", mr: 3, mt: 2, fontWeight: "bold" }}
              variant="h6"
              component="h4"
            >
              제목
            </Typography>
            <Input
              sx={{ width: "100%", mt: 2 }}
              placeholder="제목"
              onChange={titleChange}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              pb: 1,
            }}
          >
            <Typography
              sx={{ width: "140px", mt: 3, fontWeight: "bold" }}
              variant="h6"
              component="h4"
            >
              내용
            </Typography>
            <TextField
              sx={{ width: 630, mt: 3 }}
              id="outlined-multiline-static"
              multiline
              rows={10}
              placeholder="내용을 입력하세요"
              onChange={contentChange}
            />
          </Box>
          <Box sx={{ display: "flex", ml: "auto" }}>
            <Box sx={{ width: 100, ml: 79, mr: 3 }}>
              <CustomizedButton
                label="취소"
                value="cancel"
                onClick={goBack}
              ></CustomizedButton>
            </Box>
            <Box sx={{ width: 100 }}>
              <CustomizedButton
                label="확인"
                value="insert"
                onClick={handleInsert}
              ></CustomizedButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
