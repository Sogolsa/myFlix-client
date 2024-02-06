// // FavoriteMoviesList.jsx
// import React from 'react';
// import { Row, Col, Container } from 'react-bootstrap';
// import { useState } from 'react';
// import { MovieCard } from '../movie-card/movie-card';

// export default function FavoriteMoviesList({ movies, user }) {
//   // const [movies, setMovies] = useState([]);
//   // const [favoriteMovies, setFavoriteMovies] = useState([]);
//   // let favoriteMoviesList = movies.filter((m) =>
//   //   user.FavoriteMovies.includes(m._id)
//   // );
//   let favoriteMoviesList = [];

//   if (user && user.FavoriteMovies && movies) {
//     favoriteMoviesList = movies.filter((m) =>
//       user.FavoriteMovies.includes(m._id)
//     );
//   }

//   return (
//     <Container>
//       <Row className='justify-content-md-center'>
//         <h4 className='profile-title'>Favorite movies:</h4>
//         {favoriteMoviesList.map((movie) => {
//           return (
//             <Col md={5} key={movie._id} className='m-3'>
//               <MovieCard
//                 movie={movie}
//                 token={token}
//                 setUser={setUser}
//                 user={user}
//               />
//             </Col>
//           );
//         })}
//       </Row>
//     </Container>
//   );
// }
