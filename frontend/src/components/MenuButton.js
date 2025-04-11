import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function TemporaryDrawer({
  search,
  setSearch,
  menuClick,
  setMenuClick,
  menuKind,
  setMenuKind,
}) {
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleDrawer = (event) => {
    setShowMenu(!showMenu);
  };

  const showSearchResult = (e) => {
    setMenuClick(true);
    setMenuKind(e.target.innerText);
    setSearch("");
    // console.log(e.target.innerText);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={toggleDrawer}
        sx={{
          "&:hover": {
            cursor: "pointer",
            boxSizing: "border-box",
            fontWeight: "bold",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <MenuIcon
          sx={{
            "&:hover": {
              cursor: "pointer",
              boxSizing: "border-box",
              fontWeight: "bold",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          fontSize="large"
        />
      </IconButton>
      <Drawer open={showMenu} onClose={toggleDrawer}>
        <Box
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={showSearchResult}>
                {/* search뒤에다가 쿼리스트링 붙여주기 ex.?query=series 그 쿼리스트링을 searchResult페이지에서 searchParams로 읽은다음 관련 결과 띄워주기 */}
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          boxSizing: "border-box",
                          fontWeight: "bold",
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    >
                      다운로드 가장 많은 영화
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={showSearchResult}>
                {/* search뒤에다가 쿼리스트링 붙여주기 ex.?query=series 그 쿼리스트링을 searchResult페이지에서 searchParams로 읽은다음 관련 결과 띄워주기 */}
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          boxSizing: "border-box",
                          fontWeight: "bold",
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    >
                      좋아요 가장 많은 영화
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={showSearchResult}>
                {/* search뒤에다가 쿼리스트링 붙여주기 ex.?query=series 그 쿼리스트링을 searchResult페이지에서 searchParams로 읽은다음 관련 결과 띄워주기 */}
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          boxSizing: "border-box",
                          fontWeight: "bold",
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    >
                      최근 추가 된 영화
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={showSearchResult}>
                {/* search뒤에다가 쿼리스트링 붙여주기 ex.?query=series 그 쿼리스트링을 searchResult페이지에서 searchParams로 읽은다음 관련 결과 띄워주기 */}
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          boxSizing: "border-box",
                          fontWeight: "bold",
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    >
                      찜목록
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
