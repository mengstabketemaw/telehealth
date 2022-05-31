import { Button, Stack, Typography } from "@mui/material";
import { participants, join } from "@videosdk.live/react-sdk";
import { useState } from "react";
import VideoComponent from "./VideoComponent";
import VideoControllers from "./VideoControllers";

const VideoContainer = ({ user }) => {
    const [joined, setJoined] = useState(false);
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
                    [...participants.key()].map((participantId) => (<VideoComponent participantId={participantId} />))
                }
                <VideoControllers />
            </>
        )}
    </>
}
export default VideoContainer;