import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import fetchSummary from "../util/fetchSummary";
import config from "../config";

const initialState = {
    movies: {},
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
    },
});

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

const fetchAllMovies = async (genre) => {
    let minRating = 8;
    let maxPages = 2;
    let allMovies = [];

    for (let page = 1; page <= maxPages; page++) {
        const res = await fetch(
            `https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}&genre=${genre}&minimum_rating=${minRating}`
        );
        const data = await res.json();

        if (data?.data?.movies?.length > 0) {
            allMovies = [...allMovies, ...data?.data?.movies];
        } else {
            break;
        }
    }

    return allMovies;
};

export async function fetchLikes() {
    const res = await axios.get(`${config.API_URL}/favmovie/chk`);
    const data = await res.json();
    return data;
}

export const getAllGenresMoviesData = async (genres = []) => {
    const likesData = await fetchLikes();
    const likesMap = Object.fromEntries(likesData.map((item) => [item.movie_title, item]));

    return async (dispatch, getState) => {
        for (let genre of genres) {
            dispatch(movieActions.setLoading({ genre, value: true }));

            const movieData = await fetchAllMovies(genre);
            const updatedMovies = await fetchSummary(movieData);

            const moviesWithLikes = updatedMovies.map((movie) => ({
                ...movie,
                likes: likesMap[movie.title].movie_count || 0,
            }));

            dispatch(movieActions.addMovies({ genre, movies: shuffle(moviesWithLikes) }));

            dispatch(movieActions.setLoading({ genre, value: false }));
        }
    };
};
export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
