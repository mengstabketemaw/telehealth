import { Box } from '@mui/system';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, LayerGroup, LayersControl, Circle, FeatureGroup, Rectangle } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { useEffect, useState } from 'react';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow
});

const findLocation = (callback) => {
  window.navigator.geolocation.getCurrentPosition(e => {
    callback({
      lat: e.coords.latitude,
      lng: e.coords.longitude
    });
  })
}

const ChooseLocation = ({ setLocation }) => {
  const [position, setPosition] = useState(null)
  useEffect(() => {
    findLocation(e => setPosition(e))
  }, [setLocation])

  const handleReset = () => {
    findLocation(e => setPosition(e))
  }

  const handleSave = () => {
    setLocation(position.lat, position.lng);
  }

  function LocationMarker({ position }) {

    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
      locationfound(e) {
        console.log(position);
        map.flyTo(e.latlng, map.getZoom());
      },

    })

    useEffect(() => {
      position && map.flyTo(position, map.getZoom())
    }, [position])

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return <>
    <Box style={{ height: "fit-content", padding: "30px", width: "700px", border: "2px solid black", flexGrow: 1 }}>
      <Typography textAlign={"center"} variant='h4' color="InfoText">Choose Your Location</Typography>
      <Typography variant='h6' color="InfoText">Click on the map to Mark Your Location</Typography>
      <Box style={{ height: "100%", width: "100%", display: "flex" }}>
        <Box style={{ height: "300px", width: "500px", margin: "10px", border: "2px solid black" }}>
          <MapContainer style={{ height: "100%" }} center={[9.0079232, 38.7678208]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} />
          </MapContainer>
          <Typography>lat:{position?.lat}, lng:{position?.lng}</Typography>
        </Box>
        <Stack>
          <Tooltip title="Map to You Location">
            <Button onClick={handleReset}>RESET</Button>
          </Tooltip>
          <Button onClick={handleSave} variant='contained'>SAVE</Button>
        </Stack>
      </Box>
    </Box>
  </>
}


const ShowLocations = ({ users }) => {
  const center = [51.505, -0.09]
  const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
  ]
  return (<Box style={{ height: "100%", width: "100%", display: "flex" }}>
    <Box style={{ height: "500px", width: "100%", margin: "10px", border: "2px solid black" }}>
      <MapContainer style={{ height: "100%" }} center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Marker with popup">
            <Marker position={center} icon={icon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Layer group with circles">
            <LayerGroup>
              <Circle
                center={center}
                pathOptions={{ fillColor: 'blue' }}
                radius={200}
              />
              <Circle
                center={center}
                pathOptions={{ fillColor: 'red' }}
                radius={100}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={[51.51, -0.08]}
                  pathOptions={{ color: 'green', fillColor: 'green' }}
                  radius={100}
                />
              </LayerGroup>
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Feature group">
            <FeatureGroup pathOptions={{ color: 'purple' }}>
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <LayersControl position='bottomright'>
          <LayersControl.Overlay>
            <button>this is button</button>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </Box>
  </Box>)
}




export { ShowLocations };
















export default ChooseLocation;





