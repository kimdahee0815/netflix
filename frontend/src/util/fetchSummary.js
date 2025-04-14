const fetchSummary = async (data)=>{
  let movieData = data.movies? data.movies: data; 

  const updatedMovies = await Promise.all(
    movieData.map(async (movie) => {
      if (!movie.summary || !movie.movie_summary || movie.summary === "" || movie.movie_summary === "") {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${movie.imdb_code}&apikey=4a472414&plot=full`
        );
        const data = await res.json();
        movie.summary = data.Plot; 
      }
      return movie;
    })
  );

  return updatedMovies
}

export default fetchSummary;