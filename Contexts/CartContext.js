const addToCart = (newItem) => {
  setCartItems(prevItems => {
    // Check for existing item with identical customizations
    const existingItemIndex = prevItems.findIndex(item => 
      item.name === newItem.name &&
      JSON.stringify(item.customization) === JSON.stringify(newItem.customization)
    );
    
    if (existingItemIndex >= 0) {
      // If exists, increment quantity
      const updatedItems = [...prevItems];
      updatedItems[existingItemIndex].quantity += 1;
      return updatedItems;
    }
    
    // Otherwise add new item
    return [...prevItems, newItem];
  });
};