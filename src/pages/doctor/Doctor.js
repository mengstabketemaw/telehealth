import * as React from 'react';
import { Alert, Avatar, Snackbar, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useLocation, NavLink } from "react-router-dom"
import Topbar from "../../components/Topbar"
import { Box, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { AccountBox, Article, Group, Home, Note, Schedule, VideoCall } from '@mui/icons-material';
import telehealthImg from '../../assets/images/Telehealth.png'
 
const drawerWidth = 240;

const SnackBarContext = React.createContext();
export const useSnackbar = () => React.useContext(SnackBarContext);

function Doctor() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, severity: "error", children: "this is error" });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <Topbar handleDrawerToggle={handleDrawerToggle} />
      <NavigationDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <SnackBarContext.Provider value={{ setSnackbar }}>
          <Outlet />
        </SnackBarContext.Provider>
        <Snackbar
          open={snackbar.open}
          onClose={e => setSnackbar({ ...snackbar, open: false })}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={e => setSnackbar({ ...snackbar, open: false })} />
        </Snackbar>
      </Box>
    </Box>
  );
}

const NavigationDrawer = ({ mobileOpen, handleDrawerToggle }) => {

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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#212944', padding: "0 0 0 10px" },
        }}
      >
        <DrawerTools />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#212944', padding: "0 0 0 10px" },
        }}
        open
      >
        <DrawerTools />
      </Drawer>
    </Box>

  </>)
}

function DrawerTools() {
  const { pathname } = useLocation();
  return (<>
   <Toolbar>
    
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >

    <Avatar alt="Travis Howard" src={telehealthImg} sx={{ margin: "15px", width: 130, height: 130 }} variant="rounded"/>
    <Typography variant="h4" sx={{ color: "#dbdee3"}}>Tele Health</Typography>
      </Stack>
      </Toolbar>
      <Divider style={{ background: 'white', margin: '20px'}} variant="middle"/>
    {
      ["Activity", "Office", "Home Doctor", "Schedule", "Therapy Group"].map((name, index) => {

        let urlname = name.toLocaleLowerCase().replace(" ", "").replaceAll(".", "");
        let color = pathname.includes(urlname) ? "#3490ec" : "#dbdee3";

        return (
          <NavLink key={index} to={urlname} style={{ color: "#dbdee3", textDecoration: "none", display: "flex" }}>
            <ListItem button >
              <ListItemIcon>
                {
                  name === "Activity" ? <Note sx={{ color }}/> :
                    name === "Office" ? <VideoCall sx={{ color }}/> :
                      name === "Schedule" ? <Schedule sx={{ color }}/> :
                        name === "Therapy Group" ? <Group sx={{ color }}/> :
                          <Home sx={{ color }}/>
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

<Divider style={{ background: 'white', margin: '20px'}} variant="middle"/>

    {
      ["Profile", "Blog"].map((name, index) => {
        let urlname = name.toLocaleLowerCase().replaceAll(" ", "").replaceAll(".", "");
        let color = pathname.includes(urlname) ? "#3490ec" : "#dbdee3";
        return (
          <NavLink key={index} to={urlname} style={{ color: "#dbdee3", textDecoration: "none", display: "flex" }}>
            <ListItem button>
              <ListItemIcon>
                {
                  name === "Profile" ? <AccountBox sx={{ color }}/> :
                    <Article sx={{ color }}/>
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

export default Doctor;