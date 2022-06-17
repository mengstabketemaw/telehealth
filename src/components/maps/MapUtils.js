import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, useMap, useMapEvents } from "react-leaflet"
import MapTiles from "./MapTiles"
import { point } from "./icons"
import { Box } from "@mui/system"
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { Button, Stack, Tooltip, Typography } from "@mui/material"

const UserMarkerExp = forwardRef((props, ref) => {
  const [position, setPosition] = useState({ lat: 9.0079232, lng: 38.7678208 })
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng)
      map.setView(e.latlng, map.getZoom())
    },
  })
  useEffect(() => {
    map.locate()
  }, [])

  useImperativeHandle(ref, () => ({
    save(callback) {
      callback(position.lat, position.lng)
    },
    reset() {
      map.locate()
    },
  }))

  return (
    <Marker
      position={Object.values(position)}
      icon={point}
      draggable={true}
      eventHandlers={{
        move(e) {
          setPosition(e.latlng)
        },
        dragend(e) {
          map.setView(position)
        },
      }}
    ></Marker>
  )
})

const ChooseLocation = ({ setLocation }) => {
  const child = useRef()
  const handleReset = () => {
    child.current.reset()
  }
  const handleSave = () => {
    child.current.save(setLocation)
  }

  return (
    <>
      <Box
        style={{
          height: "fit-content",
          padding: "30px",
          width: "700px",
          border: "2px solid black",
          flexGrow: 1,
        }}
      >
        <Typography textAlign={"center"} variant="h4" color="InfoText">
          Choose Your Location
        </Typography>
        <Typography variant="h6" color="InfoText">
          Drag the marker to Your Home Location
        </Typography>
        <Box style={{ height: "100%", width: "100%", display: "flex" }}>
          <Box
            style={{
              height: "300px",
              width: "500px",
              margin: "10px",
              border: "2px solid black",
            }}
          >
            <MapContainer
              style={{ height: "100%" }}
              center={[8, 38]}
              zoom={20}
              scrollWheelZoom={true}
            >
              <MapTiles />
              <UserMarkerExp ref={child} />
            </MapContainer>
          </Box>
          <Stack>
            <Tooltip title="Map to You Location">
              <Button onClick={handleReset}>RESET</Button>
            </Tooltip>
            <Button onClick={handleSave} variant="contained">
              SAVE
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default ChooseLocation
