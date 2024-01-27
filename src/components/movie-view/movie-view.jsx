import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick}) => {
    console.log('MovieView Props:', movie);

    return (
        <div>
            <div>
                <img src={movie.image} />
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
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};

// MovieView.propTypes = {
//     movies: PropTypes.array.isRequired,
//     onMovieClick: PropTypes.func.isRequired
// };
MovieView.propTypes = {
    movie: PropTypes.shape ({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        imagePath: PropTypes.string,
        genre: PropTypes.shape ({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        director: PropTypes.shape ({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            birth: PropTypes.string
        }),
       
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};