import Grid from "@mui/material/Grid";
import * as React from "react";
import { useState, useLayoutEffect } from "react";
import Banner_data from "./Banner_data";

function Banner() {
  const [movie, setMovie] = useState();
  const loadMysteryMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?limit=20&sort_by=download_count&order_by=desc`
    );
    const data = await response.json();
    const movies = data.data.movies;
    const randomNum = Math.floor(Math.random() * movies.length);
    setMovie(movies[randomNum]);
  };

  useLayoutEffect(() => {
    loadMysteryMovies();
  }, []);

  return (
    <div>
      <Grid item xs={2}>
        {movie && (
          <Banner_data
            id={movie.id}
            medium_cover_image={movie.medium_cover_image}
            title={movie.title}
            summary={movie.summary}
            genres={movie.genres}
            background={movie.background_image}
            large_cover_image={movie.large_cover_image}
            yt_trailer_code={movie.yt_trailer_code}
            value="favmovielist"
          />
        )}
      </Grid>
    </div>
  );
}
export default Banner;
