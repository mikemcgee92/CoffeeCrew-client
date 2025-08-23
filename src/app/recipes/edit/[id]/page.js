'use client';

import RecipeForm from '../../../../components/forms/RecipeForm';

export default function EditRecipePage() {
  // TODO: pass in recipe object ID
  return (
    <div>
      <h1>Edit Recipe</h1>
      <RecipeForm recipe={1} />
    </div>
  );
}
