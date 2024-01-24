import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
       {
        id: 1,
        Title: "The Matrix",
        Description: "A mind-bending film, exploring a dystopian future where reality is simulated and controlled by intelligent machines.",
        Genre: "Sci-Fi",
        Image: "https://www.themoviedb.org/t/p/w440_and_h660_face/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        Director: "Lana Wachowski"
       },
       {
        id: 2,
        Title: "Inception",
        Description: "A min-bending thriller, diving into the world of dreams and subconscious manipulation to plant ideas into targets' minds.",
        Genre: "Sci-Fi",
        Image: "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
        Director: "Christopher Nolan"
       },
       {
        id: 3,
        Title: "The Godfather",
        Description: "This crime epic delves into the Italian-American mafia and the powerful Corleone family's struggles to maintain control.",
        Genre: "Crime",
        Image: "https://www.themoviedb.org/t/p/w440_and_h660_face/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        Director: "Francis Ford Coppola"
       }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    if(selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
    if (movies.length === 0) {
        return <div>The list is empty.</div>
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key = {movie.id} movie={movie} onMovieClick={(newSelectedMovie) =>{
                    setSelectedMovie(newSelectedMovie);
                }} />
            ))}
        </div>
    );
};