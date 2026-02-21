import React, { useEffect, useState } from 'react'
import axios from '../../utils/api'
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('/api/admin/orders')
        setOrders(res.data || [])
      } catch (e) { console.error(e) }
    }
    fetch()
  }, [])

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Orders</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(o => (
              <TableRow key={o._id}>
                <TableCell>{o._id}</TableCell>
                <TableCell>{o.user?.email || 'Guest'}</TableCell>
                <TableCell>{o.total || '-'}</TableCell>
                <TableCell>{o.status || 'n/a'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {/* Comment: expand order detail, status updates, and shipment integration as next steps. */}
    </Box>
  )
}
