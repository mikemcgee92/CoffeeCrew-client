'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { getRecipes, deleteRecipe } from '../../utils/data/recipe_data';

export default function RecipesPage() {
  const [recipesArray, setRecipesArray] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';

  useEffect(() => {
    getRecipes(query).then(setRecipesArray);
  }, [query]);

  return (
    <div
      key={query}
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <title>{query ? recipesArray[0]?.category_id.label : 'All recipes'}</title>
      <h1>{query ? recipesArray[0]?.category_id.label : 'All recipes'}</h1>
      {recipesArray.map((recipe) => (
        <div key={recipe.id} className="button-row">
          <Button className="btn btn-primary" onClick={() => router.push(`/recipes/${recipe.id}`)}>
            {recipe.label}
          </Button>
          <Button className="btn btn-info" onClick={() => router.push(`/recipes/edit/${recipe.id}`)}>
            E
          </Button>
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
      <div>
        <Button className="btn btn-success" onClick={() => router.push('/recipes/new')}>
          + New Recipe
        </Button>
      </div>
    </div>
  );
}
