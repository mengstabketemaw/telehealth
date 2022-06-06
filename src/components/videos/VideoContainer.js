import { Button, Stack, Typography } from "@mui/material";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useState } from "react";
import VideoComponent from "./VideoComponent";
import VideoControllers from "./VideoControllers";

const VideoContainer = ({ user }) => {
    const [joined, setJoined] = useState(false);
    const { join } = useMeeting();
    const { participants } = useMeeting();

    return <>
        {!joined ? (
            <Stack>
                <Typography>{user.username}</Typography>
                <Typography>{user.type}</Typography>
                <Button onClick={() => {
                    setJoined(true);
                    join();
                }}>Join</Button>
            </Stack>) : (
            <>
                {
                    [...participants.keys()].map((participantId, key) => (<VideoComponent key={key} participantId={participantId} />))
                }
                <br />
                <VideoControllers />
            </>
        )}
    </>
}
export default VideoContainer;