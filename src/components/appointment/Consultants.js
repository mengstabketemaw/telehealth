import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DoctorProfile from "./DoctorProfile"
import mick from "../../api/Scheduler"
import { useSnackbar } from "../../pages/patient/Patient"
import useToken from "../../hooks/useToken"
import { DateTime } from "luxon"
import { DoctorName } from "../../pages/patient/Prescription"

const Consultants = () => {
  const [data, setData] = useState({ loading: true, row: [] })
  const [profile, setProfile] = useState({ open: false })
  const { setSnackbar } = useSnackbar()
  const { token } = useToken()
  const nav = useNavigate()

  const handleView = (arg) => {
    setProfile({ open: true, doctor: arg.id })
  }

  const scheduleAppointment = (row, dateValue) => {
    setProfile({ ...profile, open: false })
    mick
      .post(`/patient/${token.userId}/appt/`, {
        doctor: row.doctor,
        appt_date: {
          date: DateTime.fromISO(dateValue.date).toISODate(),
          start_time: DateTime.fromISO(dateValue.start).toISOTime(),
          end_time: DateTime.fromISO(dateValue.end).toISOTime(),
        },
        temp: token.userId,
      })
      .then(() => {
        setSnackbar({ open: true, children: "Successfull operation!" })
        nav("/user/patient/appointment")
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          children:
            "Couldn't Schedule appointment: " + error.response.data.detail,
          severity: "error",
        })
      })
  }

  const column = [
    {
      field: "id",
      flex: 1,
      headerName: "Doctor",
      renderCell: ({ value }) => <DoctorName id={value} />,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            label="Schedule Appointment"
            showInMenu
            onClick={() => handleView(params.row)}
          />,
        ]
      },
    },
  ]

  useEffect(() => {
    mick
      .get("/doctor/")
      .then(({ data: { features } }) =>
        setData({ loading: false, row: features })
      )
      .catch(({ message }) => {
        setSnackbar({
          open: true,
          children: "Could't Fetch Data: " + message,
          severity: "error",
        })
      })
  }, [])

  return (
    <>
      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          rowHeight={100}
          hideFooter
          rows={data.row}
          columns={column}
          loading={data.loading}
        />
        {profile.open && (
          <DoctorProfile
            {...profile}
            handleClose={() => setProfile({ open: false })}
            apply={scheduleAppointment}
          />
        )}
      </div>
    </>
  )
}

export default Consultants
