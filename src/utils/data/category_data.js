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

const createCategory = async (category) => {
  const response = await fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  return response.json();
};

const deleteCategory = async (id) => {
  await fetch(`${clientCredentials.databaseURL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { getCategories, createCategory, deleteCategory };
