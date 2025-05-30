import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import CustomizedButton from "./CustomizedButton";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  height: "3rem",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "100%",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  height: "100%",
}));

export default function PrimarySearchAppBar({ kind }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onchange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  const onClick = () => {
    if (kind === "고객관리") {
      if(search === "" || search === null || search === undefined) {
        navigate(`/memberBoard`);
      }else{
        navigate(`/memberSearch/${search}`);
      }
    } else {
      if(search === "" || search === null || search === undefined) {
        navigate(`/board`);
      }else{
        navigate(`/boardSearch/${search}`);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100vw" }}>
      <Typography
        variant="h4"
        noWrap
        component="div"
        sx={{
          display: { xs: "none", sm: "block" },
          textAlign: "center",
          fontFamily: "helvetica",
          fontWeight: 1000,
          mb: 1,
        }}
      >
        {kind}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center",justifyContent:"center", marginBottom: "10px", width: "100%" }}>
       <Search sx={{ 
        flexGrow: 1,
        maxWidth: "800px" 
      }}>
        <StyledInputBase
          onKeyPress={handleEnter}
          placeholder="검색어를 입력하세요"
          inputProps={{ "aria-label": "search" }}
          onChange={onchange}
          sx={{ width: "100%" }}
        />
      </Search>
        <CustomizedButton label="검색" value="search" onClick={onClick} />
      </Box>
    </Box>
  );
}
