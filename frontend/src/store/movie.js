import { createSlice } from "@reduxjs/toolkit";
import fetchSummary from './../util/fetchSummary';

const initialState = {
  movies: {}, 
  loading: true,
}
const movieSlice = createSlice({
  name:'movie',
  initialState,
  reducers:{
    addMovies(state, action) {
      const { genre, movies } = action.payload;
      state.movies[genre] = movies;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  }
})

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
const fetchAllMovies = async (genre, minRating = 8, maxPages = 4) => {
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
export const getAllGenresMoviesData = (genres = []) => {
  return async (dispatch, getState) => {
    dispatch(movieActions.setLoading(true)); 

    for (let genre of genres) {
      const movieData = await fetchAllMovies(genre);
      const updatedMovies = await fetchSummary(movieData);
      dispatch(
        movieActions.addMovies({ genre, movies: shuffle(updatedMovies) })
      );
    }

    dispatch(movieActions.setLoading(false));
  };
};
export const movieActions = movieSlice.actions;

export default movieSlice.reducer;