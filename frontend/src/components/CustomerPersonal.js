import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useMediaQuery, useTheme } from "@mui/material";
import { Grid } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import Box from "@mui/material/Box";
import PersonalHelpCard from "./PersonalHelpCard";
import config from "../config";

const CustomerPersonal = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const user = window.sessionStorage.getItem("id");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        axios
            .post(`${config.API_URL}/selectMember`, {
                member_id: user,
            })
            .then((res) => {
                if (res.data !== null) {
                    setUserName(res.data.member_name);
                } else {
                    alert("Failed to confirm info!");
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }, [user]);

    let paddingTop = "250px";
    if (isSmallScreen) {
        paddingTop = "180px";
    }
    return (
        <Container sx={{ paddingTop: { paddingTop } }}>
            <Typography variant={"h1"} sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }} fontWeight="bold">
                Hello, {userName}.
            </Typography>
            <PersonalHelpCard />
            <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
                Helpful Documents
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item>
                    <Card
                        sx={{
                            display: "flex",
                            width: "auto",
                            height: 40,
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor: "#dddddd",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mr: 1,
                            }}
                        >
                            <DescriptionIcon sx={{ m: 1 }} />
                            <Typography style={{ whiteSpace: "nowrap", display: "flex" }} fontWeight="bold">
                                How to Sign Up for Netflix
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item>
                    <Card
                        sx={{
                            display: "flex",
                            width: "auto",
                            height: 40,
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor: "#dddddd",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mr: 1,
                            }}
                        >
                            <DescriptionIcon sx={{ m: 1 }} />
                            <Typography style={{ whiteSpace: "nowrap", display: "flex" }} fontWeight="bold">
                                Membership & Pricing
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item>
                    <Card
                        sx={{
                            display: "flex",
                            width: "auto",
                            height: 40,
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor: "#dddddd",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mr: 1,
                            }}
                        >
                            <DescriptionIcon sx={{ m: 1 }} />
                            <Typography style={{ display: "flex" }} fontWeight="bold">
                                Unable to Log In to Netflix
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CustomerPersonal;
