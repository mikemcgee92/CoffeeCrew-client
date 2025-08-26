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

export { getIngredients, getSingleIngredient };
