'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../context/cartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }



  return (
    <div>
      <h1 className="text-2xl mb-4">Your Cart</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4'>
        {cartItems.map((item) => (
          <div key={item.id} className="border-b p-4">
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)} className="bg-red-500 px-2 py-1 text-white rounded-md">Remove</button>
          </div>
        ))}
      </div>
      <div className='my-4 flex justify-between items-center space-x-8'>
        <p className='bg-yellow-500 px-4 py-2 rounded-md '> Total Price: ${totalPrice.toFixed(2)}</p>
        <button className='bg-green-500 hover:bg-green-300 duration-300  px-4 py-2 mt-4 rounded-md text-white'>Proceed to checkout</button>
        <button onClick={clearCart} className="bg-blue-500 hover:bg-blue-300 duration-300 px-4 py-2 mt-4 rounded-md text-white">Clear Cart</button>
      </div>
    </div>
  );
}

