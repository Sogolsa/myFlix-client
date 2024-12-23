import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  console.log('Movie View: ', movies);

  // useParams() to extract movieId parameter from URL
  //useParams() allows you to access dynamic parts of URL
  const { movieId } = useParams();

  // To render this data property look at all movies and find the one whose id matches
  const movie = movies.find((movie) => movie._id === movieId);
  console.log('Movie Image:', movie && movie.image);

  //w-100 setting image to take up column's full width
  return (
    <div className='bg-dark text-light p-4'>
      <div className='mb-3'>
        <img
          className='w-100'
          src={movie.image}
          alt='Movie Poster'
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'contain',
          }}
        />
      </div>
      <div className='mb-3'>
        <span style={{ fontWeight: 'bold' }}>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div className='mb-3'>
        <span style={{ fontWeight: 'bold' }}>Director: </span>
        <span>{movie.director.Name}</span>
      </div>
      <div className='mb-3'>
        <span style={{ fontWeight: 'bold' }}>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div className='mb-3'>
        <span style={{ fontWeight: 'bold' }}>Genre: </span>
        <span>{movie.genre.Name}</span>
      </div>
      <Link to={`/`}>
        <button className='back-button' style={{ cursor: 'pointer' }}>
          Back
        </button>
      </Link>
    </div>
  );
};
