import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, AppBar, Typography } from '@mui/material'

// AdminLayout: simple two-column layout with a sidebar for admin pages.
export default function AdminLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1200 }}>
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: 220, [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box', top: 64 } }}>
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin">
              <ListItemText primary="Overview" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/products">
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/orders">
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: '220px' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
