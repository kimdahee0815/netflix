import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Grid from "@mui/material/Grid";


const SearchResult = ({ search }) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);


  const searchMovies = async () => {
    setLoading(true);

    const json = await (
      await fetch(`https://yts.mx/api/v2/list_movies.json?limit=48&query_term=${search}`)
    ).json();
    setMovies(json.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      searchMovies();
    }, 800);
    return () => clearTimeout(timer);
  }, [search]);

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
            {movies.movie_count === 0 ? (
              <div
                style={{
                  marginLeft: "30px",
                  color: "white",
                  marginTop: "20px",
                  fontSize: "2.4em",
                }}
              >
                검색결과가 존재하지 않습니다!
              </div>
            ) : (
              movies.movies.map((movie) => (
                <Grid item xs={2} key={movie.id}>
                  <Movie
                    id={movie.id}
                    medium_cover_image={movie.medium_cover_image}
                    title={movie.title}
                    summary={movie.summary}
                    genres={movie.genres}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
