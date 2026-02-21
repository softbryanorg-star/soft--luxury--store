import React, { useEffect, useState } from 'react'
import axios from '../../utils/api'
import { Button, Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Products() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/products')
      setItems(res.data || [])
    } catch (e) {
      console.error(e)
    } finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await axios.delete(`/api/admin/products/${id}`)
      setItems(items.filter(i => i._id !== id))
    } catch (e) { console.error(e) }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Products</Typography>
        <Button component={Link} to="/admin/products/new" variant="contained">New Product</Button>
      </Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && items.map(p => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/admin/products/${p._id}/edit`} size="small">Edit</Button>
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
