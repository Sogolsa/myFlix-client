import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function DeleteUser() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  const handleDelete = (event) => {
    event.preventDefault();

    fetch(
      `https://myfilx-movies-9cb7e129c91a.herokuapp.com/users/${storedUser.Name}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
      }
    )
      .then(async (response) => {
        console.log('API Response:', response);

        if (response.ok) {
          setUser(null);
          setToken(null);
          alert('User was removed');

          localStorage.clear();
          window.location.reload();
        } else {
          alert('Could not remove the user');
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        return { success: false };
      });
  };

  return (
    <Button variant='primary' type='submit' onClick={handleDelete}>
      Delete User
    </Button>
  );
}
export default DeleteUser;
