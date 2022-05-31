import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup } from "react-leaflet"
import RoutingMachine from "./createRoutineMachineLayer"
import DoctorsIcon, { point } from "./icons"
import MapTiles from "./MapTiles"

const WhereIsThisPatient = ({ userInfo }) => {
    const [me, setMe] = useState(null);
    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(e => {
            setMe([e.coords.latitude, e.coords.longitude]);
        })
    }, []);
    return <Box style={{ height: "70vh", width: "100%", margin: "10px", border: "2px solid black" }}>
        {me && <MapContainer style={{ height: "100%" }} center={me} zoom={20}>
            <MapTiles />
            <Marker
                position={[userInfo.lat, userInfo.lng]}
                icon={DoctorsIcon(userInfo.username)}
            >
                <Popup>
                    {userInfo.name}
                </Popup>
            </Marker>
            <Marker
                position={me}
                icon={point}
            >
                <Popup>
                    Your are here!
                </Popup>
            </Marker>
            <RoutingMachine me={me} patient={[userInfo.lat, userInfo.lng]} />
        </MapContainer>}
    </Box>
}

export default WhereIsThisPatient;