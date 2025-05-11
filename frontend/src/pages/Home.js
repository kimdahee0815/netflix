import "../components/OutputMovieGenres";
import { useEffect, useState } from "react";
import OutputMovieGenres from "../components/OutputMovieGenres";
import Banner from "../components/Banner";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenresMoviesData } from '../store/movie';

const Home = () => {
  const loading = useSelector((state)=> state.movie.loading);
  const dispatch = useDispatch();
  const genres = ["comedy", "action", "adventure", "horror", "romance"];

  useEffect(() => {
      dispatch(getAllGenresMoviesData(genres)); 
  }, [dispatch]);

  return (
    <div style={{ marginTop: "100px" }}>
      <Banner />
      {genres.map((genre) => (
        <OutputMovieGenres key={genre} genre={genre} />
      ))}
    </div>
  );
};

export default Home;