'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { getRecipes, deleteRecipe } from '../../utils/data/recipe_data';

export default function RecipesPage() {
  const [recipesArray, setRecipesArray] = useState([]);
  const router = useRouter();
  const query = window.location.search;

  useEffect(() => {
    console.warn(query);
    getRecipes(query).then(setRecipesArray);
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
        <div key={recipe.id} className="button-row">
          <Button className="btn btn-primary" onClick={() => router.push(`/recipes/${recipe.id}`)}>
            {recipe.label}
          </Button>
          <Button className="btn btn-info">E</Button>
          <Button
            className="btn btn-danger cat"
            onClick={() => {
              deleteRecipe(recipe.id);
              window.location.reload();
            }}
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
}
