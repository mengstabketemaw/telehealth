import * as React from "react"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import axios from "axios"
import Config from "../../api/Config"
import useSnackbar from "../../pages/doctor/Doctor"
import mati from "../../api/repository"
import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material"
import client from "../../api/client"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import requests from "../../api/repository"
import useToken from "../../hooks/useToken"
import PrescriptionForm from "./PerscriptionForm"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function PatientProfile(props) {
  const { token } = useToken()
  const { setSnackbar } = useSnackbar()
  const [profile, setProfile] = React.useState({ loading: true })
  const [medicalRecord, setMedicalRecord] = React.useState({
    loading: true,
    row: [],
  })
  const [prescribe, setPrescribe] = React.useState({ open: false })
  const [report, setReport] = React.useState({ open: false })
  const [detailedView, setDetailedView] = React.useState({ open: false })

  React.useEffect(() => {
    ;(async function () {
      try {
        let {
          data: { user },
        } = await axios.get(Config.USER_URL / "username/" + props.username)
        setProfile({ loading: false, user })
        let { data } = await mati.get("api/MedicalRecord/user/" + profile.id)
        setMedicalRecord({ loading: false, row: data })
      } catch ({ message }) {
        setSnackbar({
          children: "Could't load data: " + message,
          severity: "error",
          open: true,
        })
      }
    })()

    client.post().then(() => {
      setProfile({ loading: false })
      setMedicalRecord({
        loading: false,
        row: [
          {
            id: 1,
            date: "1999-12-2",
            desc: "X ray for my ribe",
            type: "image/png",
          },
          {
            id: 2,
            date: "1999-11-2",
            desc: "Rage for my elbow",
            type: "video/mp4",
          },
          {
            id: 3,
            date: "2012-12-3",
            desc: "Medical Prescription",
            type: "E-prescription",
          },
        ],
      })
    })
  })

  const column = [
    {
      field: "date",
      headerName: "Date",
      type: "date",
      flex: 0.5,
    },
    {
      field: "desc",
      headerName: "Describtion",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.5,
    },
    {
      field: "actions",
      type: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            label={"Show In Detail"}
            showInMenu
            onClick={() => {
              setDetailedView({ open: true, ...row })
            }}
          />,
        ]
      },
    },
  ]

  const handlePrescribeMedicine = () => {
    const data = {
      prescribedById: 0,
      prescribedToId: 0,
      //remark: ,
    }

    requests.post("api/Prescription", data)
  }

  const handleAddReport = () => {
    console.log(report)
  }

  const handleChangePrescribtion = (type) => (event) => {
    setPrescribe((state) => ({
      ...state,
      [type]: event.target.value,
    }))
  }

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Patient Profile
          </Typography>
          <Button autoFocus color="inherit" onClick={props.handleClose}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Box height={"100px"}>
        <br />
        <br />
        <br />
      </Box>
      <Stack alignItems={"center"} spacing={1}>
        <hr />
        <Avatar src={props.img} sx={{ width: "200px", height: "200px" }} />
        <Divider variant="middle" width={"50%"} />
        {profile.loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography>Patient full name</Typography>
            <Typography>Male</Typography>
            <Typography>30 years old</Typography>
            <Typography>Single</Typography>
          </>
        )}
        <Divider variant="middle" width={"50%"} />
        <Typography variant="h5" color="primary">
          Medical Information
        </Typography>
        <div style={{ width: "90%", height: "500px" }}>
          <DataGrid
            loading={medicalRecord.loading}
            rows={medicalRecord.row}
            columns={column}
            hideFooter
          />
        </div>
        <PrescriptionForm pres={prescribe} repo={report} />
        <Dialog
          open={detailedView.open}
          onClose={() => setDetailedView({ open: false })}
        >
          <DialogTitle>Medical Record</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ width: "80vw", flexGrow: 1 }}>
              {/* rendering must be performed based on the input type img,video,pdf,e-prescribtion. each one should be handled. what a pain? */}
              <Typography variant="h1" color="primary">
                This is the medical record 10Q
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailedView({ open: false })}>OK</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Dialog>
  )
}
