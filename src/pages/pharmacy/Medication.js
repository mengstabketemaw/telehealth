import * as React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { Link } from "@mui/material"

export default function Medication() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        E-Prescription
      </Typography>
      <Typography>
        This is an online prescription prescribed from and digitally signed by
        Telehealth.
        <br />
        <br />
        Dear pharmacist, before proceeding to give the patient his/her
        medication, you must first be very well aware of and agree with the{" "}
        <Link
          href="https://www.medisecure.com.au/terms-conditions/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          E-Prescription Terms and Conditions.
        </Link>
        <br />
        <br />
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                required
                color="primary"
                name="saveAddress"
                value="yes"
              />
            }
            label="I agree to the terms and conditions of e-prescription*"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
