import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Banner_data from "./Banner_data";
import "../css/movie.css";

function Banner() {
    const movie = useSelector((state) => state.movie?.bannerMovie);

    return (
        <div>
            <Grid item xs={2}>
                {movie && (
                    // eslint-disable-next-line react/jsx-pascal-case
                    <Banner_data {...movie} value="favmovielist" />
                )}
            </Grid>
        </div>
    );
}
export default Banner;
