import React, { useEffect, useState } from 'react'
import API from '../../utils/api'
import { Button, Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Products() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await API.get('/api/products')
      setItems(res.data || [])
    } catch (e) {
      console.error(e)
    } finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await API.delete(`/api/admin/products/${id}`)
      setItems(items.filter(i => i._id !== id))
    } catch (e) { console.error(e) }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Products</Typography>
        <Button component={Link} to="/admin/products/new" variant="contained" sx={{ background: 'linear-gradient(90deg,#d4af37,#b8860b)', color: '#000' }}>New Product</Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#111' }}>
              <TableCell sx={{ color: 'gold', fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ color: 'gold', fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ color: 'gold', fontWeight: 700 }}>Stock</TableCell>
              <TableCell sx={{ color: 'gold', fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && items.map((p, idx) => (
              <TableRow key={p._id} hover sx={{ background: idx % 2 === 0 ? 'rgba(212,175,55,0.03)' : 'transparent', '&:hover': { background: 'rgba(212,175,55,0.08)' } }}>
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price?.toFixed?.(2) ?? p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/admin/products/${p._id}/edit`} size="small" variant="outlined" sx={{ color: 'gold', borderColor: 'gold', mr: 1 }}>Edit</Button>
                  <Button color="error" size="small" onClick={() => handleDelete(p._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  )
}
