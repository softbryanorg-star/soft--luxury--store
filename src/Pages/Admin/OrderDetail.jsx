import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../utils/api'
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Button } from '@mui/material'

export default function OrderDetail(){
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/orders/${id}`)
        setOrder(res.data)
        setStatus(res.data.status || 'pending')
      }catch(e){ console.error(e) }
    }
    fetch()
  },[id])

  const saveStatus = async ()=>{
    try{
      const res = await axios.put(`/api/admin/orders/${id}/status`, { status })
      setOrder(res.data)
      alert('Status updated')
    }catch(e){ console.error(e); alert('Failed to update') }
  }

  if(!order) return <Typography>Loading...</Typography>

  return (
    <Box>
      <Typography variant="h5">Order {order._id}</Typography>
      <Paper sx={{ p:2, mt:2 }}>
        <Typography>Customer: {order.user?.email || 'Guest'}</Typography>
        <Typography>Total: {order.totalAmount}</Typography>
        <Box sx={{ mt:2 }}>
          <Typography>Status</Typography>
          <Select value={status} onChange={e=>setStatus(e.target.value)} sx={{ minWidth:200 }}>
            <MenuItem value="pending">pending</MenuItem>
            <MenuItem value="processing">processing</MenuItem>
            <MenuItem value="shipped">shipped</MenuItem>
            <MenuItem value="completed">completed</MenuItem>
            <MenuItem value="cancelled">cancelled</MenuItem>
          </Select>
          <Button variant="contained" sx={{ ml:2 }} onClick={saveStatus}>Save</Button>
        </Box>

        <Box sx={{ mt:3 }}>
          <Typography variant="h6">Items</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(order.items || []).map(it=> (
                <TableRow key={it.productId || Math.random()}>
                  <TableCell>{it.productSnapshot?.name || 'Unknown'}</TableCell>
                  <TableCell>{it.quantity}</TableCell>
                  <TableCell>{it.unitPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
      {/* Comment: In production add shipment tracking number, timeline, and notifications. */}
    </Box>
  )
}
