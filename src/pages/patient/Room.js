import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material"
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import VideoClient from "../../api/VideoComAPi"
import VideoContainer from "../../components/videos/VideoContainer"
import { useSnackbar } from "./Patient"

const Room = () => {
  const { username } = useParams()
  const { setSnackbar } = useSnackbar()
  const [room, setRoom] = useState({ status: "loading", data: {} })

  const getRoom = () => {
    setRoom({ status: "loading", data: {} })
    const success = (data) => setRoom({ status: "success", data })
    const error = (message) => {
      setSnackbar({
        open: true,
        children: "Could't find any room: " + message,
        severity: "error",
      })
      setRoom({ status: "error", data: {} })
    }
    VideoClient.get(VideoClient.GET_ROOM + username, success, error)
  }

  useEffect(() => {
    getRoom()
  }, [username])
  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Video Room
      </Typography>
      <br />
      <Box
        width="100%"
        height="70vh"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {room.status === "loading" ? (
          <CircularProgress />
        ) : room.status === "success" ? (
          <MeetingProvider
            config={{
              meetingId: room.data.roomId,
              micEnabled: "true",
              webcamEnabled: "true",
              name: room.data.username,
            }}
            token={room.data.token}
          >
            <MeetingConsumer>
              {() => <VideoContainer user={room.data} />}
            </MeetingConsumer>
          </MeetingProvider>
        ) : (
          <Stack spacing={3}>
            <Typography>
              Sorry doctor {username} has't started the session yet yet
            </Typography>
            <Button onClick={() => getRoom()}>Try againe</Button>
          </Stack>
        )}
      </Box>
    </>
  )
}

export default Room
