import { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk"
import { useSnackbar } from "./Doctor"
import VideoClient from "../../api/VideoComAPi"
import useToken from "../../hooks/useToken"
import VideoContainer from "../../components/videos/VideoContainer"
import PatientQueue from "../../components/websocket/PatientQueue"
import Config from "../../api/Config"
import { StompSessionProvider } from "react-stomp-hooks"

const Office = () => {
  const { token } = useToken()
  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Virtual Office.
      </Typography>
      <br />
      <Box
        sx={{
          width: "100%",
          height: "70vh",
          display: "flex",
          flexWrap: "wrap",
          border: "1px solid green",
        }}
      >
        <Box
          sx={{
            width: "60%",
            height: "100%",
            borderRight: "1px solid green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VdtVideoRoom />
        </Box>
        <Box
          sx={{
            width: "39%",
            height: "100%",
            flexGrow: "1",
            overflow: "scroll",
          }}
        >
          <StompSessionProvider
            connectHeaders={{ username: token.username, type: "doctor" }}
            url={Config.VIDEOSERVER + "/communication-server"}
          >
            <PatientQueue />
          </StompSessionProvider>
        </Box>
      </Box>
    </>
  )
}

function VdtVideoRoom() {
  const { setSnackbar } = useSnackbar()
  const { token } = useToken()
  const [room, setRoom] = useState({ status: "idle", data: {} }) //status:- idle,created,loading,error

  const handleStartSession = () => {
    //start session command
    setRoom({ status: "loading", data: {} })
    const success = (data) => setRoom({ status: "created", data })
    const failure = (message) => {
      setSnackbar({
        open: true,
        children: "Could't start the session: " + message,
        severity: "error",
      })
      setRoom({ status: "error", data: {} })
    }
    VideoClient.post(
      VideoClient.CREATE_ROOM,
      { username: token.username, type: "vdt" },
      success,
      failure
    )
  }

  return room.status === "idle" ? (
    <Typography variant="h6" color="InfoText">
      Start The session when you are ready!!!
      <Button onClick={handleStartSession}>start</Button>
    </Typography>
  ) : room.status === "loading" ? (
    <CircularProgress />
  ) : room.status === "error" ? (
    <>
      <Typography variant="h6" color="error">
        There was error while creating room, try agine.
      </Typography>
      <Button onClick={handleStartSession}>try again</Button>
    </>
  ) : (
    <>
      <MeetingProvider
        config={{
          meetingId: room.data.roomId,
          micEnabled: "true",
          webcamEnabled: "true",
          name: token.username,
        }}
        token={room.data.token}
      >
        <MeetingConsumer>
          {() => <VideoContainer user={room.data} />}
        </MeetingConsumer>
      </MeetingProvider>
    </>
  )
}
export default Office
