import React from 'react';
function UserInfo({ name, email }) {
  console.log('Name: ', name);
  console.log('Email: ', email);

  return (
    <>
      <h4>Your information:</h4>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </>
  );
}
export default UserInfo;
