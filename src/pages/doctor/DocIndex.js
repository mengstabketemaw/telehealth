import { Box } from '@mui/system';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { useState } from 'react';

const icon = L.icon({ 
    iconRetinaUrl:iconRetina, 
    iconUrl: iconMarker, 
    shadowUrl: iconShadow 
});


const DocIndex = () => {

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}


    return <>
        <h1>React leaf let rutorial</h1>
        <Box style={{height:"300px",width:"500px",border:"2px solid black"}}>
        <MapContainer style={{height:"100%"}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
           <LocationMarker/>
        </MapContainer>
        </Box>
    </>
}
export default DocIndex;