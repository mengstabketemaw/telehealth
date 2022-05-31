import { useState } from "react";
import { OnlinePrediction } from "@mui/icons-material";
import { Box, Button, CircularProgress, Container, Stack, Typography } from "@mui/material";
import PatientProfile from "../../components/doctor/PatientProfile";
import PatientProfileCard from "../../components/doctor/PatientProfileCard";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import { useSnackbar } from "./Doctor";
import VideoClient from "../../api/VideoComAPi";
import useToken from "../../hooks/useToken";
import VideoContainer from "../../components/videos/VideoContainer";

const Office = () => {
    const [profile, setProfile] = useState({ open: false, data: {} });
    const { setSnackbar } = useSnackbar();
    const { token } = useToken();
    const [room, setRoom] = useState({ status: "idle", data: {} })//status:- idle,created,loading,error

    const handleStartSession = () => {
        setRoom({ status: "loading", data: {} });
        const success = (data) => setRoom({ status: "created", data });
        const failure = (message) => {
            setSnackbar({ open: true, children: "Could't start the session: " + message, severity: "error" });
            setRoom({ status: "error", data: {} });
        }
        VideoClient.createRoom({ username: token.username, type: "vdt" }, success, failure);
    }
    return (<>
        <br />
        <Typography variant="h4" color="primary">Virtual Office.</Typography>
        <br />
        <Box sx={{ width: "100%", height: "70vh", display: "flex", flexWrap: "wrap", border: "1px solid green" }}>
            <Box sx={{ width: "60%", height: "100%", borderRight: "1px solid green", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {room.status === "idle" ? <Typography variant="h6" color="InfoText">Start The session when you are ready!!!</Typography> :
                    room.status === "loading" ? <CircularProgress /> :
                        room.status === "error" ? <Typography variant="h6" color="error">There was error while creating room, try agine.</Typography> :
                            <>
                                <MeetingProvider
                                    config={{
                                        meetingId: room.data.meetingId,
                                        micEnabled: "true",
                                        webcamEnabled: "true",
                                        name: token.username,
                                    }}
                                    token={room.data.token}>
                                    <MeetingConsumer>{() => <VideoContainer user={room.data} />}</MeetingConsumer>
                                </MeetingProvider>
                            </>
                }
            </Box>
            <Box sx={{ width: "39%", height: "100%", flexGrow: "1", overflow: "scroll" }}>
                <Stack justifyContent="center" direction="row">
                    <Typography variant="h5" color="secondary">Patients</Typography>
                </Stack>
                <PatientProfileCard onView={() => setProfile({ open: true })} name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
                <PatientProfileCard name="mamush" src="image" />
            </Box>
        </Box>
        <Stack padding={1} direction="row" spacing={3} alignItems="center">
            <OnlinePrediction color={room.status === "created" ? "success" : "error"} />
            <Typography color="InfoText">{room.status === "created" ? "online" : "offline"}</Typography>
            <Button variant={"contained"} onClick={handleStartSession} color={room.status === "created" ? "error" : "primary"}>
                {!room.status !== "created" ? "START SESSION" : "STOP SESSION"}
            </Button>
        </Stack>
        <PatientProfile open={profile.open} handleClose={() => setProfile({ open: false })} />
    </>)
}
export default Office;