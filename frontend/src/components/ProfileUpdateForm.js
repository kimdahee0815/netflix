import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const ProfileUpdateForm = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#141414",
        padding: "50px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <hr
          style={{
            borderColor: "rgba(255, 255, 255, 0.5)",
            borderWidth: "1px",
            marginBottom: "20px",
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px", color: "#fff" }}>
            언어 선택:
          </label>
          <select
            sx={{
              borderRadius: "10px",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              backgroundColor: "#000",
              padding: "5px",
            }}
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ch">중국어</option>
          </select>
        </div>
      </div>
      <hr
        style={{
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: "1px",
          marginTop: "10px",
        }}
      />
      <p style={{ color: "#fff", marginTop: "20px" }}>관리 수준 설정:</p>
      <p style={{ color: "#fff", marginBottom: "10px" }}>
        <span style={{ color: "gray" }}>모든 관람등급</span>
      </p>
      <p style={{ color: "#fff", marginBottom: "20px" }}>
        이 프로필에서는 모든 성숙도 수준의 콘텐츠가 표시됩니다.
      </p>
      <Button
        variant="outlined"
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
        수정
      </Button>
      <hr
        style={{
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: "1px",
          marginTop: "20px",
        }}
      />
      <h3 style={{ color: "#fff", marginTop: "20px" }}>자동 재생 설정</h3>
      <FormControlLabel
        control={
          <Checkbox
            style={{
              color: "#c4c4c4",
            }}
          />
        }
        label="모든 디바이스에서 시리즈의 다음 화 자동 재생"
        labelPlacement="end"
        sx={{
          color: "#fff",
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            style={{
              color: "#c4c4c4",
            }}
          />
        }
        label="모든 디바이스에서 탐색 중 미리보기 자동 재생"
        labelPlacement="end"
        sx={{
          color: "#fff",
        }}
      />
      <hr
        style={{
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: "1px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />
    </Box>
  );
};

export default ProfileUpdateForm;
