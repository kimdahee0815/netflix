import { useEffect, useState, useRef, useCallback } from "react";
import { fetchMovieList } from "./tmdb";
import { fetchLikes } from "../store/movie";

export default function useSearchMovie(sortBy) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const pageRef = useRef(1);
    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const sortByRef = useRef(sortBy);

    const getLikesMap = async () => {
        try {
            const res = await fetchLikes();
            return Object.fromEntries(res.data.map((item) => [item.movie_title, item]));
        } catch {
            return {};
        }
    };

    // stable function — uses refs, never changes reference
    const fetchPage = useCallback(async (page, replace = false) => {
        if (loadingRef.current || !hasMoreRef.current) return;
        loadingRef.current = true;
        setLoading(true);
        try {
            const [newMovies, likesMap] = await Promise.all([fetchMovieList(sortByRef.current, page), getLikesMap()]);
            const withLikes = newMovies.map((movie) => ({
                ...movie,
                likes: likesMap[movie.title]?.movie_count || 0,
            }));
            const more = newMovies.length > 0;
            hasMoreRef.current = more;
            setHasMore(more);
            setMovies((prev) => (replace ? withLikes : [...prev, ...withLikes]));
            pageRef.current = page + 1;
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Reset and load page 1 when sortBy changes
    useEffect(() => {
        sortByRef.current = sortBy;
        pageRef.current = 1;
        loadingRef.current = false;
        hasMoreRef.current = true;
        setMovies([]);
        setHasMore(true);
        fetchPage(1, true);
    }, [sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

    // loadMore is stable — safe to pass to IntersectionObserver
    const loadMore = useCallback(() => {
        fetchPage(pageRef.current, false);
    }, [fetchPage]);

    return { loading, movies, loadMore, hasMore };
}
