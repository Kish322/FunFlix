import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';  
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search'; 
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { useHistory } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) 
      history.push("/");
    else if (value === 1) 
      history.push("/genrecharts");
    else if (value === 2) 
      history.push("/search");
  }, [value, history]);

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
        <BottomNavigationAction
          style={{color: "white"}}
          label="Search"
          icon={<SearchIcon sx={{ fontSize: 32 }} />}
          sx={{ fontSize: 16 }}
        />
      </BottomNavigation>
    </Box>
  );
}