import { clientCredentials } from '../client';

const getIngredients = async () => {
  const response = await fetch(`${clientCredentials.databaseURL}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const getSingleIngredient = async (id) => {
  const response = await fetch(`${clientCredentials.databaseURL}/ingredients/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const addIngredientToRecipe = async (recipeId, ingredientPayload, uid) => {
  await fetch(`${clientCredentials.databaseURL}/recipes/${recipeId}/ingredient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(ingredientPayload),
  });
};

const removeIngredientFromRecipe = async (recipeId, ingredientPayload, uid) => {
  await fetch(`${clientCredentials.databaseURL}/recipes/${recipeId}/ingredient`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(ingredientPayload),
  });
};

const removeAllIngredients = async (recipeId, uid) => {
  await fetch(`${clientCredentials.databaseURL}/recipes/${recipeId}/remove-ingredients`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
  });
};

export { getIngredients, getSingleIngredient, addIngredientToRecipe, removeIngredientFromRecipe, removeAllIngredients };
