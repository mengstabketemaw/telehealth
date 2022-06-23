import { Box, Button, CircularProgress, Typography } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import Auth from "../../api/Auth"
import Config from "../../api/Config"
import useToken from "../../hooks/useToken"

/**
 * A wrapper around the element which checks if the user is authenticated
 * If authenticated, renders the passed element
 * If not authenticated, redirects the user to Login page.
 */
const sx = {
  height: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const isActivated = () => {
  if (sessionStorage.getItem("disabled") === "false")
    return { loading: false, disabled: false }
  return { loading: true, disabled: true }
}

const PrivateElement = ({ children }) => {
  const [data, setData] = useState(isActivated())
  let location = useLocation()
  const nav = useNavigate()
  const { token, setToken } = useToken()
  const role = token?.role
  useEffect(() => {
    ;(async function () {
      if (!token?.userId) return
      if (!data.disabled) return
      const {
        data: {
          user: { disabled },
        },
      } = await axios.get(Config.USER_URL + "/id/" + token.userId)
      sessionStorage.setItem("disabled", disabled)
      setData({ loading: false, disabled })
    })()
  }, [token?.userId])

  if (data.loading) {
    return (
      <Box sx={sx}>
        <CircularProgress />
        <Typography>Loading</Typography>
      </Box>
    )
  }

  if (data.disabled) {
    return (
      <Box sx={{ ...sx, flexDirection: "column" }}>
        <Typography variant="h4" color="error">
          Your Account is Disabled!
        </Typography>
        <Typography>
          You cannot use the system functionality until your account is enabled.
        </Typography>
        <br />
        <Button
          onClick={() => {
            nav("/login")
            let auth = new Auth(token, setToken)
            auth.logoutUser()
          }}
        >
          Logout
        </Button>
      </Box>
    )
  }

  if (Boolean(role)) {
    if (location.pathname.includes(role.toLowerCase())) return <Outlet />
    else return <Navigate to={role.toLowerCase()} />
  }
  return <Navigate to="/login" state={{ from: location }} />
}

export default PrivateElement
