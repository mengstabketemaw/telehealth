import { Typography } from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useSnackbar } from "./Doctor"
import mick from "../../api/Scheduler"
import { ShowPatientInfo } from "./HomeDoctor"
import useToken from "../../hooks/useToken"
import { Person, VideoCall } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { DateTime } from "luxon"
const Activity = () => {
  const [data, setData] = useState({ row: [], loading: true })
  const [info, setInfo] = useState({ open: false })
  const { setSnackbar } = useSnackbar()
  const { token } = useToken()
  const nav = useNavigate()

  const handleViewProfile = (row) => {
    setInfo({ open: true, id: row.temp, profile: true, location: false })
  }

  const handleStartSession = () => {
    nav("/user/doctor/room")
  }
  const column = [
    {
      field: "date",
      headerName: "Date Time",
      flex: 1,
      valueGetter: ({ value }) => {
        return DateTime.fromISO(value).toLocaleString(DateTime.DATE_MED)
      },
    },
    {
      field: "start_time",
      headerName: "Date Time",
      flex: 1,
      valueGetter: ({ value }) => {
        return DateTime.fromISO(value).toLocaleString(DateTime.TIME_SIMPLE)
      },
    },
    {
      field: "end_time",
      headerName: "Date Time",
      flex: 1,
      valueGetter: ({ value }) => {
        return DateTime.fromISO(value).toLocaleString(DateTime.TIME_SIMPLE)
      },
    },
    {
      field: "temp",
      headerName: "Patient Id",
    },

    {
      field: "actions",
      type: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            label="View Profile"
            icon={<Person />}
            onClick={() => handleViewProfile(params.row)}
            showInMenu
          />,
          <GridActionsCellItem
            label="Start Video Session"
            icon={<VideoCall />}
            onClick={() => handleStartSession()}
            showInMenu
          />,
        ]
      },
    },
  ]

  useEffect(() => {
    setData({ loading: true, row: [] })
    mick
      .get(`/doctor/${token.userId}/appt/`)
      .then(({ data }) => {
        let row = data.map((e) => ({ ...e, ...e.appt_date }))
        setData({ loading: false, row })
      })
      .catch(({ message }) => {
        setData({ loading: false, row: [] })
        setSnackbar({
          children: "Could't do it: " + message,
          severity: "error",
          open: true,
        })
      })
  }, [])

  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Todays Activity
      </Typography>
      <br />
      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          rowHeight={100}
          hideFooter
          rows={data.row}
          loading={data.loading}
          columns={column}
        />
      </div>
      {info.open && <ShowPatientInfo info={info} setInfo={setInfo} />}
    </>
  )
}
export default Activity
