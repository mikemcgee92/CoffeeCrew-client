'use client';

import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getSingleRecipe } from '../../../utils/data/recipe_data';

export default function RecipeDetailPage() {
  const pageURL = new URL(window.location.href);
  const pathWithId = pageURL.pathname;
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    getSingleRecipe(pathWithId).then(setRecipe);
  }, [pathWithId]);

  return (
    <div>
      <title>{recipe.label}</title>
      <Image src={recipe.image_url} alt={recipe.label} />
      <h1>{recipe.label}</h1>
      {console.warn(recipe)}
      <h5>{recipe.category_id?.label}</h5>
      {recipe.ingredient_amounts?.map((ingredient) => (
        <h5>
          {ingredient.size}: {ingredient.amount} of {ingredient.ingredient.label}
        </h5>
      ))}
      <h5>{recipe.notes}</h5>
      <h5>{recipe.steps}</h5>
    </div>
  );
}
