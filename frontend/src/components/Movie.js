/* eslint-disable jsx-a11y/alt-text */
import Modal from "@mui/material/Modal";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useLayoutEffect, useState, useEffect } from "react";

function Movie({
  id,
  medium_cover_image,
  title,
  summary,
  genres,
  value,
  number,
  getData,
}) {
  const onClick = () => {
    console.log(number);
    getData(number + 1);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 780,
    height: 400,
    bgcolor: "rgba(0,0,0,0.8)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    display: "flex",
    zIndex: 9999,
  };

  const [isHover, setIsHover] = React.useState(false);
  const handleHover = () => setIsHover(true);
  const handleLeave = () => setIsHover(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    // e.stopPropagation();
    setOpen(true);
    setIsHover(false);
  };
  const handleClose = () => setOpen(false);
  const [ischecked, setIsChecked] = useState(false);

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
        setIsChecked(res.data?.length ? true : false);
      })
      .catch((e) => {
        console.error(e);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modalCheck = () => {
    console.log("modal");
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
  };
  const handlelike = () => {
    console.log("ischecked" + ischecked);

    if (ischecked) {
      console.log("isChecked가 true일때");
      axios
        .post("http://localhost:8080/favmovie/delete", {
          member_id: window.sessionStorage.getItem("id"),
          movie_title: title,
        })
        .then((res) => {
          handleClose();
        })
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
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <img
        src={medium_cover_image}
        title={title}
        style={{
          width: "95%",
          height: "95%",
          objectFit: "cover",
          transition: "all 0.3s ease-out",
          transform: isHover ? "scale(1.1)" : "scale(1)",
          cursor: "pointer",
        }}
        // onClick={handleOpen}
        onClick={() => {
          handleOpen();
          modalCheck();
        }}
      />
      {isHover ? (
        <div
          // onClick={handleOpen}
          onClick={() => {
            handleOpen();
            modalCheck();
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "95%",
            height: "95%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.8)",
            cursor: "pointer",
          }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{
              color: "white",
              p: 2,
              animation: isHover ? "none" : "$fadeInOut 2s ease-out infinite",
            }}
          >
            {title}
          </Typography>
        </div>
      ) : null}
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
                alignItems: "flex-start",
                flexDirection: "column",
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
                    height: "230px",
                    fontSize: 18,
                    display: "block",
                  }}
                >
                  {summary?.length > 400
                    ? `${summary.slice(0, 400)}...`
                    : summary}
                </p>
              </div>
              <Grid>
                <Button
                  variant="outlined"
                  style={{
                    color: "white",
                    backgroundColor: "#787777",
                    position: "absolute",
                    bottom: " 20px",
                  }}
                  onClick={() => {
                    handlelike();
                    onClick();
                  }}
                  startIcon={ischecked ? <StarIcon /> : <StarBorderIcon />}
                >
                  찜하기
                </Button>
              </Grid>
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default Movie;
