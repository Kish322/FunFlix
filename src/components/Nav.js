import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';  
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { useHistory, useLocation } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (value === 0) {
      history.push("/");
      scrollToTop();
    } else if (value === 1) {
      history.push("/genrecharts");
      scrollToTop();
    } 
  }, [value, history]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to top when the user navigates back to the same page
    if (location.pathname === history.location.pathname) {
      scrollToTop();
    }
  }, [location.pathname, history]);

  return (
    <Box sx={{ position: 'fixed', bottom: 5, height: 50, width: '100%', zIndex: 100, boxShadow: '5px -8px 10px rgba(0, 0, 0, 0.5)' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: "#462047" }} 
      > 
        <BottomNavigationAction
          style={{color: "white"}}
          label="Trending"
          icon={<WhatshotIcon sx={{ fontSize: 32 }} />}
          sx={{ fontSize: 16 }}
        />
        <BottomNavigationAction
          style={{color: "white"}}
          label="Genres"
          icon={<BarChartOutlinedIcon sx={{ fontSize: 32 }} />}
          sx={{ fontSize: 16 }}
        />     
      </BottomNavigation>
    </Box>
  );
}