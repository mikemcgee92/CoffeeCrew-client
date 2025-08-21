'use client';

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getCategories } from '../utils/data/category_data';

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {categories.map((category) => (
        <Button>{category.label}</Button>
      ))}
    </div>
  );
}

export default Home;
