import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import Banner_data from "./Banner_data";
import "../css/movie.css";
import { getBannerMovie } from "../store/movie";
import { useDispatch, useSelector } from "react-redux";

function Banner() {
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movie?.bannerMovie);

    useEffect(() => {
        dispatch(getBannerMovie());
    }, [dispatch]);

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
