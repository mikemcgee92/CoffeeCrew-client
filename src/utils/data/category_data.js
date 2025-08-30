import { clientCredentials } from '../client';

const getCategories = async () => {
  const response = await fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const getSingleCategory = async (id) => {
  const response = await fetch(`${clientCredentials.databaseURL}/categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const createCategory = async (category, uid) => {
  const response = await fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(category),
  });
  return response.json();
};

const updateCategory = async (id, newLabel, uid) => {
  const response = await fetch(`${clientCredentials.databaseURL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(newLabel),
  });
  return response.json();
};

const deleteCategory = async (id, uid) => {
  await fetch(`${clientCredentials.databaseURL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
  });
};

export { getCategories, getSingleCategory, createCategory, deleteCategory, updateCategory };
