import { Camera, ExitToApp, Mic } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { useMeeting } from "@videosdk.live/react-sdk";

export default function VideoControllers() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
        <Stack spacing={3} direction="row" alignItems="center" justifyContent="center">
            <IconButton>
                <ExitToApp color="red" />
            </IconButton>
            <IconButton>
                <Mic />
            </IconButton>
            <IconButton>
                <Camera />
            </IconButton>
        </Stack>
    );
}
