'use client';

import { useParams } from 'next/navigation';
import RecipeForm from '../../../../components/forms/RecipeForm';

export default function EditRecipePage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Recipe</h1>
      <title>Edit Recipe</title>
      <RecipeForm recipeId={id} />
    </div>
  );
}
