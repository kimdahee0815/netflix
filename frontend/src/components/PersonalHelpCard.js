import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useMediaQuery, useTheme } from "@mui/material";

export default function BasicCard() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    if (isSmallScreen) {
    }
    return (
        <Card
            sx={{
                minWidth: 275,
                boxShadow: 2,
                m: 2,
                "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#dddddd",
                },
            }}
        >
            <CardContent>
                <Grid container>
                    <Box
                        xs={1}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mr: 2,
                            color: "orange",
                        }}
                    >
                        <WarningAmberIcon />
                    </Box>
                    <Grid item xs={10}>
                        <Typography sx={{ fontSize: 16, m: 0.3 }} fontWeight="bold">
                            How to Change Your Netflix Password
                        </Typography>
                        <Typography sx={{ fontSize: 14, m: 0.3 }} color="text.secondary" gutterBottom>
                            If you don't remember your Netflix email address or password, learn how to regain access to
                            your account in this article.
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
