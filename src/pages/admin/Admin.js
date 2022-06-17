import * as React from "react"
import { Alert, Avatar, Stack, Snackbar } from "@mui/material"
import { Outlet } from "react-router-dom"
import { useLocation, NavLink } from "react-router-dom"
import Topbar from "../../components/Topbar"
import {
  Box,
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material"
import {
  AccountBox,
  DocumentScanner,
  Feedback,
  Help,
  PieChart,
  Settings,
} from "@mui/icons-material"
import telehealthImg from "../../assets/images/Telehealth.png"

const drawerWidth = 240

const SnackBarContext = React.createContext()
export const useSnackbar = () => React.useContext(SnackBarContext)

function Admin() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    severity: "error",
    children: "this is error",
  })
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar handleDrawerToggle={handleDrawerToggle} />
      <NavigationDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <SnackBarContext.Provider value={{ setSnackbar }}>
          <Outlet />
        </SnackBarContext.Provider>
        <Snackbar
          open={snackbar.open}
          onClose={(e) => setSnackbar({ ...snackbar, open: false })}
          autoHideDuration={6000}
        >
          <Alert
            {...snackbar}
            onClose={(e) => setSnackbar({ ...snackbar, open: false })}
          />
        </Snackbar>
      </Box>
    </Box>
  )
}

const NavigationDrawer = ({ mobileOpen, handleDrawerToggle }) => {
  return (
    <>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#212944",
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
            alt="Travis Howard"
            src={telehealthImg}
            sx={{ margin: "15px", width: 150, height: 150 }}
            variant="rounded"
          />
          <Typography variant="h4" sx={{ color: "#ffffff" }}>
            Tele Health
          </Typography>
        </Stack>
      </Toolbar>
      <Divider
        style={{ background: "white", margin: "20px" }}
        variant="middle"
      />
      {["Dashboard", "Doctors", "Help Applications", "Feedback"].map(
        (name, index) => {
          let urlname = name
            .toLocaleLowerCase()
            .replace(" ", "")
            .replaceAll(".", "")
          let color = pathname.includes(urlname) ? "#3490ec" : "#ffffff"

          return (
            <NavLink
              key={index}
              to={urlname}
              style={{
                color: "#ffffff",
                textDecoration: "none",
                display: "flex",
              }}
            >
              <ListItem button>
                <ListItemIcon>
                  {name === "Dashboard" ? (
                    <PieChart sx={{ color }} />
                  ) : name === "Doctors" ? (
                    <DocumentScanner sx={{ color }} />
                  ) : name === "Feedback" ? (
                    <Feedback sx={{ color }} />
                  ) : (
                    <Help sx={{ color }} />
                  )}
                </ListItemIcon>
                <ListItemText>
                  <Typography color={color}>{name}</Typography>
                </ListItemText>
              </ListItem>
            </NavLink>
          )
        }
      )}

      <Divider
        style={{ background: "white", margin: "20px" }}
        variant="middle"
      />

      {["Profile", "Setting"].map((name, index) => {
        let urlname = name
          .toLocaleLowerCase()
          .replaceAll(" ", "")
          .replaceAll(".", "")
        let color = pathname.includes(urlname) ? "#3490ec" : "#ffffff"
        return (
          <NavLink
            key={index}
            to={urlname}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
            }}
          >
            <ListItem button>
              <ListItemIcon>
                {name === "Profile" ? (
                  <AccountBox sx={{ color }} />
                ) : (
                  <Settings sx={{ color }} />
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
export default Admin
