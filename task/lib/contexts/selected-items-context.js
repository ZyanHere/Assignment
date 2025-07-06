"use client";
import { createContext, useContext, useState } from "react";

const SelectedItemsContext = createContext();

export const SelectedItemsProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const addToCart = (item) => {
    setSelectedItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setSelectedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setSelectedItems([]);
  };

  const getCartTotal = () => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <SelectedItemsContext.Provider value={{ 
      selectedItems, 
      setSelectedItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </SelectedItemsContext.Provider>
  );
};

export const useSelectedItems = () => useContext(SelectedItemsContext);
