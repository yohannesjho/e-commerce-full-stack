'use client'
import React, { useEffect, useState } from 'react'

export default function Order() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('adminToken')
            console.log(token)
            if (token) {
                try {
                    const response = await fetch('http://localhost:5000/api/admin/orders/', {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Ensure token is not undefined
                            'Content-Type': 'application/json', // Optional, depending on your request
                          }
                      });
                      
                  
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  const data = await response.json();
                  setOrders(data);
                  
                } catch (error) {
                  console.error('Error fetching products:', error);
                }
              }
        }
        fetchOrders()

    }, [])

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/order/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete the order');
            }
            console.log('Order deleted:', response);
            setOrders(orders.filter(order => order._id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <table className='border w-full border-collapse px-6 '>
                <thead className='border'>
                    <tr className="border">
                        <th className='border'>User</th>
                        <th className='border'>Product</th>
                        <th className='border'>Delivery status</th>
                        <th className='border'>Actions</th>
                    </tr>
                </thead>
                <tbody className='border'>  
                    {orders.map((order)=>(
                       <tr className='space-x-2 border'>
                        <td className='border'>{order.user}</td>
                        <td className='border'>{order.orderItems.map((name)=>(<p>{name.name}</p>))}</td>
                        <td className='border'>{order.isDelivered?<span>True</span>:<span>False</span>}</td>
                        <td className='border'><button onClick={()=>handleDelete(order._id)} className='bg-red-500 px-2 py-1 rounded-md text-white hover:bg-red-300 duration-300'>Delete</button></td>
                       </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
