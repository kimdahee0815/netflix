import React from "react";
import { Button } from "@mui/material";

const ProfilesManageBtn = ({ onClick, label }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        fontSize: "1.5em",
        color: "#FFFFFF",
        fontWeight: "400",
        border: "1px solid #FFFFFF",
        "&:hover": {
          opacity: [0.9, 0.8, 0.7],
          cursor: "pointer",
          color: "#FFFFFF",
          fontWeight: "bold",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default ProfilesManageBtn;