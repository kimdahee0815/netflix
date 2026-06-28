import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import config from "../config";
import StickyHeader from "../components/StickyHeader";
import CustomizedButton from "../components/CustomizedButton";

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
    };

    const contentChange = (event) => {
        setArticle({ ...article, board_content: event.target.value });
    };

    const getDetail = useCallback(() => {
        axios.get(`${config.API_URL}/customer/detail?board_num=${board_num}`).then((res) => {
            const { data } = res;
            setArticle({
                member_id: data.member_id,
                board_title: data.board_title,
                board_content: data.board_content,
            });
        });
    }, [board_num]);

    const handleModify = () => {
        axios
            .post(`${config.API_URL}/customer/modify`, {
                board_title: article.board_title,
                board_content: article.board_content,
                board_num: board_num,
            })
            .then((res) => {
                navigate("/board");
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        getDetail();
    }, [getDetail]);

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
                            Author
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
                            Title
                        </Typography>
                        <Input
                            sx={{ width: "100%" }}
                            placeholder="Title"
                            onChange={titleChange}
                            value={article.board_title}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            pb: 1,
                        }}
                    >
                        <Typography sx={{ width: "140px", mt: 3, fontWeight: "bold" }} variant="h6" component="h4">
                            Content
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
                            <CustomizedButton label="Cancel" value="cancel" onClick={goBack}></CustomizedButton>
                        </Box>
                        <Box sx={{ width: 100 }}>
                            <CustomizedButton label="Confirm" value="insert" onClick={handleModify}></CustomizedButton>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}
