import React from "react";
import { Container, Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { fontWeight } from "@mui/system";
import { useMediaQuery, useTheme } from "@mui/material";

const CustomerSolution = () => {
  const solutionList = [
    ["가입절차", "넷플릭스에 가입하는 방법", "넷플릭스 소개", "멤버십 및 요금"],
    [
      "시청불가",
      "넷플릭스 비밀번호를 변경하는 방법",
      "넷플릭스에 로그인하려는데 가입하라는 메시지가 표시됨",
      "'사용 중인 디바이스와 넷플릭스 앱 버전이 호환되지 않습니다.'라는 넷플릭스 메시지가 표시됨",
    ],
    [
      "내 계정 관리",
      "넷플릭스에 로그인할 수 없는 경우",
      "넷플릭스 계정 재시작 방법",
      "넷플릭스 계정 이메일이 동의 없이 변경됨",
    ],
    [
      "넷플릭스 시청",
      "Netflix를 스트리밍할 때 어떤 디바이스를 사용할 수 있나요?",
      "TV에서 넷플릭스를 시청하는 방법",
      "콘텐츠를 저장하여 오프라인에서 시청하는 방법",
    ],
    [
      "빠른 링크",
      "TV 프로그램 및 영화 요청하기",
      "이메일 업데이트",
      "비밀번호 업데이트",
      "결제 수단 업데이트",
      "멤버십 해지",
      "결제 내역 검토",
    ],
  ];
  const theme = useTheme();
  const isMiddleScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container sx={{ mb: 10 }}>
      <Grid container spacing={1} sx={{ width: "100%" }}>
        {isMiddleScreen
          ? null
          : solutionList.map((innerArray) => {
              return (
                <Grid item style={{ width: "20%" }} key={innerArray}>
                  <List>
                    <ListItem sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                      {innerArray[0]}
                    </ListItem>
                    {innerArray.slice(1).map((i) => {
                      return <ListItem key={i}>{i}</ListItem>;
                    })}
                  </List>
                </Grid>
              );
            })}
      </Grid>
    </Container>
  );
};

export default CustomerSolution;
