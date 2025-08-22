'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { getRecipes } from '../../utils/data/recipe_data';

export default function RecipesPage() {
  const [recipesArray, setRecipesArray] = useState([]);
  const router = useRouter();
  const pageURL = new URL(window.location.href);
  const query = pageURL.searchParams;

  useEffect(() => {
    getRecipes(query || '').then(setRecipesArray);
  }, [query]);

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
      {recipesArray.map((recipe) => (
        <Button key={recipe.id} onClick={() => router.push(`/recipes/${recipe.id}`)}>
          {recipe.label}
        </Button>
      ))}
    </div>
  );
}
