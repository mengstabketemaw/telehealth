import { Paper } from "@mui/material"
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk"
import { useEffect, useMemo, useRef } from "react"
import ReactPlayer from "react-player"

export default function VideoComponent({ participantId, key }) {
  const micRef = useRef()
  const { participants } = useMeeting()
  const { webcamStream, micStream, webcamOn, micOn, isLocal } =
    useParticipant(participantId)
  const videoStream = useMemo(() => {
    if (webcamOn) {
      const mediaStream = new MediaStream()
      mediaStream.addTrack(webcamStream.track)
      return mediaStream
    }
  }, [webcamOn, webcamStream])

  useEffect(() => {
    if (micRef.current) {
      if (micOn) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(micStream.track)

        micRef.current.srcObject = mediaStream
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          )
      } else {
        micRef.current.srcObject = null
      }
    }
  }, [micStream, micOn])

  let x = isLocal
    ? { position: "fixed", height: "200px", width: "200px" }
    : {
        height: 100 / participantId + "%",
        width: "fit-content",
        margin: 1,
        padding: "20px",
      }

  return (
    <Paper key={participantId} elevation={3} sx={x}>
      {micOn && micRef && <audio ref={micRef} autoPlay />}
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={false}
          playing={true}
          //
          url={videoStream}
          //
          height={"100%"}
          width={"100%"}
          onError={(err) => {
            console.log(err, "participant video error")
          }}
        />
      )}
    </Paper>
  )
}
