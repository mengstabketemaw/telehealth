import * as React from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Accessible, AccountBox, Article, Dashboard, Folder, Groups, Help, Home, MonitorHeart, Schedule, VideoCall } from '@mui/icons-material';

const drawerWidth = 240;

const NavigationDrawer = ({mobileOpen,handleDrawerToggle}) =>{
  
    return (<>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerTools/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerTools/>
        </Drawer>
      </Box>
    
    </>)
}

function DrawerTools(){
    return (<>
    <Toolbar>
        <Typography>HealthCare</Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button>
            <ListItemIcon>
                <Dashboard/>
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <Schedule/>
            </ListItemIcon>
            <ListItemText primary={"Appointment"} />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <Groups/>
            </ListItemIcon>
            <ListItemText primary={"Therapy Group"} />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <Home/>
            </ListItemIcon>
            <ListItemText primary={"Home Doctor"} />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <VideoCall/>
            </ListItemIcon>
            <ListItemText primary={"V.D.T"} />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <Folder/>
            </ListItemIcon>
            <ListItemText primary={"Medical Record"} />
            </ListItem>
      </List>

      <Divider />
      
      <List>
        <ListItem button>
            <ListItemIcon>
                <Help/>
            </ListItemIcon>
            <ListItemText primary={"Apply For Help"} />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <AccountBox/>
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <Article/>
            </ListItemIcon>
            <ListItemText primary={"Blog"} />
        </ListItem>
      </List>
    
    </>)
}

export default NavigationDrawer;