import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

import './signup-view.scss';

export const SignupView = () => {
  // Fields needed for the new account
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: name,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch('https://myfilx-movies-9cb7e129c91a.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };
  return (
    <Row className='justify-content-center align-items-center'>
      <Col xs={12}>
        <Form
          onSubmit={handleSubmit}
          className='p-4 bg-light rounded shadow-sm signup-view'
        >
          <Form.Group className='mb-3' controlId='formName'>
            <h3 className='text-center mb-4'>Signup</h3>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength='3'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBirthday'>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type='date'
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
