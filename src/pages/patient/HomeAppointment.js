import { Button, Typography } from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import mick from "../../api/Scheduler"
import useToken from "../../hooks/useToken"
import { useSnackbar } from "../patient/Patient"

const HomeAppointment = () => {
  const [data, setData] = useState({ loading: true, row: [] })
  const { token } = useToken()
  const { setSnackbar } = useSnackbar()
  useEffect(() => {
    mick
      .get(`/patient/${token.userId}/homeappt/`)
      .then(({ data }) => {
        setData({ loading: false, row: data })
      })
      .catch(({ message }) => {
        setSnackbar({
          open: true,
          children: "Could't do it: " + message,
          severity: "error",
        })
      })
  }, [])

  const column = [
    {
      field: "id",
      headerName: "Id",
    },
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
          onClick={() => {}}
          showInMenu
        />,
        <GridActionsCellItem
          label="Show Patient Information"
          onClick={() => {}}
          showInMenu
        />,
      ],
    },
  ]

  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Home Doctor Appointment
      </Typography>
      <br />
      <div style={{ width: "100%", height: "500px" }}>
        <DataGrid
          rowHeight={100}
          loading={data.loading}
          columns={column}
          rows={data.row}
          hideFooter
        />
      </div>
      <Button>Locate Nearby Doctors</Button>
    </>
  )
}
export default HomeAppointment
