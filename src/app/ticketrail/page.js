'use client';

import { useState, useEffect } from 'react';
import getOrders from '../../utils/data/square_data';

export default function TicketRail() {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const handleComplete = (order) => {
    setCompletedOrders((prev) => [...prev, order]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getOrders().then(setOrders);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <title>Ticket Rail</title>
      <div>
        {orders?.map((order) => {
          if (completedOrders?.some((completed) => completed.id === order.id)) {
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
