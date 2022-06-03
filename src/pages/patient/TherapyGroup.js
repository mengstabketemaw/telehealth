import { Delete, VideoCall } from "@mui/icons-material";
import { Button, Dialog, DialogActions, Tooltip, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import VideoClient from "../../api/VideoComAPi"
import TherapyGroupList from "../../components/therapygroup/TherapyGroupList";
import { useSnackbar } from "./Patient";
import Countdown from "react-countdown"
import useToken from "../../hooks/useToken"
import { useNavigate } from "react-router-dom";

const TherapyGroup = () => {
    const [data, setData] = useState({ rows: [], loading: true });
    const { token } = useToken();
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, row: {} });
    const { setSnackbar } = useSnackbar();
    const nav = useNavigate();

    useEffect(() => {
        const success = (data) => {
            const row = data.map(e => {
                return { ...e, number: e.patients.length + "/" + e.maxPatientNumber }
            })
            setData({ rows: row, loading: false });
        };
        const error = (message) => setSnackbar({ open: true, children: "Couldn't fetch data from the communication server: " + message, severity: "error" });
        VideoClient.get(VideoClient.PATIENT_THERAPY_GROUPS + token.username, success, error);
    }, []);

    const handleDelete = () => {

        const success = () => {
            const newRow = data.rows.filter(({ id }) => id !== deleteDialog.row.id);
            setData({ rows: newRow, loading: false });
            setDeleteDialog({ open: false, row: {} });
        }
        const error = (message) => {
            setSnackbar({ open: true, children: "Couldn't cancel reservation for the therapy group: " + message, severity: "error" });
            setData({ ...data, loading: false });
            setDeleteDialog({ open: false, row: {} })
        }
        setData({ ...data, loading: true });
        VideoClient.delete(VideoClient.THERAPY_GROUPS + "/" + deleteDialog.row.id + "/" + token.username, success, error);
    }
    const handleJoin = (row) => {
        nav("/user/patient/room/" + row.therapist);
    }
    const column = [
        {
            field: "therapist",
            headerName: "Therapist",
            flex: 1
        },
        {
            field: "description",
            headerName: "Description",
            renderCell: ({ value }) => (<Tooltip title={value}><p>Desc...</p></Tooltip>),
            flex: 1
        },
        {
            field: "startingDate",
            headerName: "Starting Date",
            renderCell: (props) => {
                return (
                    <Countdown date={props.value + ".000Z"}>
                        {new Date(props.value + ".000Z").getTime() < (Date.now + 1800000) ? <p>Closed</p> :
                            <Button onClick={() => handleJoin(props.row)}>Join Room</Button>
                        }
                    </Countdown>
                )
            },
            flex: 1
        },
        {
            field: "duration",
            headerName: "Duration",
            type: "number"
        },
        {
            field: "number",
            headerName: "Totla Audiances",
        },
        {
            field: "actions",
            type: "actions",
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<Delete />}
                        label={"Delete"}
                        onClick={() => setDeleteDialog({ open: true, row })}
                    />
                ]
            }
        }
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
            <Button onClick={() => setOpenDialog(true)}>Book new Therapy</Button>
        </Stack>
        {
            openDialog &&
            <Dialog
                fullWidth
                maxWidth={"100%"}
                open
            >
                <DialogTitle>Book new Therapy</DialogTitle>
                <DialogContent dividers>
                    <TherapyGroupList setData={setData} handleClose={() => setOpenDialog(false)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>OK</Button>
                </DialogActions>
            </Dialog>
        }
        {
            deleteDialog.open &&
            <Dialog
                onClose={() => setDeleteDialog(false)}
                open
            >
                <DialogTitle>Cancel Reservation for the Therapygroup</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to Cancel the appointment for the therapy group {deleteDialog.row?.therapy}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleDelete}>yes</Button>
                    <Button onClick={() => setDeleteDialog(false)}>no</Button>
                </DialogActions>
            </Dialog>
        }
    </>

    )
}
export default TherapyGroup;