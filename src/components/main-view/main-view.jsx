import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Col, Button } from 'react-bootstrap';

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
  const [selectedMovie, setSelectedMovie] = useState(null);

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
  return (
    <Row className='justify-content-md-center'>
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <Col>
          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
          <div>The list is empty.</div>
        </Col>
      ) : (
        <>
          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
          {movies.map((movie) => (
            <Col className='mb-4' key={movie._id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
