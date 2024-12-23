import React from 'react';
function UserInfo({ name, email }) {
  console.log('Name: ', name);
  console.log('Email: ', email);

  return (
    <div className='bg-dark text-light mt-3 text-center'>
      <h4 className='mb-4'>Your information:</h4>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
}
export default UserInfo;
