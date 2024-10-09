'use client'

// app/customer/orders/page.js
import React, { useEffect, useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('userAuthToken')
    console.log(token)
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        setOrders(data);
        console.log(orders)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Your Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="bg-white p-4 shadow-md mb-4">
            <p><span className='mx-2 font-bold text-lg'>Order ID:</span> {order._id}</p>
            <p><span className='mx-2 font-bold text-lg'>Order Items:</span> {order.orderItems.map(item => (
              <div className='ml-28'>
                <p><span className='mx-2 font-bold text-lg'>Order Name</span>{item.name}</p>
                <p><span className='mx-2 font-bold text-lg'>Price</span>{item.price}</p>
              </div>))}</p>

          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
