import Grid from "@mui/material/Grid";
import Movie from "../components/Movie";
import useSearchMovie from "../util/useSearchMovie";

const NewDateAdd = () => {
    const { loading, movies } = useSearchMovie("primary_release_date.desc");

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
                <div style={{ marginTop: "100px", padding: "0 8px" }}>
                    <Grid container spacing={1}>
                        {movies?.map((movie) => (
                            <Grid item xs={4} sm={3} md={2} key={movie.id}>
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
