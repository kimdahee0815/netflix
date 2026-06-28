import { useEffect, useState, useCallback } from "react";
import { fetchMovieList } from "./tmdb";
import { fetchLikes } from "../store/movie";

export default function useSearchMovie(sortBy) {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const searchMovies = useCallback(async () => {
        const pages = [1, 2, 3, 4, 5];
        const results = await Promise.all(pages.map((page) => fetchMovieList(sortBy, page)));
        return results.flat();
    }, [sortBy]);

    const getLikesData = async () => {
        const likesData = await fetchLikes();
        return Object.fromEntries(likesData.data.map((item) => [item.movie_title, item]));
    };

    useEffect(() => {
        const fetchData = async () => {
            const movies = await searchMovies();
            const likesMap = await getLikesData();
            const moviesWithLikes = movies.map((movie) => ({
                ...movie,
                likes: likesMap[movie.title]?.movie_count || 0,
            }));
            setMovies(moviesWithLikes);
            setLoading(false);
        };
        fetchData();
    }, [sortBy, searchMovies]);

    return { loading, movies };
}
