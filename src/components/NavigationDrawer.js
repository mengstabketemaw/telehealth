import * as React from "react"
import { useLocation, NavLink } from "react-router-dom"
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import {
  AccountBox,
  Article,
  Dashboard,
  Folder,
  Groups,
  Help,
  Home,
  Medication,
  Schedule,
  VideoCall,
} from "@mui/icons-material"
import telehealthImg from "../assets/images/Telehealth.png"

const drawerWidth = 240

const NavigationDrawer = ({ mobileOpen, handleDrawerToggle }) => {
  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth, padding: "30px" },
          flexShrink: { sm: 0 },
        }}
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#212944",
              padding: "0 0 0 10px",
            },
          }}
        >
          <DrawerTools />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#212944",
              padding: "0 0 0 10px",
            },
          }}
          open
        >
          <DrawerTools />
        </Drawer>
      </Box>
    </>
  )
}

function DrawerTools() {
  const { pathname } = useLocation()
  return (
    <>
      <Toolbar>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Avatar
            src={telehealthImg}
            sx={{ margin: "15px", width: 130, height: 130 }}
            variant="rounded"
          />
          <Typography variant="h4" sx={{ color: "#dbdee3" }}>
            Tele Health
          </Typography>
        </Stack>
      </Toolbar>
      <Divider
        style={{ background: "white", margin: "20px" }}
        variant="middle"
      />
      {[
        "Dashboard",
        "Appointment",
        "Home Doctor",
        "Therapy Group",
        "V.D.T",
        "Medical Record",
        "Prescription",
      ].map((name, index) => {
        let urlname = name
          .toLocaleLowerCase()
          .replace(" ", "")
          .replaceAll(".", "")
        let color = pathname.includes(urlname) ? "#31b8cf" : "#dbdee3"

        return (
          <NavLink
            key={index}
            to={urlname}
            style={{
              color: "#dbdee3",
              textDecoration: "none",
              display: "flex",
            }}
          >
            <ListItem button>
              <ListItemIcon>
                {name === "Dashboard" ? (
                  <Dashboard sx={{ color }} />
                ) : name === "Appointment" ? (
                  <Schedule sx={{ color }} />
                ) : name === "Home Doctor" ? (
                  <Home sx={{ color }} />
                ) : name === "Therapy Group" ? (
                  <Groups sx={{ color }} />
                ) : name === "V.D.T" ? (
                  <VideoCall sx={{ color }} />
                ) : name === "Medical Record" ? (
                  <Folder sx={{ color }} />
                ) : (
                  <Medication sx={{ color }} />
                )}
              </ListItemIcon>
              <ListItemText>
                <Typography color={color}>{name}</Typography>
              </ListItemText>
            </ListItem>
          </NavLink>
        )
      })}

      <Divider
        style={{ background: "white", margin: "20px" }}
        variant="middle"
      />

      {["Apply For Help", "Profile", "Blog"].map((name, index) => {
        let urlname = name
          .toLocaleLowerCase()
          .replaceAll(" ", "")
          .replaceAll(".", "")
        let color = pathname.includes(urlname) ? "#31b8cf" : "#dbdee3"
        return (
          <NavLink
            key={index}
            to={urlname}
            style={{
              color: "#dbdee3",
              textDecoration: "none",
              display: "flex",
            }}
          >
            <ListItem button>
              <ListItemIcon>
                {name === "Apply For Help" ? (
                  <Help sx={{ color }} />
                ) : name === "Profile" ? (
                  <AccountBox sx={{ color }} />
                ) : (
                  <Article sx={{ color }} />
                )}
              </ListItemIcon>
              <ListItemText>
                <Typography color={color}>{name}</Typography>
              </ListItemText>
            </ListItem>
          </NavLink>
        )
      })}
    </>
  )
}

export default NavigationDrawer
