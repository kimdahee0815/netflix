import { useEffect, useState, memo } from "react";
import Movie from "../components/Movie";
import { useSelector } from "react-redux";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const OutputMovieGenres = memo(({ genre }) => {
    const movies = useSelector((state) => state.movie.movies);
    const loading = useSelector((state) => state.movie.loading.all);
    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
        if (loading) {
            const intervalId = setInterval(() => {
                setDotCount((prevCount) => (prevCount + 1) % 4);
            }, 500);
            return () => clearInterval(intervalId);
        }
    }, [genre, loading]);

    const loadingText = `LOADING${".".repeat(dotCount)}`;

    const MovieSlider = ({ movies }) => {
        const [sliderRef] = useKeenSlider({
            loop: true,
            slides: { perView: 6, spacing: 3 },
        });

        return (
            <div
                ref={sliderRef}
                className="keen-slider"
                style={{
                    padding: "0 24px",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                {movies?.[genre]?.map((movie) => (
                    <div
                        key={movie.id}
                        className="keen-slider__slide"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                width: "300px",
                                aspectRatio: "2 / 3",
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                                backgroundColor: "#000",
                                transition: "transform 0.3s ease",
                            }}
                        >
                            <Movie {...movie} />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h2
                style={{
                    margin: "40px 0 10px 60px",
                    color: "#fff",
                    fontSize: "2.2rem",
                    fontWeight: "900",
                    textShadow: "0 0 10px rgba(255, 0, 0, 0.6), 0 0 20px rgba(255, 0, 0, 0.4)",
                    borderLeft: "6px solid red",
                    paddingLeft: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                }}
            >
                {genre}
            </h2>
            {loading || !movies?.[genre]?.length ? (
                <div
                    style={{
                        height: "300px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <p
                        style={{
                            fontSize: "3.5em",
                            fontWeight: "bold",
                            fontFamily: "Orbitron, sans-serif",
                            letterSpacing: "0.15em",
                            color: "#00FFFF",
                            textShadow: "0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF", // 네온 효과
                            animation: "neonFlicker 1.5s infinite alternate, pulse 1.5s infinite alternate",
                        }}
                    >
                        {loadingText}
                    </p>
                </div>
            ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <MovieSlider movies={movies} genre={genre} />
                </div>
            )}
        </div>
    );
});

export default OutputMovieGenres;

const neonFlickerAnimation = `
@keyframes neonFlicker {
  0% { color: #00FFFF; text-shadow: 0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF; }
  50% { color: #ADD8E6; text-shadow: 0 0 5px #ADD8E6, 0 0 10px #ADD8E6; }
  100% { color: #00FFFF; text-shadow: 0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF; }
}
`;

const pulseAnimation = `
@keyframes pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = neonFlickerAnimation + pulseAnimation;
document.head.appendChild(styleSheet);
