import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import StickyHeader from "../components/StickyHeader";
import Container from "@mui/material/Container";
import CustomizedButton from "../components/CustomizedButton";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BoardSearch() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMiddleScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { searchAny } = useParams();

    const columns = [
        { id: "board_num", label: "번호", minWidth: 10 },
        { id: "member_id", label: "작성자", minWidth: 10 },
        {
            id: "board_title", label: "제목", minWidth: 350,
            format: (value, row) =>
                row.board_reply ? `${value} (답변완료)` : value,
        },
        { id: "board_date", label: "날짜", minWidth: 40 },
    ];

    let paddingTop = "200px";
    if (isSmallScreen) {
        paddingTop = "140px";
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/boardInsert");
    };

    //배열 시작
    const [boardlist, setBoardList] = useState([]);



    const getList = () => {
        axios
            .get(`http://localhost:8080/customer/search?search=${searchAny}`, {})
            .then((res) => {
                const { data } = res;
                setBoardList(data);
                console.log(data);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleTableCellClick = (event, post) => {
        navigate(`/board/${post.board_num}`);
    };

    useEffect(() => {
        getList();
    }, [searchAny]);
    return (
        <div>
            <StickyHeader kind="고객센터" />
            <Container sx={{ paddingTop: { paddingTop } }}>
                <h2 style={{ display: "flex", alignItems: "center", color: "black" }}>
                    <span style={{ marginRight: "auto" }}>문의하기</span>
                    <CustomizedButton
                        onClick={handleClick}
                        label="글 작성"
                    ></CustomizedButton>
                </h2>

                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.board_num}
                                            align={column.board_title}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {boardlist
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((post, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                                sx={{
                                                    "&:hover": {
                                                        cursor: "pointer",
                                                        backgroundColor: "#dddddd",
                                                    },
                                                }}
                                                onClick={(event) => handleTableCellClick(event, post)}
                                            >
                                                {columns.map((column) => {
                                                    return (
                                                        <TableCell
                                                            key={column.board_num}
                                                            align={column.board_title}
                                                        >
                                                            {column.format
                                                                ? column.format(post[column.id], post) :
                                                                post[column.id]}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={boardlist.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </div>
    );
}
