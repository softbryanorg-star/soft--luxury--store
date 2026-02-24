import React, { useEffect, useState } from 'react'
import axios from '../../utils/api'
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import { Link } from 'react-router-dom'

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Orders</Typography>
        <Button variant="outlined" onClick={async () => {
          try {
            const resp = await axios.get('/api/admin/orders/export', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'orders.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          } catch (e) { console.error(e); alert('Export failed') }
        }}>Export CSV</Button>
      </Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#111' }}>
              <TableCell sx={{ color: 'gold', fontWeight: 700 }}>#</TableCell>
              <TableCell sx={{ color: 'gold', fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ color: 'gold', fontWeight: 700 }}>Total</TableCell>
              <TableCell sx={{ color: 'gold', fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ color: 'gold', fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((o, idx) => (
              <TableRow key={o._id} hover sx={{ background: idx % 2 === 0 ? 'rgba(212,175,55,0.03)' : 'transparent', '&:hover': { background: 'rgba(212,175,55,0.08)' } }}>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{o._id}</TableCell>
                <TableCell>{o.user?.email || 'Guest'}</TableCell>
                <TableCell>{o.totalAmount || '-'}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{o.status || 'n/a'}</TableCell>
                <TableCell>
                  <Button size="small" component={Link} to={`/admin/orders/${o._id}`} sx={{ color: 'gold', borderColor: 'gold' }} variant="outlined">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {/* Comment: expand order detail, status updates, and shipment integration as next steps. */}
    </Box>
  )
}
