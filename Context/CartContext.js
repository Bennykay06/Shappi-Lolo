import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
const CartContext = createContext();

const CART_STORAGE_KEY = '@cart_items';

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from AsyncStorage on app start
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Save cart to AsyncStorage whenever cartItems change
  useEffect(() => {
    if (!isLoading) {
      saveCartToStorage(cartItems);
    }
  }, [cartItems, isLoading]);

  const loadCartFromStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCartToStorage = async (items) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  };

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
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
