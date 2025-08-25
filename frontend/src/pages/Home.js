import "../components/OutputMovieGenres";
import { useEffect, useMemo, useRef } from "react";
import OutputMovieGenres from "../components/OutputMovieGenres";
import Banner from "../components/Banner";
import { getBannerMovie } from "../store/movie";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenresMoviesData } from "../store/movie";

const Home = () => {
    const movies = useSelector((state) => state.movie.movies);
    const dispatch = useDispatch();
    const hasInitialized = useRef(false);

    const genres = useMemo(() => ["comedy", "action", "adventure", "horror", "romance"], []);

    useEffect(() => {
        if (hasInitialized.current) {
            return;
        }

        const allGenresLoaded = genres.every((genre) => movies?.[genre] && movies?.[genre].length > 0);

        if (allGenresLoaded) {
            return;
        }

        hasInitialized.current = true;
        dispatch(getBannerMovie());
        dispatch(getAllGenresMoviesData(genres));
    }, [dispatch, genres, movies]);

    return (
        <div style={{ marginTop: "100px" }}>
            <Banner />
            {genres.map((genre) => (
                <OutputMovieGenres key={genre} genre={genre} />
            ))}
        </div>
    );
};

export default Home;
