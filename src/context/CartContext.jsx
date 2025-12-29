import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      // derive a stable key when product.id is missing
      const sizePart = product.selectedSize ? `-${product.selectedSize}` : '';
      const derivedId = product.id ?? `${(product.name || 'item').toString().replace(/\s+/g, '_')}-${product.price ?? '0'}${sizePart}`;
      const existingItem = prevCart.find(item => (item.id && product.id && item.id === product.id && (item.selectedSize === product.selectedSize || !product.selectedSize)) || item._derivedId === derivedId);
      if (existingItem) {
        return prevCart.map(item =>
          (item.id && product.id && item.id === product.id) || item._derivedId === derivedId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // attach derived id to keep track
      return [...prevCart, { ...product, quantity: 1, _derivedId: derivedId, id: product.id ?? derivedId }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId && item._derivedId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        (item.id === productId || item._derivedId === productId)
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};