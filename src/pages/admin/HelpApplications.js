import * as React from "react"
import { DisabledByDefault, Done, Download } from "@mui/icons-material"
import { Avatar, Button, Chip, Paper, Tooltip, Typography } from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import CustomNoDataOverlay from "../../components/gridComponents/CustomNoDataOverlay"
import requests from "../../api/repository"
import { useSnackbar } from "./Admin"
import useToken from "../../hooks/useToken"
import { useEffect, useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

const HelpApplications = () => {
  const [data, setData] = useState({ loading: true, row: [] })
  const { setSnackbar } = useSnackbar()

  const handleApprove = (row) => {}

  const handleDisapprove = (row) => {}

  const handleDownload = (row) => {}

  const handleShowProfile = (row) => {}

  useEffect(() => {
    requests
      .get("api/Help/requested")
      .then((data) => {
        setData({ loading: false, row: data })
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          children: "Could't load data from the server: " + error.message,
          severity: "error",
        })
        setData({ row: [], loading: false })
      })
  }, [])

  const column = [
    {
      field: "helpId",
      headerName: "Requestor",
      flex: 1,
    },
    {
      field: "requestorId",
      flex: 1,
      headerName: "Patient",
    },
    {
      field: "body",
      flex: 1,
      headerName: "Description",
      renderCell: ({ value }) => {
        return (
          <Tooltip
            leaveDelay={800}
            placement="bottom-start"
            title={
              <Paper
                sx={{
                  padding: 1,
                  width: "300px",
                  height: "300px",
                  overflow: "scroll",
                }}
              >
                <Typography>{value}</Typography>
              </Paper>
            }
          >
            <p>{value}</p>
          </Tooltip>
        )
      },
    },
    {
      field: "postDate",
      headerName: "Posted Date",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      getActions: ({ row }) => [
        <GridActionsCellItem
          onClick={() => handleApprove(row)}
          label="Approved"
          showInMenu
        />,
        <GridActionsCellItem
          onClick={() => handleDisapprove(row)}
          label="Disapprove"
          showInMenu
        />,
        <GridActionsCellItem
          onClick={() => handleDownload(row)}
          icon={<Download />}
          label="download File"
        />,
        <GridActionsCellItem
          onClick={() => handleShowProfile(row)}
          label="Show Profile"
          showInMenu
        />,
      ],
    },
  ]

  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Help Applications
      </Typography>
      <br />
      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          loading={data.loading}
          rows={data.row}
          columns={column}
          hideFooter
          getRowId={(rows) => rows.helpId}
          initialState={{
            columns: {
              columnVisibilityModel: {
                helpId: false,
                requestorId: false,
              },
            },
          }}
          components={{ NoRowsOverlay: CustomNoDataOverlay }}
        />
      </div>
    </>
  )
}
export default HelpApplications
