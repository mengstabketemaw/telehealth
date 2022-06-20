import * as React from "react"
import { useState } from "react"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import requests from "../../api/repository"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
// import { useSnackbar } from "../admin/Admin"
import { DateTime } from "luxon"

export default function Review() {
  const { prescriptionId } = useParams()
  // const { setSnackbar } = useSnackbar()

  const [medication, setMedication] = useState("")
  const [strength, setStrength] = useState("")
  const [remark, setRemark] = useState("")
  const [prescribeDate, setPrescribeDate] = useState("")

  useEffect(() => {
    async function fetchData() {
      await requests
        .get(`api/Prescription/${prescriptionId}`)
        .then((data) => {
          //ATTENTION
          //Menge I need loading screen here
          //
          //And a snackbar for pharmacy importing from admin failed
          //
          //

          setStrength(data["strength"])
          setMedication(data["medication"])
          setRemark(data["remark"])
          setPrescribeDate(data["presribeDate"])
        })
        .catch((error) => {
          // setSnackbar({
          //   open: true,
          //   children: "Couldn't load data from the server: " + error.message,
          //   severity: "error",
          // })
        })
    }
    fetchData()
    console.log(prescribeDate)
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Drug information
      </Typography>
      <Typography gutterBottom>
        If you have this medication is stock please select 'Confirm Take' when
        delivering the medication to the patient.
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
  )
}
