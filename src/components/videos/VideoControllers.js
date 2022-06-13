import {
  ExitToApp,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
} from "@mui/icons-material"
import { IconButton, Stack } from "@mui/material"
import { useMeeting } from "@videosdk.live/react-sdk"
import useToken from "../../hooks/useToken"

export default function VideoControllers() {
  const { token } = useToken()
  const { leave, toggleMic, toggleWebcam, localMicOn, localWebcamOn, end } =
    useMeeting()
  return (
    <Stack
      spacing={3}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <IconButton
        onClick={() => {
          if (token.role === "DOCTOR") end()
          else leave()
        }}
      >
        <ExitToApp color="error" />
      </IconButton>
      <IconButton onClick={toggleMic}>
        {localMicOn ? <MicOff /> : <Mic />}
      </IconButton>
      <IconButton onClick={toggleWebcam}>
        {localWebcamOn ? <VideocamOff /> : <Videocam />}
      </IconButton>
    </Stack>
  )
}
