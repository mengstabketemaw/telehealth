import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import Divider from "@mui/material/Divider"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
} from "@mui/material"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers"
import { useSnackbar } from "../../pages/patient/Patient"
import axios from "axios"
import Config from "../../api/Config"
import { DateTime } from "luxon"
import mick from "../../api/Scheduler"
import useToken from "../../hooks/useToken"
import { DataGrid } from "@mui/x-data-grid"
import { ManRounded } from "@mui/icons-material"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

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
]

export default function DoctorProfile({ open, handleClose, apply, ...row }) {
  const [dateValue, setDateValue] = React.useState({
    date: row?.date || null,
    start: DateTime.fromISO(row?.start_time) || null,
    end: DateTime.fromISO(row?.end_time) || null,
  })
  const [user, setUser] = React.useState({ loading: true, data: {} })
  const [schedules, setSchedules] = React.useState({ loading: true, data: [] })
  const { setSnackbar } = useSnackbar()

  React.useEffect(() => {
    axios
      .get(`${Config.USER_URL}/id/${row.doctor}`)
      .then(({ data }) => {
        setUser({ loading: false, data })
      })
      .catch(({ message }) => {
        handleClose()
        setSnackbar({
          open: true,
          children: "Could't fetch user info: " + message,
          severity: "error",
        })
        setUser({ loading: true })
      })
  }, [])

  React.useEffect(() => {
    mick
      .get("/doctor/" + row.doctor + "/availablity/")
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

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Schedule Appointment
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => apply(row, dateValue)}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        {user.loading ? (
          <p>loading</p>
        ) : (
          <>
            <Stack alignItems={"center"} spacing={3}>
              <hr />
              <Avatar
                src={`${Config.USER_URL}/avatar/${user.data.user.email}`}
                sx={{ width: "200px", height: "200px" }}
              />
              <Divider />
              <Typography variant="h6">{user.data.user.firstname}</Typography>
              <Typography variant="p" color="GrayText">
                {user.data.specialization}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DatePicker
                  label="Date"
                  value={dateValue.date}
                  onChange={(value) =>
                    setDateValue({ ...dateValue, date: value })
                  }
                  renderInput={(parms) => <TextField {...parms} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <TimePicker
                  label="Start Time"
                  value={dateValue.start}
                  onChange={(value) =>
                    setDateValue({ ...dateValue, start: value })
                  }
                  renderInput={(parms) => <TextField {...parms} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <TimePicker
                  label="End Time"
                  value={dateValue.end}
                  onChange={(value) =>
                    setDateValue({ ...dateValue, end: value })
                  }
                  renderInput={(parms) => <TextField {...parms} />}
                />
              </LocalizationProvider>
              <br />
            </Stack>
            <Divider variant="middle" />
            <Accordion width={"100%"}>
              <AccordionSummary expandIcon={<ManRounded />}>
                <Typography>Working Houre</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ height: "500px", width: "80%" }}>
                  <DataGrid
                    rowHeight={100}
                    hideFooter
                    rows={schedules.data}
                    columns={column}
                    loading={schedules.loading}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </Dialog>
    </div>
  )
}
