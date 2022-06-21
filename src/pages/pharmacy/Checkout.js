import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Medication from "./Medication"
import Review from "./Review"
import requests from "../../api/repository"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Avatar, Alert, CircularProgress, Snackbar } from "@mui/material"
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

const steps = ["Conditions", "Drug information"]

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Medication />
    case 1:
      return <Review />
    default:
      throw new Error("Unknown step")
  }
}

const theme = createTheme()

export default function Checkout() {
  const { prescriptionId } = useParams()
  const [activeStep, setActiveStep] = React.useState(0)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState("info")
  const [message, setMessage] = useState("")

  const handleNext = () => {
    if (activeStep === 1) {
      setLoading(true)
      requests
        .post(`api/Prescription/take?prescriptionId=${prescriptionId}`)
        .then(() => {
          setLoading(false)
          setOpen(true)
          setSeverity("success")
          setMessage("Prescription successfully taken")
        })
        .catch((error) => {
          setLoading(false)
          setOpen(true)
          setSeverity("error")
          setMessage("Error : " + error)
        })
    }
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  useEffect(() => {
    async function fetchData() {
      await requests
        .get(`api/Prescription/${prescriptionId}`)
        .then((data) => {
          //ATTENTION
          //Menge I need loading screen here
          //
          if (data["status"] === 1) {
            setActiveStep(2)
          }
          setLoading(false)
        })
        .catch((error) => {
          setOpen(true)
          setSeverity("error")
          setMessage("Error loading data from server.")
        })
    }
    fetchData()
  }, [])

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
          <Typography component="h1" variant="h4" align="center">
            Prescription
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {loading ? (
            <Box
              sx={{
                width: "100%",
                height: "50vh",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <CircularProgress />
              <Typography>loading</Typography>
            </Box>
          ) : (
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Prescription taken. Thank you for your service.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1
                        ? "Confirm take"
                        : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Paper>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={(e) => setOpen(false)}
          severity={severity}
        >
          <Alert onClose={(e) => setOpen(false)} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
        <Copyright />
      </Container>
    </ThemeProvider>
  )
}
