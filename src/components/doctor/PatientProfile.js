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
import { useSnackbar } from "../../pages/doctor/Doctor"
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
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
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
  const [medicalPrescription, setMedicalPrescription] = React.useState({
    loading: true,
    row: [],
  })
  const [prescribe, setPrescribe] = React.useState({ open: false })
  const [report, setReport] = React.useState({ open: false })
  const [detailedView, setDetailedView] = React.useState({ open: false })

  React.useEffect(() => {
    axios
      .get(`${Config.USER_URL}/username/${props.username}`)
      .then(({ data }) => {
        setProfile({ loading: false, user: data.user })
        mati
          .get("api/MedicalRecord/user/" + data.user.id)
          .then((data) => {
            setMedicalRecord({ loading: false, row: data })
          })
          .catch(({ message }) => {
            setSnackbar({
              children: "Could't load medical record: " + message,
              severity: "error",
              open: true,
            })
          })

        mati
          .get("api/Prescription/patient?id=" + data.user.id)
          .then((data) => {
            setMedicalPrescription({ loading: false, row: data })
          })
          .catch(({ message }) => {
            setSnackbar({
              children: "Could't load medical record: " + message,
              severity: "error",
              open: true,
            })
          })
      })
      .catch(({ message }) => {
        setSnackbar({
          children: "Could't load profile: " + message,
          severity: "error",
          open: true,
        })
      })
  }, [])

  const column = [
    {
      field: "medicalRecordId",
      headerName: "Id",
    },
    {
      field: "fileName",
      headerName: "File Name",
    },
    {
      field: "recordDate",
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

  const columnPrescribtion = [
    {
      field: "prescriptionId",
      headerName: "Id",
    },
    {
      field: "prescribedById",
      headerName: "Doctor",
    },
    {
      field: "presribeDate",
      headerName: "Date",
    },
    {
      field: "medication",
      headerName: "Medicine",
      flex: 1,
    },
    {
      field: "strength",
      headerName: "Strength",
      flex: 1,
    },
    {
      field: "remark",
      headerName: "Remark",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
    },
  ]

  const handlePrescribeMedicine = () => {
    const data = {
      prescribedById: 0,
      prescribedToId: 0,
      medication: "string",
      strength: "string",
      remark: "string",
    }

    mati.post("api/Prescription", data)
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
        <Avatar
          src={`${Config.USER_URL}/avatar/${token.username}`}
          sx={{ width: "200px", height: "200px" }}
        />
        <Divider variant="middle" width={"50%"} />
        {profile.loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h5" color="green">
              {profile.user.firstname} {profile.user.middlename}
            </Typography>
            <Typography>Sex: {profile.user.sex}</Typography>
            <Typography>birthDate: {profile.user.birthDate}</Typography>
            <Typography>phoneNo: {profile.user.phoneNumber}</Typography>
            <Typography>homePhoneNo: {profile.user.homePhoneNumber}</Typography>
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
            getRowId={(row) => row.medicalRecordId}
            columns={column}
            hideFooter
          />
        </div>
        <Divider variant="middle" width={"50%"} />
        <Typography variant="h5" color="primary">
          E-Prescribtions
        </Typography>
        <div style={{ width: "90%", height: "500px" }}>
          <DataGrid
            loading={medicalPrescription.loading}
            rows={medicalPrescription.row}
            getRowId={(row) => row.prescriptionId}
            columns={columnPrescribtion}
            hideFooter
          />
        </div>

        {profile?.user?.id && (
          <PrescriptionForm
            setMedicalPrescription={setMedicalPrescription}
            patientId={profile.user.id}
            pres={prescribe}
            repo={report}
          />
        )}
        <ShowDetaileMedicalRecord
          detailedView={detailedView}
          setDetailedView={setDetailedView}
        />
      </Stack>
    </Dialog>
  )
}

function ShowDetaileMedicalRecord({ detailedView, setDetailedView }) {
  if (detailedView.fileName)
    return (
      <Dialog
        fullWidth
        open={detailedView.open}
        onClose={() => setDetailedView({ open: false })}
      >
        <DialogTitle>Medical Record</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ width: "80vw", flexGrow: 1 }}>
            {detailedView?.type?.includes("image") && (
              <img
                height={"100%"}
                width={"100%"}
                src={
                  "http://matiows-001-site1.btempurl.com/api/File/" +
                  detailedView.fileName
                }
              />
            )}
            {detailedView?.type?.includes("pdf") && (
              <iframe
                height={"100%"}
                width={"100%"}
                src={
                  "http://matiows-001-site1.btempurl.com/api/File/" +
                  detailedView.fileName
                }
              />
            )}
            {detailedView?.type?.includes("video") && (
              <video controls width={"auto"}>
                <source
                  src={
                    "http://matiows-001-site1.btempurl.com/api/File/" +
                    detailedView.fileName
                  }
                  type={detailedView.type}
                />
              </video>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailedView({ open: false })}>OK</Button>
        </DialogActions>
      </Dialog>
    )

  return null
}
