import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
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
              넷플릭스 비밀번호를 변경하는 방법
            </Typography>
            <Typography
              sx={{ fontSize: 14, m: 0.3 }}
              color="text.secondary"
              gutterBottom
            >
              넷플릭스 이메일 주소 또는 비밀번호가 기억나지 않는 경우 이
              문서에서 계정에 다시 액세스 하는 방법을 알아보세요.
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
