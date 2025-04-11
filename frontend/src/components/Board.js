import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import StickyHeader from "./StickyHeader";
import Container from "@mui/material/Container";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { styled } from "@mui/system";
import { useMediaQuery, useTheme } from "@mui/material";

const Title = styled(DialogTitle)({
  backgroundColor: "#000",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Content = styled(DialogContent)({
  backgroundColor: "#000",
  color: "#fff",
});

const Board = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMiddleScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "영화를 클릭했는데 영화가 안나와요",
      content:
        "이 사이트는 yts api를 이용하여, 영화의 이미지, 제목, 요약본을 보여주는 사이트입니다.",
    },
    {
      id: 2,
      title: "약간 렉이 걸리는거 같아요",
      content:
        "죄송합니다. api와의 연동에서 영화와 관련된 사이트들은 약간 시간이 지체될 수 있습니다.",
    },
    {
      id: 3,
      title: "게시글을 어떻게 입력하는지 모르겠어요",
      content:
        "고객센터에서, 자주 하는 질문 버튼을 누르시면 이 사이트로 연동이 되니, 문의하기 버튼을 눌러주시기 바랍니다.",
    },
    {
      id: 4,
      title: "이게 진짜 영화를 보는 사이트인가요?",
      content:
        "이 사이트는 yts api를 이용하여, 영화의 이미지, 제목, 요약본을 보여주는 사이트입니다.",
    },
    {
      id: 5,
      title: "새로운 질문을 하고싶어요",
      content:
        "고객센터에서, 문의하기 버튼을 누르시면 새로운 질문을 글 작성을 통해서 하실 수 있습니다.",
    },
  ]);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleClick = (post) => {
    setSelectedPost(post);
  };

  const handleClose = () => {
    setSelectedPost(null);
  };

  let paddingTop = "250px";
  if (isSmallScreen) {
    paddingTop = "180px";
  }

  return (
    <div>
      <StickyHeader kind="고객센터" />
      <Container sx={{ paddingTop: { paddingTop } }}>
        {posts.map((post) => (
          <Card
            key={post.id}
            sx={{
              mb: 3,
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "#dddddd",
              },
            }}
            onClick={() => handleClick(post)}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {post.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Dialog
          open={selectedPost !== null}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth={true}
        >
          <Title>
            <Typography variant="h6" component="h2">
              {selectedPost?.title}
            </Typography>
          </Title>
          <Content>
            <Typography variant="body2" component="p">
              {selectedPost?.content}
            </Typography>
          </Content>
        </Dialog>
      </Container>
    </div>
  );
};

export default Board;
