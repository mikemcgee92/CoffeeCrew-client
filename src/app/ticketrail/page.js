'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOrders, getCompleteOrders, completeOrder, deleteCompletedOrder } from '../../utils/data/square_data';
import { getRecipes } from '../../utils/data/recipe_data';

export default function TicketRail() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const clearCompletedData = () => {
    if (completedIds.length >= 10) {
      deleteCompletedOrder(completedIds[0].order_id);
    }
  };

  const handleComplete = (order) => {
    completeOrder({ order_id: order.id });
    clearCompletedData();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getOrders().then(setOrders);
      getRecipes('').then(setRecipes);
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
                  {recipes?.some((recipe) => recipe.label === itemName) ? (
                    <button type="button" onClick={() => router.push(`/recipes/${recipes.find((recipe) => recipe.label === itemName).id}`)}>
                      Recipe
                    </button>
                  ) : (
                    ''
                  )}
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
