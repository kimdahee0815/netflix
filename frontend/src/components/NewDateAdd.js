import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Grid from "@mui/material/Grid";

const NewDateAdd = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/list_movies.json?sort_by=date_added&order_by=desc&limit=48&minimum_rating=8`)
    ).json();
    setMovies(json.data);
    setLoading(false);
  };

  useEffect(() => {
    searchMovies();
  }, [])

  return (
    <div>
      {loading ? (
        <div
          style={{
            marginLeft: "30px",
            marginTop: "100px",
            color: "white",
            fontSize: "2.4em",
            position: "fixed"
          }}
        >
          Searching...
        </div>
      ) : (
        <div style={{ marginTop: "100px" }}>
          <Grid container spacing={2}>
            {movies.movies.map((movie) => (
              <Grid item xs={2} key={movie.id}>
                <Movie
                  id={movie.id}
                  medium_cover_image={movie.medium_cover_image}
                  title={movie.title}
                  summary={movie.summary}
                  genres={movie.genres}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default NewDateAdd;
