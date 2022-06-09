import * as React from 'react';
import { useState } from "react"
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import requests from "../../api/repository"
import { useParams } from "react-router-dom";

export default function Review() {
  const { prescriptionId } = useParams();
  const [prescribedBy, setPrescribedBy] = useState(0);
  requests.get(`api/Prescription/${prescriptionId}`).then(function (response) {
    
    setPrescribedBy(response.prescribedById);});
    console.log(prescribedBy)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="prescribedBy"
            name="prescribedBy"
            label="Prescribed By"
            fullWidth
            variant="standard"
            defaultValue={prescribedBy}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
