import { Delete, Edit } from "@mui/icons-material"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import axios from "axios"
import { useEffect, useState } from "react"
import schedule from "../../api/Scheduler"
import useToken from "../../hooks/useToken"
import { useSnackbar } from "./Doctor"

const Schedule = () => {
  const [schedules, setSchedules] = useState({ loading: true, data: [] })
  const [addSchedule, setAddSchedule] = useState({ open: false })
  const { setSnackbar } = useSnackbar()
  const { token } = useToken()

  useEffect(() => {
    schedule
      .get("/doctor/" + token.userId + "/availablity/")
      .then(({ data }) => {
        let res = data.map((e) => {
          return {
            id: e.id,
            date: e.date_time.date,
            start: e.date_time.start_time,
            end: e.date_time.end_time,
          }
        }, [])
        setSchedules({ loading: false, data: res })
      })
      .catch(({ message }) => {
        setSchedules({ loading: false, data: [] })
        setSnackbar({ open: true, severity: "error", children: message })
      })
  }, [])

  const column = [
    {
      field: "id",
      header: "Number",
      flex: 1,
    },
    {
      field: "date",
      header: "Date",
      type: "date",
      flex: 1,
    },
    {
      field: "start",
      header: "Start Time",
      type: "dateTime",
      flex: 1,
    },
    {
      field: "end",
      header: "End Time",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            label="Edit"
            icon={<Edit color="secondary" />}
            onClick={(f) => f}
          />,
          <GridActionsCellItem
            label="delete"
            icon={<Delete />}
            onClick={(f) => f}
          />,
        ]
      },
    },
  ]

  const handleAddWorkingHoure = () => {
    setSchedules({ ...schedules, loading: true })
    setAddSchedule({ ...addSchedule, open: false })
    axios
      .post(addSchedule)
      .then(({ data }) => {
        setSchedules({ data: { ...schedules.data, ...data }, loading: false })
        setSnackbar({
          children: "Schedule Added Successfully",
          open: true,
        })
      })
      .catch(({ message }) => {
        setSnackbar({ children: message, open: true, severity: "error" })
        setSchedules({ ...schedules, loading: false })
      })
  }

  return (
    <>
      <br />
      <Typography color="primary" variant="h4">
        Set Your Working houre
      </Typography>
      <br />
      <Stack alignItems="flex-end">
        <div style={{ height: "500px", width: "100%" }}>
          <DataGrid
            rowHeight={100}
            hideFooter
            rows={schedules.data}
            columns={column}
            loading={schedules.loading}
          />
        </div>
        <Button onClick={() => setAddSchedule({ open: true })}>
          Add Working houre
        </Button>
      </Stack>
      {addSchedule.open && (
        <Dialog fullWidth open>
          <DialogTitle>Add Working houre</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addSchedule?.day || 1}
                  label="Day"
                  onChange={(e) =>
                    setAddSchedule({ ...addSchedule, day: e.target.value })
                  }
                >
                  <MenuItem value={1}>Monday</MenuItem>
                  <MenuItem value={2}>Tuesday</MenuItem>
                  <MenuItem value={3}>Wednesday</MenuItem>
                  <MenuItem value={4}>Thursday</MenuItem>
                  <MenuItem value={5}>Friday</MenuItem>
                  <MenuItem value={6}>Saturday</MenuItem>
                  <MenuItem value={7}>Sunday</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <TimePicker
                  label={"Starting Time"}
                  onChange={(e) =>
                    setAddSchedule({ ...addSchedule, start_time: e })
                  }
                  value={addSchedule?.start_time || null}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <TimePicker
                  label={"End Time"}
                  onChange={(e) =>
                    setAddSchedule({ ...addSchedule, end_time: e })
                  }
                  value={addSchedule?.end_time || null}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddWorkingHoure}>OK</Button>
            <Button onClick={() => setAddSchedule({ open: false })}>
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default Schedule
