import * as React from "react"
import Box from "@mui/material/Box"
import { Alert, Snackbar, Toolbar } from "@mui/material"
import Topbar from "../../components/Topbar"
import NavigationDrawer from "../../components/NavigationDrawer"
import { Outlet } from "react-router-dom"

const drawerWidth = 240

const SnackBarContext = React.createContext()
export const useSnackbar = () => React.useContext(SnackBarContext)

function Patient() {
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

export default Patient
