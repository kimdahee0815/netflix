import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import Grid from "@mui/material/Grid";
import Movie from "../components/Movie";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenresMoviesData } from '../store/movie'; 
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const OutputMovieGenres = ({ genre }) => {
  const movies = useSelector((state) => state.movie.movies);
  const loading = useSelector((state)=> state.movie.loading);

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
      {loading || !movies?.[genre]?.length ? (
       <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "white", fontSize: "1.5em" }}>LOADING...</p>
      </div>
      ) : (
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
    letterSpacing: "1px"
  }}

    >
      {genre}
    </h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MovieSlider movies={movies} genre={genre}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputMovieGenres;
