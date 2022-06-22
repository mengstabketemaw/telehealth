import { Add, QrCode } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useSnackbar } from "./Patient"
import mati from "../../api/repository"
import useToken from "../../hooks/useToken"
import axios from "axios"
import Config from "../../api/Config"
import { QRCodeCanvas } from "qrcode.react"
import { DateTime } from "luxon"

function Prescription() {
  const [medicalPrescription, setMedicalPrescription] = useState({
    loading: true,
    row: [],
  })
  const [detailedView, setDetailedView] = useState({ open: false })
  const { token } = useToken()
  const { setSnackbar } = useSnackbar()

  useEffect(() => {
    mati
      .get("api/Prescription/patient?id=" + token.userId)
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
  }, [])

  const columnPrescribtion = [
    {
      field: "prescriptionId",
      headerName: "Id",
      status: false,
    },
    {
      field: "prescribedById",
      headerName: "Doctor",
      status: false,
    },
    {
      field: "presribeDate",
      headerName: "Date",
      flex: 1,
      valueGetter: ({ value }) => {
        return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_MED)
      },
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
      valueGetter: ({ value }) => {
        if (Number(value) === 0) return "Prescribed"
        else return "Taken"
      },
    },
    {
      field: "actions",
      type: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            label={"Show Detail"}
            icon={<QrCode />}
            showInMenu
            onClick={() => {
              setDetailedView({ open: true, ...row })
            }}
          />,
        ]
      },
    },
  ]

  return (
    <>
      <br />
      <br />
      <Typography variant="h4" color="primary" textAlign={"start"}>
        E-Prescriptions
      </Typography>
      <br />
      <div style={{ width: "100%", height: "500px" }}>
        <DataGrid
          loading={medicalPrescription.loading}
          rows={medicalPrescription.row}
          getRowId={(row) => row.prescriptionId}
          columns={columnPrescribtion}
          hideFooter
          initialState={{
            columns: {
              columnVisibilityModel: {
                prescriptionId: false,
                prescribedById: false,
              },
            },
          }}
        />
      </div>
      <Dialog
        fullWidth
        open={detailedView.open}
        onClose={() => setDetailedView({ open: false })}
      >
        <DialogTitle>E-prescription</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <Typography>prescribedBy</Typography>
            {detailedView?.prescribedById && (
              <DoctorName id={detailedView?.prescribedById} />
            )}
            <br />
            <br />
            <Typography variant="h6">
              {detailedView?.medication} - {detailedView?.strength}
            </Typography>
            <Typography>{detailedView?.remark}</Typography>
            <Typography>
              Prescribed on -{" "}
              {new Date(detailedView?.presribeDate).toDateString()}
            </Typography>
            <Divider />
            <QRCodeCanvas
              id="qrcode1234"
              value={
                "http://localhost:3000/pharmacy/" + detailedView.prescriptionId
              }
            />
            <Button onClick={downloadQR}>download</Button>
            <Divider />

            <Typography>Take this QR code to a nearby Pharmacy !</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailedView({ open: false })}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
const downloadQR = () => {
  const canvas = document.getElementById("qrcode1234")
  console.log(canvas)
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream")
  let downloadLink = document.createElement("a")
  downloadLink.href = pngUrl
  downloadLink.download = "QRcode.png"
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

export function DoctorName({ id }) {
  const [doctor, setDoctor] = useState({ loading: true })
  useEffect(() => {
    axios
      .get(`${Config.USER_URL}/id/${id}`)
      .then(({ data }) => {
        setDoctor({ loading: false, data })
      })
      .catch(({ message }) => {
        setDoctor({ loading: false })
      })
  }, [])

  if (doctor.loading) return <p>loading . . .</p>
  else if (!doctor.data) return <p>Doctor not found in the database</p>
  else if (doctor.data)
    return (
      <Stack direction={"row"} spacing={3}>
        <Avatar src={`${Config.USER_URL}/avatar/${doctor.data.user.email}`} />
        <Typography variant="h5" color={"green"}>
          Doctor {doctor.data.user.firstname} {doctor.data.user.middlename} (
          {doctor.data.specialization})
        </Typography>
      </Stack>
    )
  return null
}

export default Prescription
