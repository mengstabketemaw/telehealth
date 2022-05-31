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
        <div key={props.participantId}>
            {micOn && micRef && <audio ref={micRef} autoPlay />}
            {webcamOn && (
                <ReactPlayer
                    //
                    playsinline // very very imp prop
                    pip={false}
                    light={false}
                    controls={true}
                    muted={true}
                    playing={true}
                    //
                    url={videoStream}
                    //
                    height={"100px"}
                    width={"100px"}
                    onError={(err) => {
                        console.log(err, "participant video error");
                    }}
                />
            )}
        </div>
    );
}