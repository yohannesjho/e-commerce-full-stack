// Cart context code with fixes
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component to wrap around the app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Retrieve cart from localStorage when the app loads
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []); // This runs once when the component mounts

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    const itemExists = cartItems.find(item => item.id === product.id);
    if (itemExists) {
      // If the item already exists, increase its quantity
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // If it's a new item, add it to the cart with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');  // Clear localStorage when cart is cleared
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
