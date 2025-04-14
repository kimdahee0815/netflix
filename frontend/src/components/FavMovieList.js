/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Grid from "@mui/material/Grid";
import axios from "axios";
import config from '../config';
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
        console.log(res.data)
        const movies = [...res.data];
        setMovies(movies);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
      console.log(favListState)
  }, [favListState]);

  const favListUpdate = ()=>{
    setFavListState(favListState=>!favListState);
  }

  const ctxValue = {
    favListState,
    favListUpdate,
  }

  return (
    <FavListUpdateProvider value={ctxValue}>
    <div>
      {loading ? (
        <div
          style={{
            marginLeft: "30px",
            marginTop: "100px",
            color: "white",
            fontSize: "2.4em",
            position: "fixed",
          }}
        >
          loading...
        </div>
      ) : (
        <div>
          {movies.length ? (
            <div style={{ marginTop: "100px" }}>
              <Grid container spacing={2}>
                {movies.map((movie) => (
                  <Grid key={movie.imdb_code} item xs={2}>
                    <Movie
                      id={movie.movie_num}
                      title={movie.movie_title}
                      summary={movie.summary? movie.summary : movie.movie_summary}
                      medium_cover_image={movie.movie_image}
                      value="favmovielist"
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <div
              style={{
                marginLeft: "30px",
                marginTop: "100px",
                color: "white",
                fontSize: "2.4em",
                position: "fixed",
              }}
            >
              찜목록이 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
    </FavListUpdateProvider>
  );
};

export default FavMovieList;
