import React, { useState, useEffect } from 'react'
import axios from '../../utils/api'
import { Box, TextField, Button, Typography, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', description: '', price: 0, stock: 0, sku: '' })

  useEffect(() => {
    if (!id || id === 'new') return
    axios.get(`/api/products/${id}`).then(res => setForm(res.data)).catch(() => {})
  }, [id])

  const save = async () => {
    try {
      if (id === 'new') {
        await axios.post('/api/admin/products', { ...form })
      } else {
        await axios.put(`/api/admin/products/${id}`, { ...form })
      }
      navigate('/admin/products')
    } catch (e) {
      console.error(e)
      alert('Failed to save')
    }
  }

  return (
    <Box>
      <Typography variant="h5">{id === 'new' ? 'Create' : 'Edit'} Product</Typography>
      <Paper sx={{ p: 2, mt: 2 }}>
        <TextField fullWidth label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} sx={{ mb: 2 }} />
        <TextField fullWidth label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} sx={{ mb: 2 }} />
        <TextField fullWidth label="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} sx={{ mb: 2 }} />
        <TextField fullWidth label="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} sx={{ mb: 2 }} />
        <TextField fullWidth label="SKU" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={save}>Save</Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </Box>
      </Paper>
      {/* Comment for defense: form is minimal; in production add validation, image uploads, and attribute handling. */}
    </Box>
  )
}
