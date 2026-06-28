import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { styled } from "@mui/system";
import { useMediaQuery, useTheme } from "@mui/material";
import StickyHeader from "./StickyHeader";

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
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "I clicked a movie but it won't play",
            content:
                "This site uses the TMDB API to display movie posters, titles, and summaries. It is not a streaming service, so movies cannot be played here.",
        },
        {
            id: 2,
            title: "The site feels a bit laggy",
            content:
                "Sorry about that. Since movie data is loaded through an external API, there can be a slight delay while fetching information.",
        },
        {
            id: 3,
            title: "I don't know how to write a post",
            content:
                "Go to the Help Center and click the FAQ button to reach this page, then click the Contact Us button to submit your question.",
        },
        {
            id: 4,
            title: "Is this a real movie streaming site?",
            content:
                "This site uses the TMDB API to display movie posters, titles, and summaries. It does not provide actual streaming.",
        },
        {
            id: 5,
            title: "I'd like to ask a new question",
            content: "In the Help Center, click the Contact Us button to ask a new question by writing a post.",
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
            <StickyHeader kind="Customer Center" />
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
                <Dialog open={selectedPost !== null} onClose={handleClose} maxWidth="sm" fullWidth={true}>
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
