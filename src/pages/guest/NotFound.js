import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import Paper from "@mui/material/Paper"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Avatar } from "@mui/material"
import telehealthImg from "../../assets/images/GreyTelehealth.png"

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Tele Health
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function Checkout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Avatar
            src={telehealthImg}
            sx={{ margin: "15px", width: 80, height: 80 }}
            variant="rounded"
          />
          <Typography variant="h6" color="inherit" noWrap>
            Tele Health
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h2" align="center">
            404 Page Not Found
          </Typography>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  )
}
