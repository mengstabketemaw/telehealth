import { Delete } from "@mui/icons-material"
import { Button, Dialog, Typography } from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import mick from "../../api/Scheduler"
import NearbyDoctors from "../../components/maps/NearByDoctors"
import SearchWrapper from "../../components/maps/SearchWrapper"
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

  const column = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "Doctor",
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
          onClick={() => {}}
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
          <SearchWrapper>
            <NearbyDoctors
              handleClose={() => setLocateNearbyDoctor({ open: false })}
            />
          </SearchWrapper>
        </Dialog>
      )}
    </>
  )
}

function DoctorName({ id }) {
  const [name, setName] = useState({ loading: true, data: "" })
  useEffect(() => {}, [])
  if (name.loading) return <p>loading . . .</p>
  if (name.data) return <p>Doctor {name}</p>

  return <p>Name not Found</p>
}

export default HomeAppointment
