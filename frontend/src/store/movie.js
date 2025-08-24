import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import fetchSummary from "../util/fetchSummary";
import config from "../config";

const initialState = {
    movies: {},
    searchMovies: [],
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
        searchMovies(state, action){
            const {movies} = action.payload;
            state.searchMovies = movies;
        }
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
        // const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`,{
        //    headers: {
        //     Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        //     accept: 'application/json'
        //   }
        // })
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
    const data = await axios.get(`${config.API_URL}/favmovie/chk`);
    return data;
}

export const getAllGenresMoviesData = (genres = []) => {
    return async (dispatch, getState) => {
      const likesData = await fetchLikes();
      const likesMap = Object.fromEntries(likesData.data.map((item) => [item.movie_title, item]));
      dispatch(movieActions.setLoading({ genre:"all", value: true }));
      for (let genre of genres) {
        const movieData = await fetchAllMovies(genre);
        console.log(movieData)
        const updatedMovies = await fetchSummary(movieData);

        const moviesWithLikes = updatedMovies.map((movie) => ({
            ...movie,
            likes: likesMap[movie.title]?.movie_count || 0,
        }));

        dispatch(movieActions.addMovies({ genre, movies: shuffle(moviesWithLikes) }));
      }
      
      dispatch(movieActions.setLoading({ genre:"all", value: false }));
  };
};

export const getSearchMovies = async (search) =>{
  const data = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=48&query_term=${search}`)
  let updatedMovies = await fetchSummary(data?.data?.data?.movies);

  return updatedMovies;
}

export const getAllSearchMovies = (search) => {
  return async (dispatch) =>{
    dispatch(movieActions.setLoading({ genre: 'search', value: true }));
    const likesData = await fetchLikes();
    const likesMap = Object.fromEntries(likesData.data.map((item) => [item.movie_title, item]));
    console.log(likesMap)
    const movies = await getSearchMovies(search);
    const moviesWithLikes = movies.map((movie) => ({
      ...movie,
      likes: likesMap[movie.title]?.movie_count || 0,
    }));
    console.log(moviesWithLikes)
    dispatch(movieActions.searchMovies({movies: moviesWithLikes}))
    dispatch(movieActions.setLoading({ genre: 'search', value: false }));
  }
};

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
