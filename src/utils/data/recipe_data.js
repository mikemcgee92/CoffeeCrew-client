import { clientCredentials } from '../client';

const getRecipes = async (optionalParams) => {
  const response = await fetch(`${clientCredentials.databaseURL}/recipes${optionalParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json(); // 200
};

const getSingleRecipe = async (id) => {
  const response = await fetch(`${clientCredentials.databaseURL}/recipes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json(); // 200
};

const createRecipe = async (newRecipe) => {
  const response = await fetch(`${clientCredentials.databaseURL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  });
  return response.json(); // 201
};

const updateRecipe = async (id, payload) => {
  await fetch(`${clientCredentials.databaseURL}/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }); // 204
};

const deleteRecipe = async (id) => {
  await fetch(`${clientCredentials.databaseURL}/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { getRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe };
