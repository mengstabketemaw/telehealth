import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import { useState } from "react";
import VideoClient from "../../api/VideoComAPi";
import VideoContainer from "../../components/videos/VideoContainer";
import useToken from "../../hooks/useToken";
import { useSnackbar } from "./Doctor";

const DocVideoRoom = () => {
    const { token } = useToken();
    const { setSnackbar } = useSnackbar();
    const [room, setRoom] = useState({ status: "idle", data: {} });

    const createRoom = () => {
        setRoom({ status: "loading", data: {} });
        const success = (data) => setRoom({ status: "success", data })
        const error = (message) => {
            setSnackbar({ open: true, children: "Could't find any room: " + message, severity: "error" });
            setRoom({ status: "error", data: {} });
        }
        VideoClient.post(VideoClient.CREATE_ROOM, { username: token.username, type: "video session" }, success, error);
    }
    return <>
        <br />
        <Typography variant="h4" color="primary">Video Room</Typography>
        <br />
        <Box width="100%" height="70vh" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {room.status === "loading" ? <CircularProgress /> :
                room.status === "success" ? (
                    <MeetingProvider
                        config={{
                            meetingId: room.data.roomId,
                            micEnabled: "true",
                            webcamEnabled: "true",
                            name: room.data.username,
                        }}
                        token={room.data.token}>
                        <MeetingConsumer>{() => <VideoContainer user={room.data} />}</MeetingConsumer>
                    </MeetingProvider>) :
                    <Stack spacing={3}>
                        <Typography>Create your Room when ever you are ready!</Typography>
                        <Button onClick={() => createRoom()}>Create Room</Button>
                    </Stack>
            }
        </Box>
    </>
}


export default DocVideoRoom;