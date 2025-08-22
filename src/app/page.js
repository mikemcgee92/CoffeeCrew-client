'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { getCategories } from '../utils/data/category_data';

function Home() {
  const router = useRouter();
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
      <title>CoffeeCrew</title>
      <link rel="icon" href="favicon.ico" />
      {categories.map((category) => (
        <Button key={category.id} onClick={() => router.push(`/recipes?category_id=${category.id}`)}>
          {category.label}
        </Button>
      ))}
    </div>
  );
}

export default Home;
