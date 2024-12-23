import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

import './login-view.scss';

// Passing the onLoggedIn prop to LoginView and calling the prop when login request succeeds
export const LoginView = ({ onLoggedIn }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //when form submitted the open library will verify username and password
  const handleSubmit = (event) => {
    //Preventing the default which is reloading the entire page
    event.preventDefault();

    const data = {
      Name: name,
      Password: password,
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
      .catch((error) => {
        console.error('Login error:', error);
        alert('Something went wrong');
      });
  };

  return (
    // Adding a callback that tells API to validate name and password
    /* Binding or setting up a state variable in react component
    and connecting it with state variable to the HTML form element state
    using value an onChange, this way, component state will become 
    primary place for data to be stored and updated */
    <Row className='justify-content-center align-items-center'>
      <Form
        onSubmit={handleSubmit}
        className='p-4 bg-light rounded shadow-sm login-view'
      >
        <Form.Group className='mb-3' controlId='formName'>
          <h3 className='text-center mb-4'>Login</h3>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            className='bg-light'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            /*form validation to enhance user experience
          checks users info and tells them if they've inputted error
          or if the fields are empty before request reaches server */
            required
            minLength='3'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {/* <Form.Group>
          <Form.Label>Password:</Form.Label>
          <div className='input-group'>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant='outline-secondary'
              onClick={() => setShowPassword(!showPassword)}
              className='toggle-password-btn'
            >
              {showPassword ? (
                <i className='bi bi-eye-slash'></i> 
              ) : (
                <i className='bi bi-eye'></i> 
              )}
            </Button>
          </div>
        </Form.Group> */}
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Row>
  );
};
