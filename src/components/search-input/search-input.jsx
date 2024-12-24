import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// import './search-input.scss';

// Creating a component for search input and search button
function SearchInput({ onSearch }) {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');

  const handleButtonClick = () => {
    onSearch(searchValue);
    navigate('/search');
  };
  return (
    <Row className='justify-content-md-center mb-5'>
      <Col className='col col-sm-4 text-center offset-md-4 mt-3'>
        <input
          className='form-control bg-light text-dark'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder='Search for genre...'
        ></input>
      </Col>
      <Col>
        <Button
          className='text-light mt-3'
          variant='primary'
          type='submit'
          onClick={handleButtonClick}
        >
          Search
        </Button>
      </Col>
    </Row>
  );
}

export default SearchInput;
