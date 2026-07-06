// NEW: Payment success verification page
import React, { useEffect, useState, useRef } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useSearchParams, Link } from 'react-router-dom'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('reference')
  const [status, setStatus] = useState('idle') // 'verifying' | 'success' | 'failed' | 'missing'
  const lastRef = useRef(null)
  const API_BASE = import.meta.env.VITE_BASE_URL || ''

  useEffect(() => {
    if (!reference) {
      setStatus('missing')
      return
    }
    // prevent duplicate verification for same reference
    if (lastRef.current === reference) return
    lastRef.current = reference

    let mounted = true
    const controller = new AbortController()
    setStatus('verifying')

    ;(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/payments/verify/${encodeURIComponent(reference)}`, { signal: controller.signal })
        if (!mounted) return
        if (!res.ok) {
          setStatus('failed')
          return
        }
        const data = await res.json()
        // accept explicit verification flags from backend: { success: true } or { status: 'success' } or { verified: true }
        const ok = data?.success === true || data?.status === 'success' || data?.verified === true
        setStatus(ok ? 'success' : 'failed')
      } catch (err) {
        if (err.name === 'AbortError') return
        setStatus('failed')
      }
    })()

    return () => {
      mounted = false
      controller.abort()
    }
  }, [reference, API_BASE])

  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Box sx={{ maxWidth: 680, textAlign: 'center' }}>
        {status === 'missing' && (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>Missing payment reference</Typography>
            <Typography sx={{ mb: 2 }}>No payment reference was provided. If you were redirected here after payment, please contact support or try again.</Typography>
            <Button component={Link} to="/" variant="contained">Return Home</Button>
          </>
        )}

        {status === 'verifying' && (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>Verifying payment...</Typography>
            <Typography sx={{ mb: 2 }}>We are verifying your payment with our server. This may take a few seconds.</Typography>
          </>
        )}

        {status === 'success' && (
          <>
            <Typography variant="h4" sx={{ mb: 2, color: 'success.main' }}>Payment Successful</Typography>
            <Typography sx={{ mb: 2 }}>Thank you — your payment has been verified. You can view your orders or continue shopping.</Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
              <Button component={Link} to="/" variant="contained">Continue Shopping</Button>
              <Button component={Link} to="/track-order" variant="outlined">View Order / Track</Button>
            </Box>
          </>
        )}

        {status === 'failed' && (
          <>
            <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>Payment could not be verified</Typography>
            <Typography sx={{ mb: 2 }}>We could not verify your payment. If you were charged, please contact support with your payment reference.</Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
              <Button component={Link} to="/" variant="contained">Return Home</Button>
              <Button component={Link} to="/contact" variant="outlined">Contact Support</Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}
