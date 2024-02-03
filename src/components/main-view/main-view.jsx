import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  /*Storing the token and user as a state variables
   State variables update UI every time their value changes
   when reloading the page user and token are initialized with
   whatever is in localStorage, if it's empty, it will initialize
   with null(state where no user logged in) */
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  // useEffect to fetch movies when the component mounts
  // fetch is a promise
  useEffect(() => {
    // No reason for fetching data if there is no token
    if (!token) {
      return;
    }
    fetch('https://myfilx-movies-9cb7e129c91a.herokuapp.com/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
              Birth: movie.Director.Birth,
            },
            genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
          };
        });
        setMovies(moviesFromApi);
        console.log('movies: ', data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, [token]); //ensures fetch is called every time token is changed

  /* LoginView component is displayed in MainView when no user is logged in,
  if log in is successful pass a prop with a callback function to update current user */
  /* Using spacing utility class applied margin-bottom on each column mb-x, in which x is 
  the size of space and for centering the column within a row used justify-content
  -md-center class*/
  /*The structure below helps organize the app based on different URLs.
   Depending on the URL, different components are shown to the user.
   each page (or route) has its own content.
    The BrowserRouter helps keep track of which "page" the user is on and 
    updates the content accordingly.*/
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className='justify-content-md-center'>
        <Routes>
          <Route // path prop expresses what URL it should match
            path='/signup'
            element={
              //element prop tells the component what to render, if matches with URL
              /*If the user is truthy it redirects them to the homepage, if not, it shows the
              signup form with the column of width 5*/
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/movies/:movieId'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />{' '}
          <Route
            path='/profile'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      movies={movies}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/'
            element={
              /*If the user is not logged in, it redirects to the login page.
             If the user is logged in and there are movies, it displays movie cards in columns.*/
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className='mb-4' key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
