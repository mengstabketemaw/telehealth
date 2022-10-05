import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import ForgetPasswordDialog from "../components/ForgetPasswordDialog"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthProvider"

const Login = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
    rememberme: false,
    show: false,
  })
  const [openForgetPassword, setOpenForgetPassword] = useState(false)
  const [userData, setUserData] = useState({ status: "", error: "" })
  const [errorPermission, setErrorPermission] = useState(true)
  const nav = useNavigate()
  const { auth } = useAuth()

  const handleVisibility = () => {
    setValue((state) => {
      return { ...state, show: !state.show }
    })
  }

  const handleChange = (props) => (e) => {
    setErrorPermission(false)
    setValue({ ...value, [props]: e.target.value })
  }

  const handleLogin = () => {
    setErrorPermission(true)
    //
    setUserData({ status: "loading" })
    const handleSuccess = (data) => {
      setUserData({ loading: "success" })
      nav("/user/" + data.role.toLowerCase())
    }
    const handleError = (response) => {
      setUserData({ status: "error", data: response })
    }
    auth.user("/token", value, handleSuccess, handleError)
  }

  return (
    <>
      <Grid
        height={"100vh"}
        container
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs>
          <Container
            sx={{ width: "fit-content", boxShadow: "2px 2px 8px #888888" }}
          >
            <Grid
              container
              direction={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              spacing={2}
            >
              <Grid item xs sx={{ marginBottom: "70px" }}>
                <Typography variant="h4" color="primary">
                  Wellcome
                </Typography>
                <Typography variant="p" color="primary">
                  This project is for demonstration only,you can use the following credentials for testing purpose
                </Typography>
                <Typography variant="p" color="primary">
                  Doctors Account: matiwos@gmail.com, girma@gmail.com, eyob@gmail.com or biruk@gmail.com
                </Typography>
                <Typography variant="p" color="primary">
                  Patient Account: mengstab@gmail.com, mike@gmail.com, mamaru@gmail.com
                </Typography>
                <Typography variant="p" color="primary">
                  Password: 12345
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="h3" color="primary">
                  Login
                </Typography>
              </Grid>
              <Grid
                item
                xs
                onKeyDown={(e) => {
                  e.key === "Enter" &&
                    [value.username, value.password].every(Boolean) &&
                    handleLogin()
                }}
              >
                <Stack spacing={3} sx={{ padding: 5, width: "400px" }}>
                  <TextField
                    label="user name"
                    error={errorPermission && userData.status === "error"}
                    helperText={
                      errorPermission && userData.status === "error"
                        ? userData?.data
                        : ""
                    }
                    required
                    onChange={handleChange("username")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    type={value.show ? "text" : "password"}
                    label="password"
                    variant="outlined"
                    required
                    error={errorPermission && userData.status === "error"}
                    onChange={handleChange("password")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleVisibility}>
                            {value.show ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Stack
                    direction={"row"}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) =>
                            setValue({ ...value, rememberme: e.target.checked })
                          }
                        />
                      }
                      label="Remember me"
                    />
                    <Button onClick={() => setOpenForgetPassword(true)}>
                      Forget Password?
                    </Button>
                  </Stack>
                  <LoadingButton
                    variant="contained"
                    disabled={![value.username, value.password].every(Boolean)}
                    loading={userData.status === "loading"}
                    onClick={handleLogin}
                  >
                    Login
                  </LoadingButton>
                  <Button onClick={(e) => nav("/create-account")}>
                    Don't have Accoutn? Get Started
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <ForgetPasswordDialog
          open={openForgetPassword}
          handleClose={(value) => {
            setOpenForgetPassword(value)
          }}
        />
      </Grid>
    </>
  )
}
export default Login
