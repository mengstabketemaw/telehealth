import { Paper } from "@mui/material";
import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

export default function VideoComponent({ participantId }) {
    const micRef = useRef();
    const { webcamStream, micStream, webcamOn, micOn } = useParticipant(participantId);

    const videoStream = useMemo(() => {
        if (webcamOn) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamOn, webcamStream])

    useEffect(() => {

        if (micRef.current) {
            if (micOn) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn])

    return (
        <Paper key={participantId} elevation={3} sx={{ padding: "1", margin: "20px" }}>
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
                        console.log(err, "participant video error");
                    }}
                />
            )}
        </Paper>
    );
}