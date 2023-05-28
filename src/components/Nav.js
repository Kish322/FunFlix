import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieIcon from '@mui/icons-material/Movie';  
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search'; 
import TvIcon from '@mui/icons-material/Tv'; 

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', height: 70, zIndex: 100, boxShadow: '25px -7px 10px rgba(0, 0, 0, 0.5)'}}>
      <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      > 
      <BottomNavigationAction
          style={{color: "black"}}
          label="Trending"
          icon={<WhatshotIcon sx={{ fontSize: 32 }} />}
          sx={{ fontSize: 16 }}
        />
        <BottomNavigationAction
          style={{color: "black"}}
          label="Movies"
          icon={<MovieIcon sx={{ fontSize: 32 }} />}
          sx={{ fontSize: 16 }}
        />
        <BottomNavigationAction
          style={{color: "black"}}
          label="TV Series"
          icon={<TvIcon sx={{ fontSize: 32 }} />}
          sx={{ fontSize: 16 }}
        />
        <BottomNavigationAction
          style={{color: "black"}}
          label="Search"
          icon={<SearchIcon sx={{ fontSize: 32 }} />}
          sx={{ fontSize: 16 }}
        />
      </BottomNavigation>
    </Box>
  );
}