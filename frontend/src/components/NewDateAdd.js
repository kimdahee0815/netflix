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
                <div
                    style={{
                        marginTop: "100px",
                        padding: "0 40px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {movies?.map((movie) => (
                        <Movie {...movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewDateAdd;
