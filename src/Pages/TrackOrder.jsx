import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../utils/api'
import { Box, TextField, Button, Typography, Paper } from '@mui/material'

export default function TrackOrder(){
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState(null)
  const location = useLocation()

  useEffect(() => {
    // Prefill from navigation state (e.g., from Checkout 'Track Last Order' button)
    if (location?.state) {
      const { orderId: sId, email: sEmail } = location.state
      if (sId) setOrderId(sId)
      if (sEmail) setEmail(sEmail)
      // auto-submit when both present
      if (sId && sEmail) setTimeout(() => submit(), 300)
    }
  }, [location])

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
The Track Order page allows customers to check the status 
of their order at any time without logging in.

They simply enter their order ID and the email they used during checkout.
The system securely fetches the order from the server 
and displays its current status and progress.

The Track Order page lets users securely check order progress using their order ID and email.
The data is always fetched from the backend and rendered conditionally.
A visual timeline shows the order’s current stage in the delivery process.











optional  iproveemts
 Add rate limiting
5 attempts per minute per IP
 Partial masking
john****@gmail.com
 Tracking link emails
/track?ref=ORDER123




You are a senior backend security engineer working on a MERN e-commerce app.

TASK:
Harden the "Track Order" feature with industry-standard security while keeping it usable for guest users.

IMPLEMENT THE FOLLOWING CHANGES CAREFULLY:

--------------------------------
1️⃣ RATE LIMITING (CRITICAL)
--------------------------------
- Add rate limiting to the POST /api/orders/track endpoint
- Limit: 5 attempts per minute per IP address
- Use express-rate-limit
- On limit exceeded, return:
  Status: 429
  Message: "Too many attempts. Please try again later."

- Apply rate limiting ONLY to the tracking route, not globally.

--------------------------------
2️⃣ PARTIAL EMAIL MASKING
--------------------------------
- When returning order data to the frontend:
  - Mask the customer's email before sending it
  - Example:
    johnsmith@gmail.com → john****@gmail.com
    ab@yahoo.com → ab****@yahoo.com

- Implement a reusable helper function:
  maskEmail(email)

- Ensure the full email is NEVER exposed in API responses.

--------------------------------
3️⃣ SECURE TRACKING LINK (REFERENCE-BASED)
--------------------------------
- Add a new field to Order schema:
  trackingToken (string, unique, random)

- Generate trackingToken when order is created:
  - crypto.randomBytes(16).toString('hex')

- Support tracking via:
  GET /api/orders/track?ref=TRACKING_TOKEN

- Validation rules:
  - If ref exists → track by token
  - Else → fallback to orderId + email
  - ref tracking should NOT require email input

--------------------------------
4️⃣ EMAIL TRACKING LINK
--------------------------------
- On successful order creation:
  - Send an email to the customer
  - Include a tracking link:
    https://FRONTEND_URL/track-order?ref=TRACKING_TOKEN

- Stub email logic if email service is unavailable
- Clearly comment where real email service (SendGrid / Nodemailer) would go

--------------------------------
5️⃣ FRONTEND INTEGRATION NOTES
--------------------------------
- Update TrackOrder.jsx logic:
  - If ref exists in URL query → auto-fetch order
  - Hide email + orderId inputs when ref is present
  - Show masked email returned from backend

--------------------------------
6️⃣ SECURITY GUARANTEES (DO NOT SKIP)
--------------------------------
- Prevent enumeration attacks
- Prevent brute force guessing
- Ensure timing-safe comparisons
- Never leak whether an order exists or not
- Return generic error messages:
  "Unable to find order"

--------------------------------
7️⃣ CODE QUALITY
--------------------------------
- Add clear comments explaining security decisions
- Keep logic readable
- Do not over-engineer
- Follow existing project structure

IMPORTANT:
Do NOT break existing checkout or payment flow.
All changes must be backward compatible.
*/
