import { useState, useEffect } from "react"
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { Approval, Delete, Map, Receipt } from "@mui/icons-material"
import schedule from "../../api/Scheduler"
import useToken from "../../hooks/useToken"
import { useSnackbar } from "./Doctor"
import PatientProfile from "../../components/doctor/PatientProfile"

const HomeDoctor = () => {
  const [status, setStatus] = useState({ loading: true, activated: false })
  const { token } = useToken()
  const { setSnackbar } = useSnackbar()
  useEffect(() => {
    schedule.get("/doctor/" + token.userId + "/").then(({ data }) => {
      let isHomeDoctor = data.properties.is_home_doctor
      setStatus({ loading: false, activated: isHomeDoctor })
    })
  }, [])

  const handleEnableHomeDoctor = () => {
    setStatus({ loading: true, activated: false })
    schedule
      .get(`/doctor/home/?id=${token.userId}&is_home_doctor=1`)
      .then(() => {
        setStatus({ loading: false, activated: true })
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
        <HomeAppointments />
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
          <Button onClick={handleEnableHomeDoctor}>
            Enable home Doctor service
          </Button>
        </Box>
      )}
    </>
  )
}

export function HomeAppointments() {
  const [data, setData] = useState({ loading: true, row: [] })
  const [info, setInfo] = useState(false)
  const [location, setLocation] = useState({ open: false })
  const { token } = useToken()
  const { setSnackbar } = useSnackbar()

  const handleShowPatient = () => {}

  const handleApprove = (row) => {
    row.status = row.status === "Approved" ? "Disapproved" : "Approved"
    console.log(row)
    setData({ ...data, loading: true })
    schedule
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
    schedule.get(`/doctor/${token.userId}/homeappt/`).then(({ data }) => {
      setData({
        loading: false,
        row: data,
      })
    })
  }, [])

  const column = [
    {
      field: "patient",
      headerName: "Patient Id",
      flex: 1,
    },
    {
      field: "appt_date",
      headerName: "Date Time",
      type: "dateTime",
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
          showInMenu
        />,
        <GridActionsCellItem
          label="Show Patient Information"
          icon={<Receipt />}
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
      <ShowPatientInfo info={info} setInfo={setInfo} />
      <ShowLocation location={location} setLocation={setLocation} />
    </>
  )
}

function ShowPatientInfo() {
  const [data, setData] = useState({ loading: true, username: "" })

  useEffect(() => {}, [])

  if (data.loading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
}

function ShowLocation() {
  return null
}

export default HomeDoctor
