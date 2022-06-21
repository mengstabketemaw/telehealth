import { Delete } from "@mui/icons-material"
import { Button, Dialog, Typography } from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import axios from "axios"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import Config from "../../api/Config"
import mick from "../../api/Scheduler"
import NearbyDoctors from "../../components/maps/NearByDoctors"
import useToken from "../../hooks/useToken"
import { useSnackbar } from "../patient/Patient"

const HomeAppointment = () => {
  const [data, setData] = useState({ loading: true, row: [] })
  const [locateNearbyDoctor, setLocateNearbyDoctor] = useState({ open: true })
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

  const apply = (id, date) => {
    console.log(id, date)
    setLocateNearbyDoctor({ open: false })
    setData({ ...data, loading: true })
    mick
      .post(`/doctor/${id}/homeappt/`, {
        doctor: id,
        appt_date: date,
        temp: token.userId,
        status: "Requested",
      })
      .then((res) => {
        setSnackbar({
          open: true,
          children:
            "Request have be sent successfully, please wait for approval!",
        })
        setData({ loading: false, row: [...data.row, res.data] })
      })
      .catch(({ message }) => {
        setData({ ...data, loading: false })
        setSnackbar({
          open: true,
          children: "Could't do it m: " + message,
          severity: "error",
        })
      })
  }

  const handleDelete = (row) => {
    setData({ ...data, loading: true })
    mick
      .delete(`/doctor/${row.doctor}/homeappt/${row.id}/`)
      .then(() => {
        let newData = data.row.filter((e) => e.id !== row.id)
        setData({ loading: false, row: newData })
        setSnackbar({ open: true, children: "Successfull operation!" })
      })
      .catch(({ message }) => {
        setData({ ...data, loading: false })
        setSnackbar({
          children: "Couldn't delete appointment: " + message,
          open: true,
          severity: "error",
        })
      })
  }

  const column = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "doctor",
      headerName: "Doctor",
      flex: 1,
      renderCell: ({ value }) => <DoctorName id={value} />,
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
          label="Delete"
          icon={<Delete color="secondary" />}
          onClick={() => handleDelete(row)}
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
      <Button onClick={() => setLocateNearbyDoctor({ open: true })}>
        Locate Nearby Doctors
      </Button>
      {locateNearbyDoctor.open && (
        <Dialog
          open={locateNearbyDoctor.open}
          onClose={() => setLocateNearbyDoctor({ open: false })}
          fullWidth
          maxWidth={"90%"}
        >
          <NearbyDoctors
            apply={apply}
            handleClose={() => setLocateNearbyDoctor({ open: false })}
          />
        </Dialog>
      )}
    </>
  )
}

export function DoctorName({ id }) {
  const [name, setName] = useState({ loading: true, data: "" })
  useEffect(() => {
    axios
      .get(`${Config.USER_URL}/id/${id}`)
      .then(({ data }) => {
        setName({
          loading: false,
          data: data.user.firstname + " " + data.user.middlename,
        })
      })
      .catch(({ message }) => {})
  }, [id])
  if (name.loading) return <p>loading . . .</p>
  if (name.data) return <p>Doctor {name.data}</p>

  return <p>Name not Found</p>
}

export default HomeAppointment
