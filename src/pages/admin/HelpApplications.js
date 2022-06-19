import * as React from "react"
import { Download } from "@mui/icons-material"
import { Paper, Tooltip, Typography } from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import CustomNoDataOverlay from "../../components/gridComponents/CustomNoDataOverlay"
import requests from "../../api/repository"
import { useSnackbar } from "./Admin"
import { useEffect, useState } from "react"
import { DateTime } from "luxon"

const HelpApplications = () => {
  const [data, setData] = useState({ loading: true, row: [] })
  const { setSnackbar } = useSnackbar()

  const handleApprove = (row, approve) => {
    setData({ ...data, loading: true })
    requests
      .post(`api/Help/${approve}?helpId=${row.helpId}`)
      .then(() => {
        let newData = data.row.filter((e) => e.helpId !== row.helpId)
        setData({ row: newData, loading: false })
        setSnackbar({
          open: true,
          children: "Request has been " + approve + "d",
          severity: "success",
        })
      })
      .catch((e) => {
        setSnackbar({
          open: true,
          children: "Error while " + approve + " : " + e,
          severity: "error",
        })
      })
  }

  const handleDownload = (row) => {
    if (row.fileName) {
      let downloadLink = document.createElement("a")
      downloadLink.href = `http://matiows-001-site1.btempurl.com/api/File/${row.fileName}`
      downloadLink.target = "_blank"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    } else {
      setSnackbar({
        children: "Request has no file",
        open: true,
        severity: "info",
      })
    }
  }

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
          children: "Couldn't load data from the server: " + error.message,
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
            <p>{value.substr(0, 50)} ... </p>
          </Tooltip>
        )
      },
    },
    {
      field: "postDate",
      headerName: "Posted Date",
      flex: 1,
      valueGetter: ({ value }) => {
        return DateTime.fromISO(value).toLocaleString(
          DateTime.DATETIME_MED_WITH_SECONDS
        )
      },
    },
    {
      field: "actions",
      type: "actions",
      getActions: ({ row }) => [
        <GridActionsCellItem
          onClick={() => handleApprove(row, "approve")}
          label="Approve"
          showInMenu
        />,
        <GridActionsCellItem
          onClick={() => handleApprove(row, "decline")}
          label="Decline"
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
