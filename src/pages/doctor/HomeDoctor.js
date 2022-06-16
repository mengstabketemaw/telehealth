import { useState, useEffect } from "react"
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { Approval, Delete, Map, Receipt } from "@mui/icons-material"
import schedule from "../../api/Scheduler"

const HomeDoctor = () => {
  const [status, setStatus] = useState({ loading: true, activated: false })

  useEffect(() => {
    setStatus({ loading: false, activated: false })
  }, [])

  const handleEnableHomeDoctor = () => {}
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
  useEffect(() => {
    schedule.post().then(() => {
      setData({
        loading: false,
        row: [
          {
            id: 1,
            avatar: "a",
            name: "mamush",
            sex: "male",
            age: "12",
            dateTime: "2022-12-12 10:12:12",
            status: "Approved",
            location: "addis ababa",
          },
        ],
      })
    })
  }, [])

  const column = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: "100",
      renderCell: ({ value }) => {
        return (
          <Avatar src={value} sx={{ width: "70px", height: "70px" }}>
            value
          </Avatar>
        )
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "sex",
      headerName: "Sex",
    },
    {
      field: "age",
      headerName: "Age",
    },
    {
      field: "dateTime",
      headerName: "Date Time",
      type: "dateTime",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
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
          label="Show Medical Record"
          icon={<Receipt />}
          showInMenu
        />,
        <GridActionsCellItem
          label="Approve Request"
          icon={<Approval />}
          showInMenu
        />,
        <GridActionsCellItem label="Delete" icon={<Delete />} />,
      ],
    },
  ]

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <DataGrid
        rowHeight={100}
        loading={data.loading}
        columns={column}
        rows={data.row}
        hideFooter
      />
    </div>
  )
}

export default HomeDoctor
