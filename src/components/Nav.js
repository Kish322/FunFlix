import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navigation() {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (route) => {
    history.push(route);
    handleMenuClose();
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Scroll to top when the user navigates back to the same page
    if (location.pathname === history.location.pathname) {
      scrollToTop();
    }
  }, [location.pathname, history]);

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
        sx={{
          position: 'fixed',
          top: 15,
          left: 40,
          zIndex: 100,
          padding: '10px',
          '@media (max-width: 600px)': {
            padding: '6px',
            left: 20,
            top: 10,
          },
        }}
      >
        <MenuIcon sx={{
          fontSize: 60,
          '@media (max-width: 300px)': {
            fontSize: 10,
          },
          '@media (max-width: 600px)': {
            fontSize: 40,
          }
        }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('/')}>Popular</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/genrecharts')}>
          Genres
        </MenuItem>
      </Menu>
    </>
  );
}