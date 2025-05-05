import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">HOME</Button>
            <Button color="inherit" component={Link} to="/exchange-rate">EXCHANGE RATES (LIVE)</Button>
            <Button color="inherit" component={Link} to="/not-found">ERROR PAGE</Button>
          </Toolbar>
        </AppBar>
      );
}

export default Header