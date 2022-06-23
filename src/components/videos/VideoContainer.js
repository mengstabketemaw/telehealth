import { Box, Button, Stack, Typography } from "@mui/material"
import { useMeeting } from "@videosdk.live/react-sdk"
import { useState } from "react"
import VideoComponent from "./VideoComponent"
import VideoControllers from "./VideoControllers"

const VideoContainer = ({ user }) => {
  const [joined, setJoined] = useState(false)
  const { join } = useMeeting()
  const { participants } = useMeeting()
  return (
    <>
      {!joined ? (
        <Stack>
          <Typography>{user.username}</Typography>
          <Typography>{user.type}</Typography>
          <Button
            onClick={() => {
              setJoined(true)
              join()
            }}
          >
            Join
          </Button>
        </Stack>
      ) : (
        <Box sx={{ width: "100%", height: "100%", flexGrow: 1 }}>
          <Box sx={{ width: "100%", height: "90%", display: "flex" }}>
            {[...participants.keys()].map((participantId, key) => (
              <VideoComponent key={key} participantId={participantId} />
            ))}
          </Box>
          <br />
          <VideoControllers />
        </Box>
      )}
    </>
  )
}
export default VideoContainer
