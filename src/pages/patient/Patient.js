import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';
import Topbar from '../../components/Topbar';
import NavigationDrawer from './NavigationDrawer';

const drawerWidth = 240;

function Patient() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <Topbar handleDrawerToggle={handleDrawerToggle}/>
      <NavigationDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        
      </Box>
    </Box>
  );
}

export default Patient;