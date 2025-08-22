import { clientCredentials } from '../client';

const getRecipes = async (optionalParams) => {
  const response = await fetch(`${clientCredentials.databaseURL}/recipes?${optionalParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export default getRecipes;
