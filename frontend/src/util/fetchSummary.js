const fetchSummary = async (data)=>{
  let movieData = data.movies? data.movies: data; 

  const updatedMovies = await Promise.all(
    movieData?.map(async (movie) => {
      if (!movie.summary || !movie.movie_summary || movie.summary === "" || movie.movie_summary === "") {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${movie.imdb_code}&apikey=${process.env.OMDB_API_KEY}&plot=full`
        );
        const data = await res.json();
        if(res.ok || !movie.summary){
          movie.summary = data.Plot; 
        }
        movie.rating = data.imdbRating;
      }
      return movie;
    })
  );

  return updatedMovies
}

export default fetchSummary;