const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;

const getCategories = async () => {
  const response = await fetch(`${dbURL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const createCategory = async (category) => {
  const response = await fetch(`${dbURL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  return response.json();
};

export { getCategories, createCategory };
