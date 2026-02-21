import React from 'react'
import { Typography, Box, Paper } from '@mui/material'

// Admin Dashboard: lightweight overview. Keep minimal for now.
export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Overview</Typography>
      <Paper sx={{ p: 2 }}>
        <Typography>Welcome to the admin dashboard. Use the sidebar to manage products and orders.</Typography>
        {/* Comment for defense: This page can be extended to show charts, KPIs, and quick actions. */}
      </Paper>
    </Box>
  )
}
