import * as React from "react"
import { DisabledByDefault, Done } from "@mui/icons-material"
import { Avatar, Button, Chip, Tooltip, Typography } from "@mui/material"
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
  const { setSnackbar } = useSnackbar()
  const [data, setData] = useState({ loading: true, row: [] })

  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState("paper")

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  useEffect(() => {
    requests
      .get("api/Help/requested")
      .then(({ data }) => {
        const mappedData = data.map((element) => {
          return {
            helpId: element.helpId,
            requestorId: element.requestorId,
            body: element.body,
            status: element.status,
            fileName: element.fileName,
            postDate: element.postDate,
          }
        })
        setData({ loading: false, row: mappedData })
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
      field: "name",
      flex: 1,
      headerName: "Requestor",
      //Menge please put the user's full name here
      //you can access the user ID with (requestorId)
    },
    {
      field: "postDate",
      flex: 1,
      headerName: "Request Date",
    },
    {
      field: "docRoles",
      flex: 0.5,
      headerName: "Roles",
      renderCell: ({ value }) => {
        return (
          <Tooltip
            title={value.split(",").map((name) => (
              <p>{name}</p>
            ))}
          >
            <p>{value}</p>
          </Tooltip>
        )
      },
    },
    {
      field: "homedoctor",
      headerName: "Home Doctor",
      type: "boolean",
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
          rowHeight={100}
          components={{ NoRowsOverlay: CustomNoDataOverlay }}
        />
      </div>
    </>
  )
}
export default HelpApplications
