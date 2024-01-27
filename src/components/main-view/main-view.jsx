import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    // useEffect to fetch movies when the component mounts
    // fetch is a promise
    useEffect(() => {
         fetch("https://myfilx-movies-9cb7e129c91a.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            // Populating movies state using setMovies
            console.log('Data from API:', data);
            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie._id,
                    title: movie.Title,
                    image: movie.ImagePath,
                    description: movie.Description,
                    director: {
                        Name: movie.Director.Name,
                        Bio: movie.Director.Bio,
                        Birth: movie.Director.Birth
                    },
                    genre: {
                        Name: movie.Genre.Name,
                        Description: movie.Genre.Description
                    }
         }});
       
            setMovies(moviesFromApi);
            console.log('movies: ', data);
        })
        .catch((error) => {
            console.error('Error fetching movies:', error);
          });
    }, []);

    if(selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
    if (movies.length === 0) {
        return <div>The list is empty.</div>
    }
    console.log('Rendering Movie Cards:', movies);
    console.log('movies array:', movies);
    return (
        <div>
           {movies.map((movie) => {
  console.log('Movie Title:', movie.title);
  return (
    <MovieCard
      key={movie._id}
      movie={movie}
      onMovieClick={(newSelectedMovie) => {
        setSelectedMovie(newSelectedMovie);
      }}
    />
  );
})}

        </div>
    );
};