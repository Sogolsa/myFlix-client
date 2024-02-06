import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import MovieCard from '../movie-card/movie-card';

import UserInfo from './user-info';
import UpdateInfo from './update-info';
import DeleteUser from './delete-user';

export const ProfileView = ({ user, movie, movies }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  console.log('stored user: ', storedUser);
  const storedToken = localStorage.getItem('token');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  let FavoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );
  useEffect(() => {
    if (storedToken) {
      fetch(
        `https://myfilx-movies-9cb7e129c91a.herokuapp.com/users/${storedUser.Name}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('API response: ', data);
          if (data !== null) {
            const userFromApi = {
              name: data.Name,
              email: data.Email,
              birthday: data.Birthday,
            };
            setName(userFromApi.name);
            setEmail(userFromApi.email);
          } else {
            console.error('ApI returned null data');
          }
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    }
  }, []);

  // Render the UserInfo component with the retrieved user information
  // Render Update info from UpdateInfo component
  return (
    <Container>
      <Row className='justify-content-md-center align-items-center'>
        <Col md={5}>
          <UserInfo name={name} email={email} />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='favorite-movies'>
            <h5>Favorite Movies:</h5>
            {FavoriteMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                token={storedToken}
                user={user}
              />
            ))}
          </div>
        </Col>
        <Col
          md={5}
          className='justify-content-md-center align-items-center second-row'
        >
          <UpdateInfo
            name={name}
            email={email}
            password={password}
            birthday={birthday}
          />
          <DeleteUser />
        </Col>
      </Row>
    </Container>
  );
};
