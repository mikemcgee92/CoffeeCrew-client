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

const createIngredient = async (ingredient, uid) => {
  const response = await fetch(`${clientCredentials.databaseURL}/ingredients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(ingredient),
  });
  return response.json();
};

const updateIngredient = async (id, newLabel, uid) => {
  await fetch(`${clientCredentials.databaseURL}/ingredients/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(newLabel),
  });
};

const deleteIngredient = async (id, uid) => {
  await fetch(`${clientCredentials.databaseURL}/ingredients/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
  });
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

export { getIngredients, getSingleIngredient, createIngredient, updateIngredient, deleteIngredient, addIngredientToRecipe, removeIngredientFromRecipe, removeAllIngredients };
