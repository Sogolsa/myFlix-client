import react from 'react';
import { useState } from 'react';

// Passing the onLoggedIn prop to LoginView and calling the prop when login request succeeds
export const LoginView = ({ onLoggedIn }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  //when form submitted the open library will verify username and password
  const handleSubmit = (event) => {
    //Preventing the default which is reloading the entire page
    event.preventDefault();
  };

  const data = {
    access: name,
    secret: password,
  };

  fetch('https://myfilx-movies-9cb7e129c91a.herokuapp.com/login', {
    method: 'POST',
    /* Informing the server that the body of the request is formatted as JSON
    helping the server understand how to interpret and process the incoming data.*/
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }) /*transform response content into json object,so the code can use to
  extract JWT sent by API */
    .then((response) => response.json())
    .then((data) => {
      console.log('Login response: ', data);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert('No such user');
      }
    })
    .catch((e) => {
      alert('Something went wrong');
    });

  return (
    // Adding a callback that tells API to validate name and password
    /* Binding or setting up a state variable in react component
    and connecting it with state variable to the HTML form element state
    using value an onChange, this way, component state will become 
    primary place for data to be stored and updated */
    <form onSubmit={handleSubmit}>
      <label>
        Name:{' '}
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          /*form validation to enhance user experience
          checks users info and tells them if they've inputted error
          or if the fields are empty before request reaches server */
          required
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required //form validation
        />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
};
