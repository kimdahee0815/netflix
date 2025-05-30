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
import config from '../config';
import {useContext} from 'react';
import { FavListUpdateContext } from "../store/FavListTriggerContext";
import '../css/movie.css';

function Movie({
  id,
  medium_cover_image,
  title,
  summary,
  genres,
  rating,
}) {
  const {favListUpdate} = useContext(FavListUpdateContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 780,
    height: "auto",
    bgcolor: "rgba(0,0,0,0.8)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    display: "flex",
    zIndex: 9999,
    outline: "none",
    overflowY: "auto",
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

  useLayoutEffect(() => {
    axios
      .post(`${config.API_URL}/favmovie/chk`, {
        movie_title: title,
        member_id: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        if(res.data?.length){
          setIsChecked(true);
        }else{
          setIsChecked(false);
        }
      })
      .catch((e) => {
        console.error(e);
      });
      
  }, []);

  const modalCheck = () => {
    axios
      .post(`${config.API_URL}/favmovie/chk`, {
        movie_title: title,
        member_id: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        if(res.data?.length){
          setIsChecked(true);
        }else{
          setIsChecked(false);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const handlelike = () => {

    if (ischecked) {
      axios
        .post(`${config.API_URL}/favmovie/delete`, {
            member_id: window.sessionStorage.getItem("id"),
            movie_title: title,
        })
        .then((res) => {
          handleClose();
          favListUpdate();
        })
        .catch((e) => {
          console.error(e);
        });
      setIsChecked(false);

    } else {
      axios
        .post(`${config.API_URL}/favmovie/isDuplicateTitle`, {
          member_id: window.sessionStorage.getItem("id"),
          movie_title: title,
        })
        .then((res) => {
          if (res.data !== 1) {
            //제목이 중복되지 않을 때에만

            axios
              .post(`${config.API_URL}/favmovie/insert`, {
                member_id: window.sessionStorage.getItem("id"),
                movie_title: title,
                movie_summary: summary,
                movie_image: medium_cover_image,
              })
              .then((res) => {})
              .catch((e) => {
                console.error(e);
              });
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
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "all 0.3s ease-out",
          transform: isHover ? "scale(1.1)" : "scale(1)",
          cursor: "pointer",
          transformOrigin: "center",
        }}
        onClick={() => {
          handleOpen();
          modalCheck();
        }}
      />
      {isHover ? (
        <div
          onClick={() => {
            handleOpen();
            modalCheck();
          }}
          style={{
            position: "absolute",
            top: 9,
            left: 7,
            width: "95%",
            height: "95%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.8)",
            cursor: "pointer",
            transformOrigin: "center",
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
              <p className="summary-scroll">
                {summary}
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
