'use client';

import { useState, useEffect } from 'react';
import getOrders from '../../utils/data/square_data';

export default function TicketRail() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return <div>{orders?.map((order, index) => order.line_items[index].name)}e</div>;
}
