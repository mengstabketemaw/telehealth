import { Add, QrCode } from "@mui/icons-material"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import MedicalRecordProfile from "../../components/medicalrecord/MedicalRecordProfile"
import { useSnackbar } from "./Patient"
import mati from "../../api/repository"
import useToken from "../../hooks/useToken"

const MedicalRecord = () => {
  const { token } = useToken()
  const [medicalrecord, setMedicalRecord] = useState({ row: [], loading: true })
  const { setSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [viewDetaile, setViewDetaile] = useState({ open: false })
  const [record, setRecord] = useState({ desc: "", file: "" })

  useEffect(() => {
    mati
      .get("api/MedicalRecord/user/" + token.userId)
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
  }, [])
  const handleShowItem = (row) => {
    setViewDetaile({
      ...row,
      open: true,
      handleClose: () => setViewDetaile({ ...viewDetaile, open: false }),
    })
  }

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
              setViewDetaile({ open: true, ...row })
            }}
          />,
        ]
      },
    },
  ]

  const handleSave = () => {
    setOpen(false)
    setMedicalRecord({ ...medicalrecord, loading: true })
    let req = new FormData()
    req.append("file", record.file)
    var type = ""
    if (record.file.type.includes("image")) {
      type = "IMAGE"
    } else if (record.file.type.includes("video")) {
      type = "VIDEO"
    } else if (record.file.type.includes("pdf")) {
      type = "PDF"
    } else {
      type = "UNKNOWN"
    }
    mati
      .post("api/file/upload", req)
      .then((filename) => {
        mati
          .post("api/MedicalRecord/filename", {
            patientId: token.userId,
            fileName: filename,
            desc: record.desc,
            type,
          })
          .then((data) => {
            setMedicalRecord((state) => ({
              loading: false,
              row: [...state.row, data],
            }))
            setSnackbar({
              open: true,
              children: "Medical Record Added Successfully!",
            })
          })
      })
      .catch(({ message }) => {
        setMedicalRecord({ ...medicalrecord, loading: false })
        setSnackbar({
          open: true,
          children: "Could't do it: " + message,
          severity: "error",
        })
      })
  }

  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Medical Record
      </Typography>
      <br />
      <Stack alignItems={"flex-end"}>
        <div style={{ height: "400px", width: "100%" }}>
          <DataGrid
            rows={medicalrecord.row}
            columns={column}
            loading={medicalrecord.loading}
            hideFooter
            getRowId={(row) => row.medicalRecordId}
          />
        </div>
        <Button startIcon={<Add />} onClick={() => setOpen(true)}>
          Add New MedicalRecord
        </Button>
      </Stack>
      <Dialog open={open}>
        <DialogTitle>Add new MedicalRecord</DialogTitle>
        <DialogContent dividers>
          <Stack margin={5} spacing={4}>
            <TextField
              value={record.desc}
              onChange={(e) => setRecord({ ...record, desc: e.target.value })}
              focused
              fullWidth
              label={"Describtion"}
            />
            <TextField
              files={[record.file]}
              onChange={(e) =>
                setRecord({ ...record, file: e.target.files[0] })
              }
              focused
              type={"file"}
              label={"File"}
            />
          </Stack>
          <DialogContentText>
            File that has been added CANNOT be either modfied or deleted!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(_) => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {viewDetaile.open && (
        <MedicalRecordProfile
          {...viewDetaile}
          handleClose={() => setViewDetaile({ open: false })}
        />
      )}
    </>
  )
}
export default MedicalRecord
