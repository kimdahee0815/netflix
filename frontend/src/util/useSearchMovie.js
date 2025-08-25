import { useEffect, useState, useCallback } from "react";
import fetchSummary from "./fetchSummary";
import { fetchLikes } from "../store/movie";

export default function useSearchMovie(apiUrl) {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const searchMovies = useCallback(async () => {
        const json = await (await fetch(apiUrl)).json();
        let updatedMovies = await fetchSummary(json.data);
        return updatedMovies;
    }, [apiUrl]);

    const getLikesData = async () => {
        const likesData = await fetchLikes();
        const likesMap = Object.fromEntries(likesData.data.map((item) => [item.movie_title, item]));
        return likesMap;
    };

    useEffect(() => {
        const fetchData = async () => {
            const movies = await searchMovies();
            const likesMap = await getLikesData();
            const moviesWithLikes = movies.map((movie) => ({
                ...movie,
                likes: likesMap[movie.title]?.movie_count || 0,
            }));
            console.log(moviesWithLikes);
            setMovies(moviesWithLikes);
            setLoading(false);
        };
        fetchData();
    }, [apiUrl, searchMovies]);

    return { loading, movies };
}
