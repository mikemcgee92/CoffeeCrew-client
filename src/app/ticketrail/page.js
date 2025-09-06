'use client';

import { useState, useEffect } from 'react';
import getOrders from '../../utils/data/square_data';

export default function TicketRail() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.warn(interval);
      getOrders().then(setOrders);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {orders?.map((order) => {
        const itemNames = order.line_items.map((lineItem) => lineItem.name);
        return itemNames;
      })}
    </div>
  );
}
