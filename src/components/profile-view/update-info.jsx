import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function UpdateInfo() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [user, setUser] = useState('');

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Name: name,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://myfilx-movies-9cb7e129c91a.herokuapp.com/users/${storedUser.Name}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
      }
    )
      .then(async (response) => {
        console.log('API Response:', response);

        if (response.ok) {
          const updatedUser = await response.json();
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert('Update successful');
          window.location.reload();
        } else {
          alert('Update failed');
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        return { success: false };
      });
  };

  return (
    <Form onSubmit={handleUpdate} className='justify-content-md-center'>
      <h4>Edit User Info: </h4>
      <Form.Group controlId='formName'>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength='3'
        />
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId='formEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId='formBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type='date'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={handleUpdate}>
        Update User Info
      </Button>
    </Form>
  );
}

export default UpdateInfo;
