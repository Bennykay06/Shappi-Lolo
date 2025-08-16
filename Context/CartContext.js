import React, { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if item with same id and size exists
      const existingIndex = prevItems.findIndex(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize
      );

      if (existingIndex !== -1) {
        // If item exists, increase the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += item.quantity;
        return updatedItems;
      }

      // Otherwise add new item
      return [...prevItems, item];
    });
  };

  // Remove an item from cart (optional, not used yet)
  const removeFromCart = (id, selectedSize) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      )
    );
  };

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
