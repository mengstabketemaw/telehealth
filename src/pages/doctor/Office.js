import { useState } from "react"
import { OnlinePrediction } from "@mui/icons-material"
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material"
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk"
import { useSnackbar } from "./Doctor"
import VideoClient from "../../api/VideoComAPi"
import useToken from "../../hooks/useToken"
import VideoContainer from "../../components/videos/VideoContainer"
import PatientQueue from "../../components/websocket/PatientQueue"

const Office = () => {
  const [profile, setProfile] = useState({ open: false, data: {} })
  const { setSnackbar } = useSnackbar()
  const { token } = useToken()
  const [room, setRoom] = useState({ status: "idle", data: {} }) //status:- idle,created,loading,error

  const handleStartSession = () => {
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
      { username: token.username, type: "vdt" },
      VideoClient.CREATE_ROOM,
      success,
      failure
    )
  }
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
          {room.status === "idle" ? (
            <Typography variant="h6" color="InfoText">
              Start The session when you are ready!!!
            </Typography>
          ) : room.status === "loading" ? (
            <CircularProgress />
          ) : room.status === "error" ? (
            <Typography variant="h6" color="error">
              There was error while creating room, try agine.
            </Typography>
          ) : (
            <>
              <MeetingProvider
                config={{
                  meetingId: room.data.meetingId,
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
          )}
        </Box>
        <Box
          sx={{
            width: "39%",
            height: "100%",
            flexGrow: "1",
            overflow: "scroll",
          }}
        >
          <PatientQueue
            open={profile.open}
            onView={() => setProfile({ open: true })}
            handleClose={() => setProfile({ open: false })}
          />
        </Box>
      </Box>
      <Stack padding={1} direction="row" spacing={3} alignItems="center">
        <OnlinePrediction
          color={room.status === "created" ? "success" : "error"}
        />
        <Typography color="InfoText">
          {room.status === "created" ? "online" : "offline"}
        </Typography>
        <Button
          variant={"contained"}
          onClick={handleStartSession}
          color={room.status === "created" ? "error" : "primary"}
        >
          {!room.status !== "created" ? "START SESSION" : "STOP SESSION"}
        </Button>
      </Stack>
    </>
  )
}
export default Office
