// lib/context/CartContext.js
"use client";
import { createContext, useContext, useReducer } from "react";


//Initial state
const initialState = {
  items: [],
  itemsCount: 0,
};

// Actions
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"; 
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const CLEAR_CART = "CLEAR_CART";

// Reducer function
// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        
        return {
          ...state,
          items: updatedItems,
          itemCount: state.itemCount + 1,
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          itemCount: state.itemCount + 1,
        };
      }
    }
    
    case REMOVE_FROM_CART: {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      const quantity = itemToRemove ? itemToRemove.quantity : 0;
      
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        itemCount: state.itemCount - quantity,
      };
    }
    
    case UPDATE_QUANTITY: {
      const { id, amount } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      
      if (itemIndex === -1) return state;
      
      const item = state.items[itemIndex];
      const newQuantity = Math.max(1, item.quantity + amount);
      const quantityDiff = newQuantity - item.quantity;
      
      const updatedItems = [...state.items];
      updatedItems[itemIndex] = {
        ...item,
        quantity: newQuantity,
      };
      
      return {
        ...state,
        items: updatedItems,
        itemCount: state.itemCount + quantityDiff,
      };
    }
    
    case CLEAR_CART:
      return initialState;
      
    default:
      return state;
  }
}

//create context
const CartContext = createContext();

// CartProvider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);


  //actions
  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };
  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  };
  const updateQuantity = (id, amount) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { productId, amount } });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount: state.itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the CartContext
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}