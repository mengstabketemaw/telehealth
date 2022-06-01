import { Button, Dialog, DialogActions, Tooltip, DialogContent, DialogTitle, Stack, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import VideoClient from "../../api/VideoComAPi"
import { useSnackbar } from "./Doctor";
import Countdown from "react-countdown"
import useToken from "../../hooks/useToken"
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";


const DocTherapyGroup = () => {
    const [data, setData] = useState({ rows: [], loading: true });
    const [newTherapy, setNewTherapy] = useState({ desc: "", num: 0, startingDateTime: null });
    const { token } = useToken();
    const [openDialog, setOpenDialog] = useState(false);
    const [showPatients, setShowPatients] = useState({ open: false, patients: [] });
    const { setSnackbar } = useSnackbar();

    useEffect(() => {
        const success = (data) => {
            const row = data.map(e => {
                return { ...e, number: e.patients.length + "/" + e.maxPatientNumber }
            })
            console.log(row);
            setData({ rows: row, loading: false });
        };
        const error = (message) => setSnackbar({ open: true, children: "Couldn't fetch data from the communication server: " + message, severity: "error" });
        VideoClient.get(VideoClient.DOCTOR_THERAPY_GROUPS + token.username, success, error);
    }, [token.username]);

    const handleStartSession = () => {

    }

    const handleShowPatients = (id) => {
        const pat = data.rows.find((row) => row.id === id);
        setShowPatients({ open: true, patients: pat.patients });
    }
    const handleCreateNewTherapyGroup = () => {
        const req = {
            id: data.rows.length,
            therapist: token.username,
            description: newTherapy.desc,
            startingDate: new Date(newTherapy.startingDateTime).toISOString().replace(".000Z", ""),
            maxPatientNumber: newTherapy.num,

        }
        console.log(req);
        console.log(data.rows);
        setOpenDialog(false);
        setData({ ...data, loading: true });
        const success = () => {
            setSnackbar({ open: true, children: "Therapy Group has been successfully created!" });
            setData({ rows: [...data.rows, { ...req, number: "0/" + req.maxPatientNumber }], loading: false });
        }
        const error = (message) => {
            setData({ ...data, loading: false });
            setSnackbar({ open: true, children: "Couldn't create Therapy Group: " + message });
        }
        VideoClient.post(VideoClient.CREATE_THERAPY_GROUP, req, success, error);
    }

    const column = [
        {
            field: "description",
            headerName: "Description",
            renderCell: ({ value }) => (<Tooltip title={value}><p>{value.substring(0, 5)}...</p></Tooltip>),
            flex: 1
        },
        {
            field: "startingDate",
            headerName: "Starting Date",
            renderCell: (props) => {
                return (
                    <Countdown date={props.value + ".000Z"}>
                        <Button onClick={() => handleStartSession(props.row)}>Start Session</Button>
                    </Countdown>
                )
            },
            flex: 1
        },

        {
            field: "number",
            headerName: "Totla Audiances",
            renderCell: (props) => <Button onClick={() => handleShowPatients(props.row.id)}>{props.value}</Button>
        },

    ]
    return (<>
        <br />
        <Typography variant="h4" color="primary">Therapy Group</Typography>
        <br />
        <Stack alignItems="flex-end">
            <div style={{ height: "400px", width: "100%" }}>
                <DataGrid
                    rows={data.rows}
                    columns={column}
                    hideFooter
                    loading={data.loading}
                />
            </div>
            <Button onClick={() => setOpenDialog(true)}>Create new Therapy Group</Button>
        </Stack>
        {
            openDialog &&
            <Dialog
                fullWidth
                open
            >
                <DialogTitle>Create Therapy Group</DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3}>
                        <TextField
                            multiline
                            rows={3}
                            value={newTherapy.desc}
                            onChange={e => setNewTherapy({ ...newTherapy, desc: e.target.value })}
                            label={"Describtion"}
                        />
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <DateTimePicker
                                label={"Starting Date and Time"}
                                onChange={e => setNewTherapy({ ...newTherapy, startingDateTime: e })}
                                value={newTherapy.startingDateTime}
                                renderInput={params => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            type={"number"}
                            value={newTherapy.num}
                            onChange={e => setNewTherapy({ ...newTherapy, num: e.target.value })}
                            label={"Max Patient Number"}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateNewTherapyGroup}>OK</Button>
                    <Button onClick={() => setOpenDialog(false)}>cancel</Button>
                </DialogActions>
            </Dialog>
        }
        {
            showPatients.open &&
            <Dialog
                onClose={() => setShowPatients(false)}
                open
            >
                <DialogTitle>Patients List joinig this therapy Group</DialogTitle>
                <DialogContent>
                    <Stack spacing={3}>
                        {showPatients.patients.length === 0 ? <Typography>No patient has joinded yet!</Typography> :
                            showPatients.patients.map((name) => <Typography variant="h4" color="primary">{name}</Typography>)}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowPatients(false)}>Ok</Button>
                </DialogActions>
            </Dialog>
        }
    </>

    )
}
export default DocTherapyGroup;