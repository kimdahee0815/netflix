import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import StickyHeader from "../components/StickyHeader";
import CustomizedButton from "../components/CustomizedButton";
import MemberUpdateForm from "../components/memberUpdateForm";
import config from "../config";

export default function StickyHeadTable() {
    const [openMemberUpdateForm, setOpenMemberUpdateForm] = useState(false);

    const updateFormOpen = () => {
        setOpenMemberUpdateForm(true);
    };
    const updateFormClose = () => {
        setOpenMemberUpdateForm(false);
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const columns = [
        { id: "member_num", label: "No.", minWidth: 10 },
        { id: "member_id", label: "ID", minWidth: 10 },
        { id: "member_pw", label: "Password", minWidth: 10 },
        { id: "member_name", label: "Name", minWidth: 20 },
        { id: "member_tel", label: "Phone", minWidth: 20 },
        { id: "member_addr", label: "Address", minWidth: 30 },
        { id: "pw_question", label: "Security Question", minWidth: 10 },
        { id: "pw_answer", label: "Security Answer", minWidth: 10 },
        { id: "signup_date", label: "Sign-up Date", minWidth: 10 },
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

    const [memberList, setMemberList] = useState([]);

    const [info, setInfo] = useState({
        member_id: "",
        member_num: 0,
        member_name: "",
        member_addr: "",
        member_pw: "",
        member_tel: "",
        pw_answer: "",
        pw_question: "",
        signup_date: "",
    });

    const getList = () => {
        axios
            .get(`${config.API_URL}/getMembers`, {})
            .then((res) => {
                const { data } = res;
                setMemberList(data);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleTableCellClick = (event, post) => {
        event.stopPropagation();
        if (event.target.innerText === "Edit") {
            axios
                .get(`${config.API_URL}/selectMember?member_id=${post.member_id}`)
                .then((res) => {
                    if (res.data !== null) {
                        updateFormOpen();
                        setInfo({
                            member_id: post.member_id,
                            member_num: post.member_num,
                            member_name: post.member_name,
                            member_addr: post.member_addr,
                            member_pw: post.member_pw,
                            member_tel: post.member_tel,
                            pw_answer: post.pw_answer,
                            pw_question: post.pw_question,
                            signup_date: post.signup_date,
                        });
                    } else {
                        alert("Failed to update member info!");
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        } else if (event.target.innerText === "Delete") {
            axios
                .post(`${config.API_URL}/deleteMember`, {
                    member_id: post.member_id,
                })
                .then((res) => {
                    if (res.data === 1) {
                        alert("Member deleted successfully!");
                        axios
                            .post(`${config.API_URL}/favmovie/remove`, {
                                member_id: post.member_id,
                            })
                            .then((res) => {})
                            .catch((e) => {
                                console.error(e);
                            });
                        axios
                            .post(`${config.API_URL}/customer/deletebyid`, {
                                member_id: post.member_id,
                            })
                            .then((res) => {})
                            .catch((e) => {
                                console.error(e);
                            });
                        axios
                            .post(`${config.API_URL}/deleteProfileMember`, {
                                member_id: post.member_id,
                            })
                            .then((res) => {
                                window.localStorage.removeItem("profile_num");
                                if (window.localStorage.getItem("id") === post.member_id) {
                                    window.localStorage.clear();
                                }
                                if (post.member_id === window.sessionStorage.getItem("id")) {
                                    window.sessionStorage.clear();
                                    navigate("/", { return: true });
                                }
                            })
                            .catch((e) => {
                                console.error(e);
                            });
                    } else {
                        alert("Failed to delete member!");
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };

    useEffect(() => {
        getList();
    });
    return (
        <div>
            <StickyHeader kind="Admin" />
            <Container sx={{ paddingTop: { paddingTop } }}>
                <h2 style={{ display: "flex", alignItems: "center", color: "black" }}>
                    <span style={{ marginRight: "auto" }}>Netflix Member List</span>
                </h2>

                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ width: "100%", maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.board_num}
                                            aalign={column.align || "center"}
                                            style={{ minWidth: column.minWidth, textAlign: "center" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell style={{ width: 50, textAlign: "center" }}>Edit / Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {memberList
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
                                                        <TableCell key={column.id} align="center">
                                                            {column.id === "member_num"
                                                                ? memberList.length - (page * rowsPerPage + index)
                                                                : column.format
                                                                  ? column.format(post[column.id], post)
                                                                  : post[column.id]}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell style={{ width: 20 }}>
                                                    <Box sx={{ display: "flex" }}>
                                                        <Box sx={{ mr: 1 }}>
                                                            <CustomizedButton
                                                                onClick={(event) => handleTableCellClick(event, post)}
                                                                label="Edit"
                                                            ></CustomizedButton>
                                                        </Box>
                                                        {openMemberUpdateForm ? (
                                                            <MemberUpdateForm
                                                                openMemberUpdateForm={openMemberUpdateForm}
                                                                setOpenMemberUpdateForm={setOpenMemberUpdateForm}
                                                                updateFormOpen={updateFormOpen}
                                                                updateFormClose={updateFormClose}
                                                                info={info}
                                                            ></MemberUpdateForm>
                                                        ) : null}
                                                        <CustomizedButton
                                                            onClick={(event) => handleTableCellClick(event, post)}
                                                            label="Delete"
                                                        ></CustomizedButton>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={memberList.length}
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
