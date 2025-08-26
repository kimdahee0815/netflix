/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Movie from "../components/Movie";
import config from "../config";
import { FavListUpdateProvider } from "../store/FavListTriggerContext";

const FavMovieList = () => {
    const id = window.sessionStorage.getItem("id");
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [favListState, setFavListState] = useState(false);

    useEffect(() => {
        axios
            .get(`${config.API_URL}/favmovie/select?member_id=${id}`)
            .then((res) => {
                const movies = [...res.data];
                console.log(movies);
                setMovies(movies);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [favListState, id]);

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
                                        key={movie.imdb_code}
                                        title={movie.movie_title}
                                        summary={movie.movie_summary}
                                        medium_cover_image={movie.movie_image}
                                        isChecked={true}
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
