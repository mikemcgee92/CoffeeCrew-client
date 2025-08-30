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

const createRecipe = async (newRecipe, uid) => {
  const response = await fetch(`${clientCredentials.databaseURL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(newRecipe),
  });
  return response.json(); // 201
};

const updateRecipe = async (id, payload, uid) => {
  await fetch(`${clientCredentials.databaseURL}/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(payload),
  }); // 204
};

const deleteRecipe = async (id, uid) => {
  await fetch(`${clientCredentials.databaseURL}/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
  }); // 204
};

export { getRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe };
