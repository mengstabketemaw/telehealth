import { useState, useEffect } from "react"
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Switch,
  Typography,
} from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { Approval, Delete, Map, Receipt } from "@mui/icons-material"
import mick from "../../api/Scheduler"
import useToken from "../../hooks/useToken"
import { useSnackbar } from "./Doctor"
import PatientProfile from "../../components/doctor/PatientProfile"
import axios from "axios"
import Config from "../../api/Config"
import WhereIsThisPatient from "../../components/maps/WhereIsThisPatient"
import { DateTime } from "luxon"

const HomeDoctor = () => {
  const [status, setStatus] = useState({ loading: true, activated: false })
  const { token } = useToken()
  const { setSnackbar } = useSnackbar()
  useEffect(() => {
    mick.get("/doctor/" + token.userId + "/").then(({ data }) => {
      let isHomeDoctor = data.properties.is_home_doctor
      setStatus({ loading: false, activated: isHomeDoctor })
    })
  }, [])

  const handleEnableHomeDoctor = (arg) => {
    setStatus({ loading: true, activated: false })
    mick
      .get(`/doctor/home/?id=${token.userId}&is_home_doctor=${arg}`)
      .then(() => {
        setStatus({ loading: false, activated: arg === 1 })
      })
      .catch(({ message }) => {
        setStatus({ loading: false, activated: false })
        setSnackbar({
          children: "Could't do it: " + message,
          severity: "error",
          open: true,
        })
      })
  }
  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Home Doctor
      </Typography>
      <br />
      {status.loading ? (
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          loading
        </Box>
      ) : status.activated ? (
        <>
          <HomeAppointments />
          <Switch
            checked={status.activated}
            onChange={() => handleEnableHomeDoctor(0)}
            inputProps={{ "aria-label": "controlled" }}
          />
          <p>Home Doctor is Enabled</p>
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" color="error">
            Home Doctor Service is disabled!
          </Typography>
          <Typography variant="h5" color="GrayText">
            You can enable your home doctor service
          </Typography>
          <Typography variant="caption" color="CaptionText">
            notice! Other patients can see your home location
          </Typography>
          <Button onClick={() => handleEnableHomeDoctor(1)}>
            Enable home Doctor service
          </Button>
        </Box>
      )}
    </>
  )
}

export function HomeAppointments() {
  const [data, setData] = useState({ loading: true, row: [] })
  const [info, setInfo] = useState({ open: false })
  const { token } = useToken()
  const { setSnackbar } = useSnackbar()

  const handleShowPatient = (row) => {
    setInfo({ open: true, id: row.temp, profile: true, location: false })
  }
  const handleShowLocation = (row) => {
    setInfo({ open: true, id: row.temp, profile: false, location: true })
  }

  const handleApprove = (row) => {
    row.status = row.status === "Approved" ? "Disapproved" : "Approved"
    console.log(row)
    setData({ ...data, loading: true })
    mick
      .put(`/doctor/${token.userId}/homeappt/${row.id}/`, row)
      .then((response) => {
        let newDate = data.row.map((e) => {
          if (e.id === row.id) return row
          return e
        })
        setData({ loading: false, row: newDate })
      })
      .catch(({ message }) => {
        setData({ ...data, loading: false })
        setSnackbar({
          children: "Couldn't do it: " + message,
          open: true,
          severity: "error",
        })
      })
  }

  useEffect(() => {
    mick.get(`/doctor/${token.userId}/homeappt/`).then(({ data }) => {
      setData({
        loading: false,
        row: data,
      })
    })
  }, [])

  const column = [
    {
      field: "temp",
      headerName: "Patient Id",
      flex: 1,
    },
    {
      field: "appt_date",
      headerName: "Date Time",
      type: "dateTime",
      valueGetter: ({ value }) => {
        return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_MED)
      },
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      getActions: ({ row }) => [
        <GridActionsCellItem
          label="Show Location On Map"
          icon={<Map />}
          onClick={() => handleShowLocation(row)}
          showInMenu
        />,
        <GridActionsCellItem
          label="Show Patient Information"
          icon={<Receipt />}
          onClick={() => handleShowPatient(row)}
          showInMenu
        />,
        <GridActionsCellItem
          label={
            row.status === "Approved" ? "Disapprove Request" : "Approve Request"
          }
          icon={<Approval />}
          onClick={() => handleApprove(row)}
          showInMenu
        />,
      ],
    },
  ]

  return (
    <>
      <div style={{ width: "100%", height: "500px" }}>
        <DataGrid
          rowHeight={100}
          loading={data.loading}
          columns={column}
          rows={data.row}
          hideFooter
        />
      </div>
      {info.open && <ShowPatientInfo info={info} setInfo={setInfo} />}
    </>
  )
}

export function ShowPatientInfo({ info, setInfo }) {
  const [data, setData] = useState({ loading: true, user: {} })
  const { setSnackbar } = useSnackbar()

  useEffect(() => {
    axios
      .get(Config.USER_URL + "/id/" + info.id)
      .then(({ data }) => {
        setData({ loading: false, user: data.user })
      })
      .catch(({ message }) => {
        setSnackbar({
          open: true,
          children: "Couldn't load user from auth: " + message,
          severity: "error",
        })
        setInfo({ open: false })
      })
  }, [])

  if (data.loading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )

  if (data.user.email && info?.profile)
    return (
      <PatientProfile
        open={info}
        username={data.user.email}
        handleClose={() => setInfo({ open: false })}
      />
    )
  if (info?.location)
    return (
      <Dialog
        open={info.open}
        fullWidth
        maxWidth={"100%"}
        onClose={() => setInfo({ open: false })}
      >
        <WhereIsThisPatient
          userInfo={{
            username: data.user.email,
            lat: data.user.latitude,
            lng: data.user.longitude,
            name: data.user.firstname + " " + data.user.middlename,
          }}
        />
      </Dialog>
    )
}

export default HomeDoctor
