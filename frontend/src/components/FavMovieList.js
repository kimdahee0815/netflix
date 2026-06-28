/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import axios from "axios";
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
                        marginLeft: "30px",
                        marginTop: "100px",
                        color: "white",
                        fontSize: "2.4em",
                        position: "fixed",
                    }}
                >
                    Loading...
                </div>
            ) : (
                <div style={{ marginTop: "100px", padding: "0 40px" }}>
                    {movies.length ? (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                                gap: "16px",
                            }}
                        >
                            {movies.map((movie) => (
                                <Movie
                                    key={movie.movie_title}
                                    title={movie.movie_title}
                                    summary={movie.movie_summary}
                                    medium_cover_image={movie.movie_image}
                                    isChecked={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{
                                color: "white",
                                fontSize: "2.4em",
                                marginLeft: "30px",
                            }}
                        >
                            No Favorites.
                        </div>
                    )}
                </div>
            )}
        </FavListUpdateProvider>
    );
};

export default FavMovieList;
