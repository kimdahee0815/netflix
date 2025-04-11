import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import Grid from "@mui/material/Grid";
import Movie from "../components/Movie";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";

const OutputMovieGenres = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moviesIndex, setMoviesIndex] = useState(0);
  useLayoutEffect(() => {
    setLoading(true);
    loadMovies();
  }, []);

  const moveLeft = useCallback(() => {
    setMoviesIndex((moviesIndex) => {
      return moviesIndex === 0 ? moviesIndex + 20 : moviesIndex - 5;
    });
  }, []);
  const moveRight = useCallback(() => {
    setMoviesIndex((moviesIndex) => {
      return moviesIndex === 20 ? moviesIndex - 20 : moviesIndex + 5;
    });
  }, []);

  const loadMovies = async () => {
    const movieData = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?limit=25&genre=${genre}&minimum_rating=8`
      )
    ).json();

    let data = movieData.data.movies;
    setLoading(false);
    setMovies(shuffle(data));
  };

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const movieRender = () => {
    let result = [];

    for (let i = moviesIndex; i < moviesIndex + 5; i++) {
      let movie = movies[i];

      result.push(
        <Grid item xs={2} key={movie.id}>
          <Movie
            id={movie.id}
            medium_cover_image={movie.medium_cover_image}
            title={movie.title}
            summary={movie.summary}
            genres={movie.genres}
          />
        </Grid>
      );
    }
    return result;
  };

  return (
    <div>
      {loading ? (
        <div>
          <Box
            style={{
              height: "22em",
            }}
          >
            &nbsp;
          </Box>
        </div>
      ) : (
        <div>
          <h2
            style={{
              marginTop: "0px",
              justifyContent: "center",
              marginLeft: "8.5%",
              color: "white",
              fontSize: "1.5em",
            }}
          >
            genre : {genre}
          </h2>
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              style={{
                display: "flex",
              }}
              item
              xs={1}
            >
              <IconButton
                onClick={moveLeft}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <ArrowBackIosIcon
                  style={{
                    width: "40%",
                    height: "100%",
                    color: "red",
                    scale: "2.0",
                    marginLeft: "1.5em",
                  }}
                />
              </IconButton>
            </Grid>

            {movies?.length && movieRender()}
            {/* {movieRender()} */}
            <Grid item xs={1}>
              <IconButton
                onClick={moveRight}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <ArrowForwardIosIcon
                  style={{
                    width: "40%",
                    height: "100%",
                    color: "red",
                    scale: "2.0",
                    marginRight: "1.5em",
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default OutputMovieGenres;
