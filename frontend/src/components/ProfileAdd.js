import React, { useState } from "react";
import plusbtn from "../assets/plusbtn.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";

const ProfileAdd = ({ onAddProfile }) => {
  const [open, setOpen] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onAddProfile(newNickname);
    setNewNickname("");
    handleClose();
  };

  return (
    <div>
      <Box
        component="img"
        sx={{
          width: 180,
          height: 180,
          maxHeight: { xs: 180, md: 180 },
          maxWidth: { xs: 180, md: 180 },
          boxSizing: "border-box",
          "&:hover": {
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.7],
            cursor: "pointer",
            border: "5px solid white",
          },
        }}
        alt="Add Profile"
        onClick={handleClickOpen}
        src={plusbtn}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: "#141414",
            color: "#fff",
          }}
        >
          프로필 추가
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#141414",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#141414",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                autoFocus
                margin="dense"
                label="Nickname"
                type="text"
                fullWidth
                value={newNickname}
                autoComplete="off"
                onChange={(e) => setNewNickname(e.target.value)}
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
                InputLabelProps={{
                  style: {
                    color: "#fff",
                  },
                }}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                }}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#141414",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              color: "#c4c4c4",
              border: "1px solid #c4c4c4",
              backgroundColor: "#000",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#c4c4c4",
                color: "#000",
              },
            }}
          >
            닫기
          </Button>
          <Button
            onClick={handleSave}
            sx={{
              color: "#c4c4c4",
              border: "1px solid #c4c4c4",
              backgroundColor: "#000",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#c4c4c4",
                color: "#000",
              },
            }}
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileAdd;
