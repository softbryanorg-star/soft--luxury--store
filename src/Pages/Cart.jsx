import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const onIncrease = (id, current) => updateQuantity(id, current + 1);
  const onDecrease = (id, current) => updateQuantity(id, Math.max(0, current - 1));

  if (!cart || cart.length === 0) {
    return (
      <Box sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h4">Your cart is empty</Typography>
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>Explore our collection and add something beautiful.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Your Cart</Typography>
      <List>
        {cart.map(item => (
          <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="img" src={item.image} alt={item.name} sx={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 1, mr: 2 }} />
            <ListItemText
              primary={item.name}
              secondary={
                <>
                  <Typography component="span">${item.price} × {item.quantity}</Typography>
                  {item.selectedSize ? <Typography component="span" sx={{ display: 'block' }}>Size: {item.selectedSize}</Typography> : null}
                </>
              }
            />
            <IconButton onClick={() => onDecrease(item.id, item.quantity)}><RemoveIcon /></IconButton>
            <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
            <IconButton onClick={() => onIncrease(item.id, item.quantity)}><AddIcon /></IconButton>
            <IconButton edge="end" color="error" onClick={() => removeFromCart(item.id)} sx={{ ml: 2 }}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Total: ${getCartTotal().toFixed(2)}</Typography>
        <Button variant="contained" color="primary" component={Link} to="/Checkout">Checkout</Button>
      </Box>
    </Box>
  );
};

export default Cart;
