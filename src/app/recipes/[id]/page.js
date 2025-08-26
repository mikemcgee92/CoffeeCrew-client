'use client';

import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import { getSingleRecipe } from '../../../utils/data/recipe_data';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    if (id && id !== 'undefined') {
      getSingleRecipe(id).then(setRecipe);
    }
  }, [id]);

  return (
    <div>
      <title>{recipe.label}</title>
      <Image src={recipe.image_url} alt={recipe.label} />
      <h1>{recipe.label}</h1>
      <h5>{recipe.category_id?.label}</h5>
      {/* TODO: Group ingredients by size, add button to switch between */}
      {recipe.ingredient_amounts?.map((ingredient) => (
        <h5 key={ingredient.size + ingredient.amount + ingredient.label}>
          {ingredient.size}: {ingredient.amount} of {ingredient.ingredient.label}
        </h5>
      ))}
      <h5>{recipe.notes}</h5>
      <h5>{recipe.steps}</h5>
    </div>
  );
}
