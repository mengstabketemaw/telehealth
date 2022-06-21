import * as React from "react"
import { useState } from "react"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import requests from "../../api/repository"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { DateTime } from "luxon"
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material"

export default function Review() {
  const { prescriptionId } = useParams()

  const [medication, setMedication] = useState("")
  const [strength, setStrength] = useState("")
  const [remark, setRemark] = useState("")
  const [prescribeDate, setPrescribeDate] = useState("")
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState("info")
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function fetchData() {
      await requests
        .get(`api/Prescription/${prescriptionId}`)
        .then((data) => {
          setStrength(data["strength"])
          setMedication(data["medication"])
          setRemark(data["remark"])
          setPrescribeDate(data["presribeDate"])
          setLoading(false)
        })
        .catch(() => {
          setOpen(true)
          setSeverity("error")
          setMessage("Error loading data from server.")
        })
    }
    fetchData()
    console.log(prescribeDate)
  }, [])

  return (
    <>
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
        </Box>
      ) : (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Drug information
          </Typography>
          <Typography gutterBottom>
            If you have this medication is stock please select 'Confirm Take'
            when delivering the medication to the patient.
          </Typography>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="outlined-read-only-input"
                name="medication"
                label="Medication"
                fullWidth
                variant="standard"
                value={medication}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-read-only-input"
                name="strength"
                label="Strength"
                fullWidth
                variant="standard"
                value={strength}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-read-only-input"
                name="remark"
                label="Doctor's remark"
                fullWidth
                variant="standard"
                value={remark}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-read-only-input"
                name="prescribedDate"
                label="Prescribed On"
                fullWidth
                variant="standard"
                value={DateTime.fromISO(prescribeDate).toLocaleString(
                  DateTime.DATETIME_MED_WITH_SECONDS
                )}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
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
    </>
  )
}
