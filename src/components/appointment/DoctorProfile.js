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
import { Avatar, Container, Grid } from "@mui/material"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers"
import { useSnackbar } from "../../pages/patient/Patient"
import axios from "axios"
import Config from "../../api/Config"
import mick from "../../api/Scheduler"
import { DateTime } from "luxon"
import useToken from "../../hooks/useToken"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function DoctorProfile({ open, handleClose, setData, ...row }) {
  const [dateValue, setDateValue] = React.useState({
    date: row.date,
    start: DateTime.fromISO(row.start_time),
    end: DateTime.fromISO(row.end_time),
  })
  const [user, setUser] = React.useState({ loading: true, data: {} })
  const { setSnackbar } = useSnackbar()
  const { token } = useToken()

  console.log(row)
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

  const handleEdit = () => {
    mick
      .put(`/patient/${token.userId}/appt/${row.id}/`, {
        id: row.id,
        doctor: row.doctor,
        appt_date: {
          date: row.date,
          start_time: row.start_time,
          end_time: row.end_time,
        },
        temp: row.temp,
      })
      .then(({ data }) => {
        handleClose()
        let x = {
          ...row,
          date: dateValue.date,
          start_time: dateValue.date,
          end_time: dateValue.end,
        }
        setData((e) => {
          let newData = e.rows.map((z) => z.id !== data.id)
          return { loading: false, rows: [...newData, x] }
        })
        setSnackbar({ open: true, children: "Successfull operation" })
      })
      .catch(({ message }) => {
        handleClose()
        setSnackbar({
          open: true,
          children: "Error: " + message,
          severity: "error",
        })
      })
  }

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
            <Button autoFocus color="inherit" onClick={handleEdit}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        {user.loading ? (
          <p>loading</p>
        ) : (
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
                onChange={(value) => setDateValue({ ...dateValue, end: value })}
                renderInput={(parms) => <TextField {...parms} />}
              />
            </LocalizationProvider>
          </Stack>
        )}
      </Dialog>
    </div>
  )
}
