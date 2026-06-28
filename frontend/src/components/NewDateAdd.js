import { useRef, useEffect } from "react";
import useSearchMovie from "../util/useSearchMovie";
import Movie from "../components/Movie";

const NewDateAdd = () => {
    const { loading, movies, loadMore } = useSearchMovie("primary_release_date.desc");
    const sentinelRef = useRef(null);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) loadMore();
            },
            { rootMargin: "400px", threshold: 0 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [loadMore]);

    return (
        <div>
            {movies.length === 0 && loading ? (
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
                <div
                    style={{
                        marginTop: "100px",
                        padding: "0 40px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {movies.map((movie) => (
                        <Movie {...movie} key={movie.id} />
                    ))}
                </div>
            )}
            <div ref={sentinelRef} style={{ height: 1 }} />
            {loading && movies.length > 0 && (
                <div style={{ color: "white", textAlign: "center", padding: "20px", fontSize: "1.2em" }}>
                    Loading more...
                </div>
            )}
        </div>
    );
};

export default NewDateAdd;
