const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;

// 장르 이름 → TMDB 장르 ID
export const GENRE_MAP = {
    action: 28,
    comedy: 35,
    drama: 18,
    horror: 27,
    romance: 10749,
    thriller: 53,
    "sci-fi": 878,
    science_fiction: 878,
    animation: 16,
    documentary: 99,
    fantasy: 14,
    adventure: 12,
    crime: 80,
    family: 10751,
    mystery: 9648,
    war: 10752,
    music: 10402,
    western: 37,
};

// TMDB movie → yts 형태로 변환
export const toYtsShape = (m) => ({
    id: m.id,
    title: m.title,
    summary: m.overview || "No summary found.",
    rating: m.vote_average,
    year: m.release_date ? m.release_date.slice(0, 4) : "",
    genres: [],
    medium_cover_image: m.poster_path ? `${IMG_BASE}${m.poster_path}` : "",
    large_cover_image: m.poster_path ? `${IMG_BASE}${m.poster_path}` : "",
    background_image: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : "",
});

// 공통 fetch 헬퍼
const tmdbFetch = async (path, params = {}) => {
    const query = new URLSearchParams({
        api_key: TMDB_KEY,
        language: "en-US",
        ...params,
    }).toString();
    const res = await fetch(`${TMDB_BASE}${path}?${query}`);
    const data = await res.json();
    return (data.results || []).map(toYtsShape);
};

// 장르별 영화
export const fetchMoviesByGenre = (genreName, page = 1) =>
    tmdbFetch("/discover/movie", {
        with_genres: GENRE_MAP[genreName?.toLowerCase()] || "",
        sort_by: "vote_average.desc",
        "vote_count.gte": 200,
        page,
    });

// 검색
export const searchTmdbMovies = (term) => tmdbFetch("/search/movie", { query: term });

// 정렬 기반 목록 (다운로드순/좋아요순/최신순 대체)
export const fetchMovieList = (sortBy, page = 1) =>
    tmdbFetch("/discover/movie", {
        sort_by: sortBy,
        "vote_count.gte": 100,
        page,
    });

export const fetchMovieTrailer = async (movieId) => {
    const query = new URLSearchParams({ api_key: TMDB_KEY, language: "en-US" }).toString();
    const res = await fetch(`${TMDB_BASE}/movie/${movieId}/videos?${query}`);
    const data = await res.json();
    const trailer = (data.results || []).find((v) => v.type === "Trailer" && v.site === "YouTube");
    return trailer?.key || null;
};
