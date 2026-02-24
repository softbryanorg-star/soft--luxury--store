import React, { useState } from 'react'
import axios from '../utils/api'
import { Box, TextField, Button, Typography, Paper } from '@mui/material'

export default function TrackOrder(){
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState(null)

  const submit = async ()=>{
    try{
      const res = await axios.post('/api/orders/track', { orderId, email })
      setOrder(res.data)
    }catch(e){
      console.error(e)
      alert(e.response?.data?.error || 'Failed to fetch')
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5">Track Order</Typography>
        <TextField fullWidth label="Order ID" value={orderId} onChange={e=>setOrderId(e.target.value)} sx={{ my:1 }} />
        <TextField fullWidth label="Email used" value={email} onChange={e=>setEmail(e.target.value)} sx={{ my:1 }} />
        <Button variant="contained" onClick={submit}>Track</Button>
      </Paper>

      {order && (
        <Paper sx={{ p:2, mt:2 }}>
          <Typography variant="h6">Order {order._id}</Typography>
          <Typography>Status: {order.status}</Typography>
          <Typography>Created: {new Date(order.createdAt).toLocaleString()}</Typography>
          <Box sx={{ mt:2 }}>
            <Typography variant="subtitle1">Items</Typography>
            {order.items.map(it=> (
              <Box key={it.productId} sx={{ borderBottom: '1px solid #eee', py:1 }}>
                <Typography>{it.productSnapshot?.name || 'Item' } — {it.quantity} × {it.unitPrice}</Typography>
              </Box>
            ))}
          </Box>

          {/* Improved Timeline */}
          <Box sx={{ mt:3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Timeline</Typography>
            {(() => {
              const steps = ['pending','paid','processing','shipped','fulfilled','completed']
              const active = steps.indexOf(order.status) >= 0 ? steps.indexOf(order.status) : 0
              return (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                  {steps.map((s, i) => (
                    <Box key={s} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: i <= active ? 'gold' : '#ddd',
                        boxShadow: i <= active ? '0 0 6px rgba(212,175,55,0.4)' : 'none'
                      }} />
                      <Typography sx={{ fontSize: 12, color: i <= active ? 'black' : '#666', textTransform: 'capitalize' }}>{s}</Typography>
                      {i < steps.length - 1 && <Box sx={{ width: 30, height: 2, background: i < active ? 'gold' : '#eee', mx:1 }} />}
                    </Box>
                  ))}
                </Box>
              )
            })()}
          </Box>
        </Paper>
      )}
    </Box>
  )
}

/*
How to surface the Track Order page in your UI (for demo/defense):

- Add a link/button in the main Nav to `/track-order` so users can access it globally. For example, in `src/Component/Nav.jsx` add: { label: 'Track Order', to: '/track-order' } to `baseLinks`.
- From the order confirmation page (after a successful checkout), redirect users to `/track-order` and prefill `orderId` and `email` by appending them to the URL or moving them into state.

Example quick button (place where you show order confirmation):
<Button component={Link} to="/track-order">Track Your Order</Button>

This comment is intentionally left here for your defense presentation so you can point to the exact file and explain where to add the entry point for tracking.
*/
