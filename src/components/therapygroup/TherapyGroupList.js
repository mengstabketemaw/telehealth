import { Book, PersonSearch } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CustomNoDataOverlay from "../gridComponents/CustomNoDataOverlay"
import { useSnackbar } from "../../pages/patient/Patient"
import Client from "../../api/client"
import Countdown from "react-countdown";
import { Button, Tooltip } from "@mui/material";
import VideoClient from "../../api/VideoComAPi";
import useToken from "../../hooks/useToken";

const TherapyGroupList = ({ setData, handleClose }) => {
    const [rows, setRows] = useState([]);
    const { token } = useToken();
    const [loading, setLoading] = useState(true);
    const { setSnackbar } = useSnackbar();

    useEffect(() => {
        const success = (data) => {
            const row = data.map(e => {
                return { ...e, number: e.patients.length + "/" + e.maxPatientNumber }
            })
            setRows(row);
            setLoading(false);
        };
        const error = (message) => {
            setSnackbar({ open: true, children: "Could't fetch data from the server: " + message, severity: "error" });
            handleClose();
        }
        VideoClient.get(VideoClient.THERAPY_GROUPS, success, error);
    }, [])

    const handleBookAppointment = (row) => {
        handleClose();

        setData(data => ({ ...data, loading: true }));

        const success = () => {
            setData(data => ({ rows: [...data.rows, row], loading: false }))
            setSnackbar({ open: true, children: "Appointment has been Booked, you can join the conference by clicking on the join, when the time come.", severity: "success" })
        }

        const error = (message) => setSnackbar({ open: true, children: "Could't book reservation: " + message, severity: "error" });

        VideoClient.get(VideoClient.JOIN_THERAPY_GROUP + row.id + "/" + token.username, success, error);

    }
    const conditionForBooking = (id, date) => {
        const current = rows.find(e => e.id === id);
        if ((new Date(date + ".000Z").getTime() > Date.now()) && current.patients.every(pat => pat !== token.username) && current.patients.length < current.maxPatientNumber)
            return false;
        return true;
    }
    const column = [
        {
            field: "therapist",
            headersName: "Therapist",
            flex: 1
        },
        {
            field: "description",
            headersName: "Description",
            renderCell: ({ value }) => (<Tooltip title={value}><p>Hover over me!</p></Tooltip>),
            flex: 1
        },
        {
            field: "startingDate",
            headersName: "Starting Date",
            renderCell: (props) => {
                return (
                    <Countdown date={props.value + ".000Z"}>
                        <p>closed</p>
                    </Countdown>
                )
            },
            flex: 1
        },

        {
            field: "number",
            headersName: "Total Audiances",
        },
        {
            field: "actions",
            type: "actions",
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<Book />}
                        label={"Book Place"}
                        color={"primary"}
                        onClick={() => handleBookAppointment(row)}
                        disabled={conditionForBooking(row.id, row.startingDate)}
                    />
                ]
            }
        }
    ]
    return <>
        <div style={{ height: "500px", width: "100%" }}>
            <DataGrid
                hideFooter
                rows={rows}
                columns={column}
                loading={loading}
                components={{
                    NoResultsOverlay: CustomNoDataOverlay
                }}
            />
        </div>
    </>
}
export default TherapyGroupList;