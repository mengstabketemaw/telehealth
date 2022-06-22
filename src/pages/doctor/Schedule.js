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
import { DateTime } from "luxon"
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import axios from "axios"
import { useEffect, useState } from "react"
import mick from "../../api/Scheduler"
import useToken from "../../hooks/useToken"
import { useSnackbar } from "./Doctor"

const Schedule = () => {
  const [schedules, setSchedules] = useState({ loading: true, data: [] })
  const [addSchedule, setAddSchedule] = useState({ open: false })
  const { setSnackbar } = useSnackbar()
  const { token } = useToken()

  useEffect(() => {
    mick
      .get("/doctor/" + token.userId + "/availablity/")
      .then(({ data }) => {
        setSchedules({ loading: false, data })
      })
      .catch(({ message }) => {
        setSchedules({ loading: false, data: [] })
        setSnackbar({
          open: true,
          severity: "error",
          children: "Could't load data from mick: " + message,
        })
      })
  }, [])

  const column = [
    {
      field: "id",
      header: "Number",
      flex: 1,
    },
    {
      field: "days",
      header: "Day",
      flex: 1,
      valueGetter: ({ value }) => {
        switch (value) {
          case 1:
            return "Monday"
          case 2:
            return "Tusday"
          case 3:
            return "Wednesday"
          case 4:
            return "Thursday"
          case 5:
            return "Friday"
          case 6:
            return "Saturday"
          case 7:
            return "Sunday"
          default:
            break
        }
      },
    },
    {
      field: "start_time",
      header: "Start Time",
      type: "dateTime",
      flex: 1,
      valueGetter: ({ value }) => {
        return DateTime.fromISO(value).toLocaleString(DateTime.TIME_SIMPLE)
      },
    },
    {
      field: "end_time",
      header: "End Time",
      flex: 1,
      valueGetter: ({ value }) => {
        return DateTime.fromISO(value).toLocaleString(DateTime.TIME_SIMPLE)
      },
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            label="delete"
            icon={<Delete />}
            onClick={(f) => handleDelete(params.id)}
          />,
        ]
      },
    },
  ]

  const handleDelete = async (id) => {
    setSchedules({ ...schedules, loading: true })
    try {
      await mick.delete(`/doctor/${token.userId}/availablity/${id}/`)
      let data = schedules.data.filter((e) => e.id !== id)
      setSchedules({ loading: false, data })
    } catch ({ message }) {
      setSchedules({ ...schedules, loading: false })
      setSnackbar({
        children: "Couldn't delete: " + message,
        severity: "error",
        open: true,
      })
    }
  }

  const handleAddWorkingHoure = () => {
    setSchedules({ ...schedules, loading: true })
    setAddSchedule({ ...addSchedule, open: false })
    mick
      .post(`/doctor/${token.userId}/availablity/`, {
        days: addSchedule.day || 1,
        start_time: addSchedule.start_time.toFormat("TT"),
        end_time: addSchedule.end_time.toFormat("TT"),
        doctor: token.userId,
      })
      .then(({ data }) => {
        setSchedules({ data: [...schedules.data, data], loading: false })
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
