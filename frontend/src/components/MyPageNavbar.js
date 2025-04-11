import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import MyPageDropdown from "../components/MyPageDropdown";

const StickyHeader = () => {
  const theme = useTheme();
  const isxlargescreen = useMediaQuery(theme.breakpoints.down("xl"));
  const isLargescreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMiddleScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isxSmallscreen = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <AppBar
      position="fixed"
      style={{
        background: "#212121",
        width: "100%",
      }}
    >
      <Toolbar
        style={{
          height: 70,
          background: "#212121",
          width: "100%",
        }}
      >
        <Box container sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ width: "20%", ml: 5 }}>
            <Typography
              noWrap
              component="a"
              href="/login"
              sx={{
                mr: 2,
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
          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "end",
              mr: 8,
            }}
          >
            <MyPageDropdown />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StickyHeader;
