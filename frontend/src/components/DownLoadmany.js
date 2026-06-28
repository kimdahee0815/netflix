import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import useSearchMovie from "../util/useSearchMovie";
import Movie from "../components/Movie";

const DownLoadmany = () => {
    const { loading, movies } = useSearchMovie("popularity.desc");

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
                                <Box sx={{ position: "relative", paddingTop: "150%", overflow: "hidden" }}>
                                    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                                        <Movie {...movie} />
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default DownLoadmany;
