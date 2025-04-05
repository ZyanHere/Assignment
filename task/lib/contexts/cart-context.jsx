"use client";
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const generateCartId = (product) => {
    return `${product.id}-${product.price}-${product.name}`.replace(/\s+/g, '-');
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.cartId === generateCartId(product));
      if (existing) return prev;
      
      return [...prev, {
        ...product,
        cartId: generateCartId(product),
        quantity: 1
      }];
    });
  };

  const updateQuantity = (cartId, amount) => {
    setCart(prev => prev.map(item => 
      item.cartId === cartId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    ));
  };

  const removeItem = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);