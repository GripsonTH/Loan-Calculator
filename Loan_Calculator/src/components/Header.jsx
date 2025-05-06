import {
    AppBar, Toolbar, IconButton, Typography, Drawer,
    List, ListItem, ListItemText, Box, Button
  } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  import ThemeToggle from './ThemeToggle';
  import React, {useState} from 'react'
  import { Link } from 'react-router-dom';
  
  const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>Loan Calculator</Typography>
        <List>
          <ListItem button component={Link} to="/" sx={{ color: '#fff', mr:10 }}><ListItemText primary="Home" /></ListItem>
          <ListItem button component={Link} to="/exchange-rate" sx={{ color: '#fff',mr:3 }}><ListItemText primary="Exchange Rates (Live)" /></ListItem>
          <ListItem button component={Link} to="/about" sx={{ color: '#fff' }}><ListItemText primary="About" /></ListItem>
        </List>
      </Box>
    );
  
    return (
      <>
        <AppBar component="nav" position="static">
          <Toolbar>
            {/* Hamburger icon on mobile */}
            <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>Loan Calculator</Typography>
            {/* Desktop nav links */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button component={Link} to="/" sx={{ color: '#fff' }}>Home</Button>
            <Button component={Link} to="/exchange-rate" sx={{ color: '#fff' }}>Exchange Rates (Live)</Button>
            <Button component={Link} to="/about" sx={{ color: '#fff' }}>About</Button>
            </Box>
            {/* Theme toggle (optional on desktop) */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <ThemeToggle />
            </Box>
          </Toolbar>
        </AppBar>
        {/* Drawer for mobile */}
        <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
      </>
    );
  };
  
  export default Header;
  