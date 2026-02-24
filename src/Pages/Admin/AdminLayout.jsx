import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, AppBar, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

// AdminLayout: two-column responsive layout with styled admin navbar and sidebar
export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleDrawer = () => setMobileOpen(v => !v)

  const drawerPaperSx = {
    width: 220,
    boxSizing: 'border-box',
    top: 64,
    background: '#000',
    color: 'gold',
    borderRight: '1px solid rgba(255, 215, 0, 0.15)'
  }

  const sidebar = (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/admin">
          <ListItemText primary="Overview" sx={{ color: 'gold' }} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/admin/products">
          <ListItemText primary="Products" sx={{ color: 'gold' }} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/admin/orders">
          <ListItemText primary="Orders" sx={{ color: 'gold' }} />
        </ListItemButton>
      </ListItem>
    </List>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1200, background: '#000', boxShadow: '0 0 20px rgba(255, 215, 0, 0.25)', borderBottom: '1px solid rgba(255, 215, 0, 0.3)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            component={Link}
            to="/admin"
            style={{ textDecoration: 'none', color: 'gold', fontFamily: "'Cinzel', serif", fontWeight: 700, letterSpacing: '2px' }}
          >
            SOFT LUXURY - ADMIN
          </Typography>

          <IconButton onClick={toggleDrawer} sx={{ color: 'gold', display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Permanent drawer on md+, temporary on mobile */}
      <Drawer
        variant="permanent"
        sx={{ display: { xs: 'none', md: 'block' }, [`& .MuiDrawer-paper`]: drawerPaperSx }}
        open
      >
        <Toolbar />
        {sidebar}
      </Drawer>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{ sx: { ...drawerPaperSx, width: '75%' } }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
          <Typography sx={{ color: 'gold', fontFamily: "'Cinzel', serif", fontWeight: 700 }}>MENU</Typography>
          <IconButton onClick={toggleDrawer} sx={{ color: 'gold' }}><CloseIcon /></IconButton>
        </Toolbar>
        {sidebar}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: { md: '220px' } }}>
        <Outlet />
      </Box>
    </Box>
  )
}
