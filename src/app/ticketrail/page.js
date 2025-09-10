'use client';

import { useState, useEffect } from 'react';
import { getOrders, getCompleteOrders, completeOrder, deleteCompletedOrder } from '../../utils/data/square_data';

export default function TicketRail() {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [completedOrders, setCompletedOrders] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);

  const clearCompletedData = () => {
    if (completedIds.length >= 10) {
      console.warn(completedIds[0]);
      deleteCompletedOrder(completedIds[0].order_id);
    }
  };

  const handleComplete = (order) => {
    completeOrder({ order_id: order.id });
    setCompletedOrders((prev) => [...prev, order]);
    clearCompletedData();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getOrders().then(setOrders);
      getCompleteOrders().then(setCompletedIds);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <title>Ticket Rail</title>
      <div>
        {orders?.map((order) => {
          if (completedIds?.some((completedId) => completedId.order_id === order.id)) {
            return '';
          }
          const itemNames = order.line_items.map((lineItem) => lineItem.name);
          const quantities = order.line_items.map((lineItem) => lineItem.quantity);
          return (
            <div key={order.id}>
              {itemNames.map((itemName, index) => (
                <p>
                  {quantities[index]}x {itemName}
                </p>
              ))}
              <button type="button" onClick={() => handleComplete(order)}>
                Completed
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
