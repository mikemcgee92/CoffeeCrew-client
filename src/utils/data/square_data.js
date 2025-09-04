import { clientCredentials } from '../client';

const getOrders = async () => {
  const response = await fetch(`${clientCredentials.databaseURL}/square/orders/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export default getOrders;
