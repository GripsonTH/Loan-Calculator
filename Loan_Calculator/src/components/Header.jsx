import {
    AppBar, Toolbar, IconButton, Typography, Drawer,
    List, ListItem, ListItemText, Box
  } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  import ThemeToggle from './ThemeToggle';
  import React, {useState} from 'react'
  
  const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>Loan Calculator</Typography>
        <List>
          <ListItem button><ListItemText primary="Home" /></ListItem>
          <ListItem button><ListItemText primary="About" /></ListItem>
        </List>
      </Box>
    );
  
    return (
      <>
        <AppBar component="nav" position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>Loan Calculator</Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <ThemeToggle />
            </Box>
          </Toolbar>
        </AppBar>
  
        <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
      </>
    );
  };
  
  export default Header;
  