import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import YouTube from "react-youtube";

function Banner_data({
  id,
  medium_cover_image,
  title,
  summary,
  yt_trailer_code,
  value,
}) {
  const theme = useTheme();
  console.dir(theme.breakpoints);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const containerStyle = isSmallScreen
    ? {
        height: "470px",
        display: "flex",
        marginLeft: "8.5%",
        flexDirection: "column",
      }
    : isMediumScreen
    ? {
        height: "350px",
        display: "flex",
        marginLeft: "8.5%",
        justifyContent: "space-between",
      }
    : {
        height: "350px",
        display: "flex",
        marginLeft: "8.5%",
      };
  const imgStyle = isMediumScreen
    ? {
        display: "none",
      }
    : {
        backgroundImage: `url(${medium_cover_image})`,
        width: "230px",
        height: "345px",
        marginLeft: "10px",
      };
  const playerStyle = isSmallScreen
    ? { marginTop: "10px", width: "30%", height: "70%" }
    : {
        marginLeft: "50px",
      };

  const btnStyle = isMediumScreen
    ? {
        width: "25%",
        position: "center",
        backgroundPosition: "left",
      }
    : {
        diplay: "none",
      };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 780,
    height: 400,
    bgcolor: "rgba(0,0,0,0.8)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    display: "flex",
    zIndex: 9999,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [ischecked, setIsChecked] = useState(false);
  const [isclicked, setIsClicked] = useState(false);
  if (value === "favmovielist") {
    axios
      .post("http://localhost:8080/favmovie/chk", {
        movie_title: title,
        member_id: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        setIsChecked(res.data?.length ? true : false);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  useLayoutEffect(() => {
    axios
      .post("http://localhost:8080/favmovie/chk", {
        movie_title: title,
        member_id: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        console.log(res.data);
        setIsChecked(res.data?.length ? true : false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handlelike = () => {
    console.log("ischecked" + ischecked);

    if (ischecked) {
      console.log("isChecked가 true일때");

      axios
        .post("http://localhost:8080/favmovie/delete", {
          member_id: window.sessionStorage.getItem("id"),
          movie_title: title,
        })
        .then((res) => {})
        .catch((e) => {
          console.error(e);
        });
      setIsChecked(false);
    } else {
      console.log("isChecked false일때 ");
      axios
        .post("http://localhost:8080/favmovie/isDuplicateTitle", {
          member_id: window.sessionStorage.getItem("id"),
          movie_title: title,
        })
        .then((res) => {
          if (res.data !== 1) {
            //제목이 중복되지 않을 때에만

            axios
              .post("http://localhost:8080/favmovie/insert", {
                member_id: window.sessionStorage.getItem("id"),
                movie_title: title,
                movie_summary: summary,
                movie_image: medium_cover_image,
              })
              .then((res) => {})
              .catch((e) => {
                console.error(e);
                console.log("3" + title);
              });
          } else {
          }
        })
        .catch((e) => {
          console.error(e);
        });
      setIsChecked(true);
    }
  };

  return (
    <div>
      <Container
        fixed
        maxWidth={false}
        disableGutters
        md={{ height: "500%" }}
        style={containerStyle}
      >
        <Box style={btnStyle}>
          <Grid
            item
            xs={6}
            sm={3}
            md={4}
            style={{
              marginTop: "0px",
              justifyContent: "left",
              color: "white",
              fontSize: "1.7em",
              fontWeight: "bold",
              width: "300px",
            }}
          >
            {title}
          </Grid>
          <Grid
            container
            style={{
              marginTop: "12px",
              flexDirection: "row",
              width: "215px",
              justifyContent: "space-between",
            }}
          >
            <Grid onClick={() => handlelike()}>
              <Button
                variant="outlined"
                style={{ color: "white", backgroundColor: "#787777" }}
                startIcon={ischecked ? <StarIcon /> : <StarBorderIcon />}
              >
                찜하기
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                startIcon={<InfoOutlinedIcon />}
                onClick={handleOpen}
                style={{ color: "white", backgroundColor: "#787777" }}
              >
                상세정보
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box style={imgStyle} />
        <Box style={playerStyle}>
          <YouTube
            videoId={yt_trailer_code}
            opts={{
              width: "580",
              height: "345",
              playerVars: {
                autoplay: 0,
                rel: 0,
                modestbranding: 1,
              },
            }}
            onEnd={(e) => {
              e.target.stopVideo(0);
            }}
          />
        </Box>
      </Container>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <div style={{ display: "flex" }}>
            <img
              width="300px"
              height="400px"
              style={{
                display: "flex",
              }}
              src={medium_cover_image}
              alt="movie"
            ></img>
            <Typography
              component="span"
              sx={{
                color: "white",
              }}
              style={{
                marginLeft: "16px",
                display: "flex",
                width: "450px",
              }}
            >
              <div
                style={{
                  display: "block",
                  flexDirection: "column",
                }}
              >
                <h2 style={{ display: "block" }}>{title}</h2>
                <p
                  style={{
                    fontSize: 18,
                    display: "block",
                    overflow: "hidden",
                  }}
                >
                  {summary.length > 500 ? `${summary.slice(0, 500)}…` : summary}
                </p>
              </div>
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default Banner_data;
