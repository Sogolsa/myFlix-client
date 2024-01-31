import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  console.log('MovieCard props:', movie);
  if (!movie || !movie.title) {
    // Handle the case when movie or movie.title is undefined
    return <div>Loading...</div>;
  }
  // For every column to look the same using sizing utility class h-100(height: 100%)
  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant='link'>
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

// defining all the props constraints for the MovieCard
/* The props object must contain a movie object (shape means it's an object)
 The movie prop(object) contains Title, Description, Genre, Director keys with type string.
  if the onMovieClick function isn't passed as a prop to the MovieCard component, it will immediately
   display a warning in the console upon running the app.The prop name should be same as the one in
   MainView */
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imagePath: PropTypes.string,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birth: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
