/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import config from "../config";
import { FavListUpdateProvider } from "../store/FavListTriggerContext";

const FavMovieList = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [favListState, setFavListState] = useState(false);

  useEffect(() => {
    axios
      .post(`${config.API_URL}/favmovie/select`, {
        member_id: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        const movies = [...res.data];
        setMovies(movies);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [favListState]);

  const favListUpdate = () => {
    setFavListState((favListState) => !favListState);
  };

  const ctxValue = {
    favListState,
    favListUpdate,
  };

  return (
    <FavListUpdateProvider value={ctxValue}>
      {loading ? (
        <div
          style={{
            color: "white",
            fontSize: "2.4em",
            marginLeft: "30px",
          }}
        >
          loading...
        </div>
      ) : (
        <div style={{ marginTop: "100px" }}>
          {movies.length ? (
            <Grid container spacing={2} justifyContent="center">
              {movies.map((movie) => (
                <Grid key={movie.imdb_code} item xs={2}>
                  <Movie
                    id={movie.movie_num}
                    title={movie.movie_title}
                    summary={
                      movie.summary ? movie.summary : movie.movie_summary
                    }
                    medium_cover_image={movie.movie_image}
                    value="favmovielist"
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div
              style={{
                color: "white",
                fontSize: "2.4em",
                marginLeft: "30px",
              }}
            >
              찜목록이 없습니다.
            </div>
          )}
        </div>
      )}
    </FavListUpdateProvider>
  );
};

export default FavMovieList;
