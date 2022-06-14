import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from "@mui/material"
import axios from "axios"
import { useState } from "react"

export default function PrescriptionForm({ pres, repo }) {
  const [prescribe, setPrescribe] = useState(pres)
  const [report, setReport] = useState(repo)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [preValue, setPreValue] = useState("")

  const handlePrescribeMedicine = () => {
    const data = {
      prescribedById: 0,
      prescribedToId: 0,
      //remark: ,
    }
    console.log(prescribe)

    // requests.post("api/Prescription", data)
  }

  const handleAddReport = () => {
    console.log(report)
  }

  const handleChangePrescribtion = (type) => (event) => {
    setPrescribe((state) => ({
      ...state,
      [type]: event.target.value,
    }))
  }

  let cancelToken
  const getRxTherms = async (value) => {
    if (value === "") return

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.")
    }
    cancelToken = axios.CancelToken.source()
    setLoading(true)
    axios
      .get(
        `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${value}&ef=STRENGTHS_AND_FORMS&maxList=10`,
        { cancelToken: cancelToken.token }
      )
      .then(({ data }) => {
        let stre = data[2]["STRENGTHS_AND_FORMS"]

        let options = data[1].map((e, i) => {
          return {
            id: i,
            label: e,
            strength: stre[i],
          }
        })
        setLoading(false)
        setOptions(options)
      })
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={3}
        width={"90%"}
        padding={5}
      >
        <Button
          variant="contained"
          onClick={() => setPrescribe({ open: true })}
        >
          Prescribe medicine
        </Button>
        <Button variant="outlined" onClick={() => setReport({ open: true })}>
          Add report
        </Button>
      </Stack>
      <Dialog open={prescribe.open}>
        <DialogTitle>Prescribe Medicine</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Autocomplete
                isOptionEqualToValue={(f) => true}
                getOptionLabel={(option) => option?.label || ""}
                loading={loading}
                autoComplete
                freeSolo
                includeInputInList
                options={options}
                value={preValue}
                onChange={(event, newValue) => {
                  setOptions(newValue ? [newValue, ...options] : options)
                  setPrescribe({ ...prescribe, name: newValue?.label })
                  setPreValue(newValue)
                }}
                onInputChange={(event, newInputValue) => {
                  getRxTherms(newInputValue)
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Rx Therm" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                required
                isOptionEqualToValue={(f) => true}
                options={preValue?.strength || []}
                autoComplete
                freeSolo
                getOptionLabel={(val) => val || ""}
                value={prescribe?.strength || ""}
                onChange={(event, newValue) => {
                  setPrescribe({ ...prescribe, strength: newValue })
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Strength" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                label={"Sig"}
                value={prescribe?.sig || ""}
                onChange={handleChangePrescribtion("sig")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={"Qty"}
                value={prescribe?.qty || ""}
                onChange={handleChangePrescribtion("qty")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label={"Memo"}
                value={prescribe?.memo || ""}
                onChange={handleChangePrescribtion("memo")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrescribeMedicine}>OK</Button>
          <Button onClick={() => setPrescribe({ open: false })}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={report.open} onClose={() => setReport({ open: false })}>
        <DialogTitle>Add Diagnosis Report</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ width: "70vh" }}>
            <TextField
              label="Report"
              required
              multiline
              rows={4}
              fullWidth
              value={report?.value || ""}
              onChange={(e) => setReport({ ...report, value: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddReport}>Ok</Button>
          <Button onClick={() => setReport({ open: false })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
