import * as React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import StickyHeader from "../components/StickyHeader";
import CustomizedButton from "../components/CustomizedButton";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import axios from "axios";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";

export default function BoardModify() {
  const [article, setArticle] = useState({
    member_id: "",
    board_title: "",
    board_content: "",
  });

  const navigate = useNavigate();
  const { board_num } = useParams();
  const goBack = () => {
    navigate("/board");
  };
  const titleChange = (event) => {
    setArticle({ ...article, board_title: event.target.value });
    console.log(article.board_title);
  };

  const contentChange = (event) => {
    setArticle({ ...article, board_content: event.target.value });
    console.log(article.board_content);
  };



  const getDetail = () => {
    axios
      .get(`http://localhost:8080/customer/detail?board_num=${board_num}`)
      .then((res) => {
        const { data } = res;
        setArticle({
          member_id: data.member_id,
          board_title: data.board_title,
          board_content: data.board_content,
        });
      });
  }

  const handleModify = () => {
    axios
      .post("http://localhost:8080/customer/modify", {
        board_title: article.board_title,
        board_content: article.board_content,
        board_num: board_num,
      })
      .then((res) => {
        console.log("handleInsert=>", res);
        navigate("/board");
      })
      .catch((e) => {
        console.error(e);
      });

  };


  useEffect(() => {
    getDetail();
  }, []);


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
              sx={{ width: "120px", mr: 3, mt: 1, fontWeight: "bold" }}
              variant="h6"
              component="h4"
            >
              작성자
            </Typography>
            <Typography
              sx={{ width: "150px", mr: 3, mt: 1, fontWeight: "bold" }}
              variant="h6"
              component="h4"
            >
              {article.member_id}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              pb: 1,
            }}
          >
            <Typography
              sx={{ width: "150px", mr: 3, mt: 1, fontWeight: "bold" }}
              variant="h6"
              component="h4"
            >
              제목
            </Typography>
            <Input
              sx={{ width: "100%" }}
              placeholder="제목"
              onChange={titleChange}
              value={article.board_title} />
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
              value={article.board_content}
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
                onClick={handleModify}
              ></CustomizedButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
