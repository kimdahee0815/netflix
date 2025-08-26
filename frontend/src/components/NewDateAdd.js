import Grid from "@mui/material/Grid";
import Movie from "../components/Movie";
import useSearchMovie from "../util/useSearchMovie";

const NewDateAdd = () => {
    const { loading, movies } = useSearchMovie(
        `https://yts.mx/api/v2/list_movies.json?sort_by=date_added&order_by=desc&limit=48&minimum_rating=8`
    );
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
                        {movies?.map((movie) => (
                            <Grid item xs={2} key={movie.id}>
                                <Movie {...movie} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default NewDateAdd;
