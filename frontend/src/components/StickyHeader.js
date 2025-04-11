import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import CustomerDropdown from "../components/CustomerDropdown";
import CustomerSearch from "../components/CustomerSearch";

const StickyHeader = ({ kind }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));



  return (
    <AppBar
      position="fixed"
      sx={{ width: "100%" }}
      style={{ background: "#212121" }}
    >
      <Toolbar sx={{ width: "100%" }}>
        <Grid container sx={{ pt: 2, width: "100%" }}>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box sx={{ display: "block", width: "80%", ml: 3 }}>
              <Typography
                noWrap
                component="a"
                href="/login"
                sx={{
                  fontFamily: "helvetica",
                  fontWeight: 1000,
                  letterSpacing: ".1rem",
                  color: "red",
                  textDecoration: "none",
                  fontSize: "2.5em",
                }}
              >
                {isSmallScreen ? "N" : "NETFLIX"}
              </Typography>
            </Box>
            <Box sx={{ display: "block", mr: 4, flexGrow: 1 }}>
              <CustomerDropdown />
            </Box>
          </Box>

          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <CustomerSearch kind={kind} />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default StickyHeader;
