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

const completeOrder = async (orderPayload) => {
  await fetch(`${clientCredentials.databaseURL}/completed-orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  });
};

const getCompleteOrders = async () => {
  const response = await fetch(`${clientCredentials.databaseURL}/completed-orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const deleteCompletedOrder = async (orderId) => {
  await fetch(`${clientCredentials.databaseURL}/completed-orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { getOrders, completeOrder, getCompleteOrders, deleteCompletedOrder };
