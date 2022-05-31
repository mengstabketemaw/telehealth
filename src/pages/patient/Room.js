import { CircularProgress, Typography } from "@mui/material";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoClient from "../../api/VideoComAPi";
import VideoContainer from "../../components/videos/VideoContainer";
import { useSnackbar } from "./Patient";

const Room = () => {
    const { username } = useParams();
    const { setSnackbar } = useSnackbar();
    const [room, setRoom] = useState({ status: "loading", data: {} });

    useEffect(() => {
        const success = (data) => setRoom({ status: "success", data })
        const error = (message) => {
            setSnackbar({ open: true, children: "Could't find any room: " + message, severity: "error" });
            setRoom({ status: "error", data: {} });
        }
        VideoClient.videoClient(VideoClient.GET_ROOM + username, success, error);
    }, [username])

    return <>
        <br />
        <Typography variant="h4" color="primary">Video Room</Typography>
        <br />
        {room.status === "loading" ? <CircularProgress /> :
            room.status === "success" ? (
                <MeetingProvider
                    config={{
                        meetingId: room.data.meetingId,
                        micEnabled: "true",
                        webcamEnabled: "true",
                        name: room.data.username,
                    }}
                    token={room.data.token}>
                    <MeetingConsumer>{() => <VideoContainer user={room.data} />}</MeetingConsumer>
                </MeetingProvider>) :
                <Typography>Sorry doctor {username} has't joind yet</Typography>
        }
    </>
}


export default Room;