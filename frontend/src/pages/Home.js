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
   const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
      dispatch(getAllGenresMoviesData(genres)); 
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      const intervalId = setInterval(() => {
        setDotCount((prevCount) => (prevCount + 1) % 4);
      }, 500); 
      return () => clearInterval(intervalId); 
    }
  }, [loading]);
  
    const loadingText = `LOADING${'.'.repeat(dotCount)}`;

  return (
    <div style={{ marginTop: "100px" }}>
      <Banner />
      {loading &&  
        <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{
            fontSize: "3.5em",
            fontWeight: "bold",
            fontFamily: 'Orbitron, sans-serif', // SF적인 느낌의 폰트
            letterSpacing: '0.15em',
            color: '#00FFFF', // 기본 네온 색상
            textShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF', // 네온 효과
            animation: 'neonFlicker 1.5s infinite alternate, pulse 1.5s infinite alternate'
          }}>
            {loadingText}
          </p>
        </div>
     }
      {!loading && genres.map((genre) => (
        <OutputMovieGenres key={genre} genre={genre} />
      ))}
    </div>
  );
};

export default Home;

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