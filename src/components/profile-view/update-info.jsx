import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import DeleteUser from './delete-user';

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
    <Row className='justify-content-center align-items-center'>
      <Col xs={12} md={10}>
        <Form
          onSubmit={handleUpdate}
          className='p-3 bg-light text-dark rounded shadow-sm'
        >
          <h4 className='text-center mb-4'>Edit User Info: </h4>
          <Form.Group controlId='formName' className='mb-2'>
            <Form.Label style={{ fontWeight: 'bold' }}>Name:</Form.Label>
            <Form.Control
              placeholder='Enter your name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength='3'
              style={{
                backgroundColor: 'white', // White background
                color: 'black',
              }}
            />
          </Form.Group>
          <Form.Group controlId='formPassword' className='mb-2'>
            <Form.Label style={{ fontWeight: 'bold' }}>Password:</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </Form.Group>
          <Form.Group controlId='formEmail' className='mb-2'>
            <Form.Label style={{ fontWeight: 'bold' }}>Email:</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </Form.Group>
          <Form.Group controlId='formBirthday' className='mb-2'>
            <Form.Label style={{ fontWeight: 'bold' }}>Birthday:</Form.Label>
            <Form.Control
              type='date'
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
              style={{
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </Form.Group>
          <Col>
            <Button
              variant='primary'
              type='submit'
              onClick={handleUpdate}
              className='w-100 text-light'
              style={{ fontWeight: '600' }}
            >
              Update User Info
            </Button>
          </Col>
          <Col>
            <DeleteUser />
          </Col>
        </Form>
      </Col>
    </Row>
  );
}

export default UpdateInfo;
