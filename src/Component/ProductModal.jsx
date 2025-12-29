import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const defaultSizes = ['XS','S','M','L','XL','XXL'];

const ProductModal = ({ open, onClose, product, onAdd }) => {
  const [size, setSize] = useState(product?.selectedSize || 'M');

  // update local size when product changes
  React.useEffect(() => {
    setSize(product?.selectedSize || 'M');
  }, [product]);

  if (!product) return null;

  const sizes = product.sizes && product.sizes.length ? product.sizes : defaultSizes;

  const handleAdd = () => {
    const prodWithSize = { ...product, selectedSize: size };
    onAdd && onAdd(prodWithSize);
    onClose && onClose();
  };

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Box sx={{ flex: '0 0 220px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>{product.description || 'A beautiful piece from our collection.'}</Typography>
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>${product.price}</Typography>

            <FormControl fullWidth>
              <InputLabel id="size-label">Size</InputLabel>
              <Select
                labelId="size-label"
                label="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {sizes.map(s => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleAdd} color="primary">Add to cart</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
