import * as React from 'react';
import {useLocation,NavLink} from "react-router-dom"
import { Box, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { AccountBox, Article, Dashboard, Folder, Groups, Help, Home, Schedule, VideoCall } from '@mui/icons-material';

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
    const {pathname} = useLocation();
    return (<>
    <Toolbar>
        <Typography>HealthCare</Typography>
      </Toolbar>
      <Divider />
    {
        ["Dashboard","Appointment","Therapy Group","V.D.T","Medical Record"].map((name,index)=>{

            let urlname = name.toLocaleLowerCase().replace(" ","").replaceAll(".","");
            let color = pathname.includes(urlname)?"primary":"";

            return (
            <NavLink key={index} to={urlname} style={{color:"inherit",textDecoration:"none", display:"flex"}}>
              <ListItem button >
                  <ListItemIcon>
                      {
                          name==="Dashboard"?<Dashboard color = {color}/>:
                          name==="Appointment"?<Schedule color = {color}/>:
                          name==="Therapy Group"?<Groups color = {color}/>:
                          name==="V.D.T"?<VideoCall color = {color}/>:
                          <Folder color = {color}/>
                      }
                  </ListItemIcon>
                  <ListItemText>
                          <Typography color={color}>{name}</Typography>
                  </ListItemText>
              </ListItem>
           </NavLink>
            )
        })
    }

      <Divider />
      
      {
        ["Apply For Help","Profile","Blog"].map((name,index)=>{
          let urlname = name.toLocaleLowerCase().replaceAll(" ","").replaceAll(".","");
          let color = pathname.includes(urlname)?"primary":"";
            return (
            <NavLink key={index} to={urlname} style={{color:"inherit",textDecoration:"none", display:"flex"}}>
            <ListItem button>
                <ListItemIcon>
                    {
                        name==="Apply For Help"?<Help color = {color}/>:
                        name==="Profile"?<AccountBox color = {color}/>:
                        <Article color = {color}/>
                    }
                </ListItemIcon>
                <ListItemText>
                  <Typography color={color}>{name}</Typography>
                </ListItemText>
            </ListItem>
            </NavLink>
            )
        })
    }
    
    </>)
}

export default NavigationDrawer;