import { Container, Paper, Typography, Box } from "@mui/material";
import StickyHeader from "./StickyHeader";
import CustomizedButton from "./CustomizedButton";
import BoardPasswordCheck from "./BoardPasswordCheck";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useMediaQuery, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";

function BoardDetail() {
  const [openModal, setOpenModal] = useState(false);
  const [modify, setModify] = useState(false);
  const [remove, setRemove] = useState(false);
  const [reply, setReply] = useState(false);
  const [board_reply, setBoard_reply] = useState("");
  const { board_num } = useParams();

  const [article, setArticle] = useState({
    member_id: "",
    board_title: "",
    board_content: "",
    board_reply: "",
  });
  const navigate = useNavigate();

  const getDetail = () => {
    axios
      .get(`http://localhost:8080/customer/detail?board_num=${board_num}`)
      .then((res) => {
        const { data } = res;
        setArticle({
          member_id: data.member_id,
          board_title: data.board_title,
          board_content: data.board_content,
          board_reply: data.board_reply,
        });
        console.log(article.board_reply);
      });
  };

  useEffect(() => {
    getDetail();
  }, [board_num]);




  const clickModify = () => {
    if (window.sessionStorage.getItem("id") === "admin@email.com") {
      navigate(`/boardModify/${board_num}`);
    } else {
      handleOpen();
      setModify(true);
    }
  };

  const clickDelete = () => {
    if (window.sessionStorage.getItem("id") === "admin@email.com") {
      axios
        .get(`http://localhost:8080/customer/delete?board_num=${board_num}`)
        .then((res) => {
          alert("정보 삭제 성공!");
          navigate("/board");
        })
        .catch((e) => {
          alert("정보 삭제 실패!");
        });
    } else {
      handleOpen();
      setRemove(true);
    }
  };

  const answerSubmit = () => {
    if (board_reply == "") {
      alert("내용없이 답변이 불가능합니다");
    } else {
      axios
        .post("http://localhost:8080/customer/reply", {
          board_reply: board_reply,
          board_num: board_num,
        })
        .then((res) => {
          alert(`${article.member_id}님의 게시글에 답변완료하였습니다.`);
          navigate(`/board`);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  const handleReply = () => {
    setReply(!reply);
  }

  const scrollRef = useRef();

  useEffect(() => {
    if (reply) {
      scrollRef.current.scrollIntoView({ bottom: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [reply]);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const goBack = () => {
    navigate("/board");
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMiddleScreen = useMediaQuery(theme.breakpoints.down("md"));

  const reflyChange = (event) => {
    setBoard_reply(event.target.value);
    console.log(board_reply);
  };

  let paddingTop = "200px";
  if (isSmallScreen) {
    paddingTop = "140px";
  }

  return (
    <div>
      <StickyHeader kind="고객센터" />
      <Container sx={{ paddingTop: { paddingTop } }}>
        <Paper sx={{ padding: "16px" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: "16px" }}>
            {article.board_title}
          </Typography>
          <div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "50vh",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: "8px",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                작성자 : <Box sx={{ ml: "8px" }}>{article.member_id}</Box>
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  mb: "8px",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                내용&nbsp;&nbsp; &nbsp;:
                <Box sx={{ ml: "8px", flex: 1, width: "90%", height: "100%" }}>
                  {article.board_content}
                </Box>
              </Typography>
            </Box>
            &nbsp; &nbsp;
            {article.board_reply === null || '' ?
              (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <CustomizedButton
                    label="뒤로가기"
                    value="goBack"
                    onClick={goBack}
                  ></CustomizedButton>
                  &nbsp; &nbsp;
                  <CustomizedButton
                    label="수정"
                    value="update"
                    onClick={clickModify}
                  ></CustomizedButton>
                  &nbsp; &nbsp;
                  <CustomizedButton
                    label="삭제"
                    value="delete"
                    onClick={clickDelete}
                  ></CustomizedButton>
                  &nbsp;&nbsp;&nbsp;
                  {window.sessionStorage.getItem("id") === "admin@email.com" ?
                    <CustomizedButton
                      label="답변"
                      value="handleReply"
                      onClick={handleReply}
                    ></CustomizedButton> : null}
                </Box>
              )
              : null}
            {article.board_reply === null || '' ? null :
              <div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "50vh",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: "16px" }}>
                    {article.member_id}님의 문의사항에 대한 답변
                  </Typography>
                  <Typography sx={{ height: "40vh" }}>
                    {article.board_reply}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <CustomizedButton
                      label="뒤로가기"
                      value="goBack"
                      onClick={goBack}
                    ></CustomizedButton>
                    &nbsp; &nbsp;
                    <CustomizedButton
                      label="수정"
                      value="update"
                      onClick={clickModify}
                    ></CustomizedButton>
                    &nbsp; &nbsp;
                    <CustomizedButton
                      label="삭제"
                      value="delete"
                      onClick={clickDelete}
                    ></CustomizedButton>
                    &nbsp;&nbsp;&nbsp;

                    {window.sessionStorage.getItem("id") === "admin@email.com" ?

                      <CustomizedButton
                        label="답변변경"
                        value="handleReply"
                        onClick={handleReply}
                      ></CustomizedButton>
                      : null}
                  </Box>
                </Box>
              </div>
            }
            {openModal ? (
              <BoardPasswordCheck
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleOpen={handleOpen}
                handleClose={handleClose}
                boardnum={board_num}
                modify={modify}
                remove={remove}
                owner={article.member_id}
              ></BoardPasswordCheck>
            ) : null}

          </div>
          {
            reply ?
              <div ref={scrollRef}>
                <hr />
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: "15px", mt: "30px" }}>
                  {article.member_id}님의 문의사항에 대한 답변
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "30h",
                  }}
                >
                  <TextField
                    sx={{
                      width: "100%",
                      mt: 1,
                      textAlign: "center"
                    }}
                    id="outlined-multiline-static"
                    multiline
                    rows={10}
                    onChange={reflyChange}
                  />
                  <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexGrow: 1,
                    mt: 2

                  }}>
                    <CustomizedButton
                      label="답변"
                      value="answerSubmit"
                      onClick={answerSubmit}
                    ></CustomizedButton>
                  </Box>
                </Box>
              </div >
              : null
          }

        </Paper >

      </Container >
    </div >
  );
}

export default BoardDetail;
