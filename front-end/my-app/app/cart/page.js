'use client';
import { useCart } from '../context/cartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="border-b p-4">
          <h2>{item.name}</h2>
          
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)} className="bg-red-500 px-2 py-1 text-white rounded-md">Remove</button>
        </div>
      ))}
      <button onClick={clearCart} className="bg-blue-500 px-4 py-2 mt-4 rounded-md text-white">Clear Cart</button>
    </div>
  );
}
