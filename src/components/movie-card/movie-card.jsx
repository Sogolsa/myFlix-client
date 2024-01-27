import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick}) => {
    console.log('MovieCard props:', movie);
    if (!movie || !movie.title) {
    // Handle the case when movie or movie.Title is undefined
    return <div>Loading...</div>;
  }
    return (
        <div onClick={() => {
              onMovieClick(movie);
        }}>
            {movie.title}
        </div>
    );
};

// defining all the props constraints for the MovieCard
/* The props object must contain a movie object (shape means it's an object)
 The movie prop(object) contains Title, Description, Genre, Director keys with type string.
  if the onMovieClick function isn't passed as a prop to the MovieCard component, it will immediately
   display a warning in the console upon running the app.The prop name should be same as the one in
   MainView */
MovieCard.propTypes = {
    movie: PropTypes.shape ({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        imagePath: PropTypes.string,
        genre: PropTypes.shape ({
            Name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        director: PropTypes.shape ({
            Name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            birth: PropTypes.string
        }),
       
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};