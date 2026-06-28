import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Movie from "../components/Movie";
import { getAllSearchMovies } from "../store/movie";

const SearchResult = ({ search }) => {
    const dispatch = useDispatch();

    const searchMovies = useSelector((state) => state.movie.searchMovies);
    const loading = useSelector((state) => state.movie.loading.search);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getAllSearchMovies(search));
        }, 800);
        return () => clearTimeout(timer);
    }, [dispatch, search]);

    return (
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
                    Searching...
                </div>
            ) : (
                <div style={{ marginTop: "100px" }}>
                    <Grid container spacing={2} justifyContent="center">
                        {searchMovies?.length === 0 ? (
                            <div
                                style={{
                                    marginLeft: "30px",
                                    color: "white",
                                    marginTop: "20px",
                                    fontSize: "2.4em",
                                }}
                            >
                                No results found!
                            </div>
                        ) : (
                            <div
                                style={{
                                    marginTop: "100px",
                                    padding: "0 40px",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                                    gap: "16px",
                                }}
                            >
                                {searchMovies?.map((movie) => (
                                    <Movie {...movie} key={movie.id} />
                                ))}
                            </div>
                        )}
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default SearchResult;
