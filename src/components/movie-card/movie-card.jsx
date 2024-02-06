import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, token, user, setUser }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  console.log('stored user: ', storedUser);
  const storedToken = localStorage.getItem('token');
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // const handleOnToggleFavorite= (event) {
  //   event.preventDefault();
  //   let favoriteMoviesList = movies.filter((m) =>
  //   user.FavoriteMovies.includes(m._id)
  // );

  useEffect(() => {
    if (user?.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, movie, token, setUser]);

  const addFavoriteMovie = () => {
    if (!storedUser || !storedUser.Name) {
      console.error('User or user.Name is undefined.');
    } else {
      console.log('Name: ', storedUser.Name);
    }
    fetch(
      `https://myfilx-movies-9cb7e129c91a.herokuapp.com/users/${storedUser.Name}/movies/${movie._id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
      }
    )
      .then((response) => {
        console.log('favorite movie: ', response);
        if (response.ok) {
          return response.json();
        } else {
          console.log('failed favorite movie: ', response);
          alert('Failed to add favorite movie');
        }
      })
      .then((updatedUserList) => {
        console.log('Updated User List:', updatedUserList);

        if (updatedUserList) {
          console.log('Updated User List: ', updatedUserList);
          localStorage.setItem('user', JSON.stringify(updatedUserList));
          setUser(updatedUserList);
          setIsFavorite(true);
          console.log('FavoriteMovies:', updatedUserList.FavoriteMovies);
          console.log(
            'FavoriteMovies length:',
            updatedUserList.FavoriteMovies.length
          );
        }
      })
      .catch((error) => {
        console.log('User list was not updated', error);
      });
  };

  /* column to look the same using sizing utility class h-100(height: 100%)
  /*encodeURIComponent isn't always needed, the key property used to populate id,
  contains non alphanumeric characters. encodeURIComponent replaces those characters
  with URL friendly characters*/
  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant='link'>More Info</Button>
        </Link>
        <Row>
          <Col>
            <Button
              className='btn-fav-movie'
              variant='link'
              onClick={addFavoriteMovie}
            >
              Add Favorite Movie
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
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
};

export default MovieCard;
