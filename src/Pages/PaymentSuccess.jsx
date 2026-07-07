import React, { useEffect, useState, useRef } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useSearchParams, Link } from 'react-router-dom'

// Use the shared API instance used throughout the application
import API, { API_BASE } from '../utils/api'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('reference')

  const [status, setStatus] = useState('idle')

  const lastRef = useRef(null)

  // Debug
  console.log('API_BASE =', API_BASE)

  useEffect(() => {
    if (!reference) {
      setStatus('missing')
      return
    }

    if (lastRef.current === reference) return
    lastRef.current = reference

    let mounted = true

    setStatus('verifying')

    ;(async () => {
      try {
        const endpoint = `/api/payments/verify/${encodeURIComponent(reference)}`

        console.log('Verification endpoint =', `${API_BASE}${endpoint}`)

        const { data } = await API.get(endpoint)

        if (!mounted) return

        console.log('Verify payment response:', data)

        const ok =
          data?.ok === true ||
          data?.success === true ||
          data?.status === 'success' ||
          data?.verified === true

        setStatus(ok ? 'success' : 'failed')
      } catch (err) {
        console.error(
          'Verification request error:',
          err?.response?.data || err.message || err
        )

        if (mounted) {
          setStatus('failed')
        }
      }
    })()

    return () => {
      mounted = false
    }
  }, [reference])

  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: 680, textAlign: 'center' }}>
        {status === 'missing' && (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Missing payment reference
            </Typography>

            <Typography sx={{ mb: 2 }}>
              No payment reference was provided. If you were redirected here after
              payment, please contact support or try again.
            </Typography>

            <Button component={Link} to="/" variant="contained">
              Return Home
            </Button>
          </>
        )}

        {status === 'verifying' && (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Verifying payment...
            </Typography>

            <Typography sx={{ mb: 2 }}>
              We are verifying your payment. This usually takes only a few
              seconds.
            </Typography>
          </>
        )}

        {status === 'success' && (
          <>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                color: 'success.main',
              }}
            >
              Payment Successful
            </Typography>

            <Typography sx={{ mb: 2 }}>
              Thank you! Your payment has been verified successfully.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                mt: 2,
              }}
            >
              <Button component={Link} to="/" variant="contained">
                Continue Shopping
              </Button>

              <Button component={Link} to="/track-order" variant="outlined">
                View Order / Track
              </Button>
            </Box>
          </>
        )}

        {status === 'failed' && (
          <>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                color: 'error.main',
              }}
            >
              Payment could not be verified
            </Typography>

            <Typography sx={{ mb: 2 }}>
              We could not verify your payment. If you were charged, please
              contact support with your payment reference.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                mt: 2,
              }}
            >
              <Button component={Link} to="/" variant="contained">
                Return Home
              </Button>

              <Button component={Link} to="/contact" variant="outlined">
                Contact Support
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}