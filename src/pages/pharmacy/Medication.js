import * as React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

export default function Medication() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        E-Prescription
      </Typography>
      <Typography>
        This is an online prescription prescribed to Mamaru Dillie Dear
        pharmacist please confirm the identity of the buyer with the above
        detail before proceeding to the next page
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                required
                color="secondary"
                name="saveAddress"
                value="yes"
              />
            }
            label="I agree to the terms and conditions of online prescription"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
