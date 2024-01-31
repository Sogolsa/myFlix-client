import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  console.log('MovieView Props:', movie);

  //w-100 setting image to take up column's full width
  return (
    <div>
      <div>
        <img className='w-100' src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.Name}</span>
      </div>
      <button
        onClick={onBackClick}
        className='back-button'
        style={{ cursor: 'pointer' }}
      >
        Back
      </button>
    </div>
  );
};
