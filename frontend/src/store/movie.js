import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { fetchMoviesByGenre, searchTmdbMovies, fetchMovieList, fetchMovieTrailer } from "../util/tmdb";
import config from "../config";

const initialState = {
    movies: {},
    searchMovies: [],
    bannerMovie: null,
    loading: {},
};
const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        addMovies(state, action) {
            const { genre, movies } = action.payload;
            state.movies[genre] = movies;
        },
        setLoading(state, action) {
            const { genre, value } = action.payload;
            state.loading[genre] = value;
        },
        searchMovies(state, action) {
            const { movies } = action.payload;
            state.searchMovies = movies;
        },
        setBannerMovie(state, action) {
            const { movie } = action.payload;
            state.bannerMovie = movie;
        },
    },
});

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

const fetchAllMovies = async (genre) => {
    let allMovies = [];
    for (let page = 1; page <= 2; page++) {
        const movies = await fetchMoviesByGenre(genre, page);
        if (movies.length > 0) allMovies = [...allMovies, ...movies];
        else break;
    }
    return allMovies;
};

export async function fetchLikes() {
    const data = await axios.get(`${config.API_URL}/favmovie/chk`);
    return data;
}

export const getAllGenresMoviesData = (genres = []) => {
    return async (dispatch, getState) => {
        const likesData = await fetchLikes();
        const likesMap = Object.fromEntries(likesData.data.map((item) => [item.movie_title, item]));
        dispatch(movieActions.setLoading({ genre: "all", value: true }));
        for (let genre of genres) {
            const movieData = await fetchAllMovies(genre);
            const moviesWithLikes = movieData.map((movie) => ({
                ...movie,
                likes: likesMap[movie.title]?.movie_count || 0,
            }));
            dispatch(movieActions.addMovies({ genre, movies: shuffle(moviesWithLikes) }));
        }
        dispatch(movieActions.setLoading({ genre: "all", value: false }));
    };
};

export const getSearchMovies = async (search) => {
    return await searchTmdbMovies(search);
};

export const getAllSearchMovies = (search) => {
    return async (dispatch) => {
        dispatch(movieActions.setLoading({ genre: "search", value: true }));
        const likesData = await fetchLikes();
        const likesMap = Object.fromEntries(likesData.data.map((item) => [item.movie_title, item]));
        const movies = await getSearchMovies(search);
        const moviesWithLikes = movies.map((movie) => ({
            ...movie,
            likes: likesMap[movie.title]?.movie_count || 0,
        }));
        dispatch(movieActions.searchMovies({ movies: moviesWithLikes }));
        dispatch(movieActions.setLoading({ genre: "search", value: false }));
    };
};

export const getBannerMovie = () => {
    return async (dispatch) => {
        const likesData = await fetchLikes();
        const likesMap = Object.fromEntries(likesData.data.map((item) => [item.movie_title, item]));
        const movies = await fetchMovieList("popularity.desc");
        const moviesWithLikes = movies.map((movie) => ({
            ...movie,
            likes: likesMap[movie.title]?.movie_count || 0,
        }));
        const trailerKeys = await Promise.all(moviesWithLikes.map((m) => fetchMovieTrailer(m.id)));
        const moviesWithTrailers = moviesWithLikes
            .map((movie, i) => ({ ...movie, trailerKey: trailerKeys[i] }))
            .filter((movie) => movie.trailerKey);
        if (moviesWithTrailers.length === 0) return;
        const randomNum = Math.floor(Math.random() * moviesWithTrailers.length);
        dispatch(movieActions.setBannerMovie({ movie: moviesWithTrailers[randomNum] }));
    };
};

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
