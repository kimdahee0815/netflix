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
                                검색결과가 존재하지 않습니다!
                            </div>
                        ) : (
                            searchMovies?.map((movie) => (
                                <Grid item xs={2} key={movie.id} justifyContent="center">
                                    <Movie {...movie} />
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
