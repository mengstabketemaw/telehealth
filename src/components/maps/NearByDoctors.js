import { Box, Stack } from "@mui/material"
import { Circle, MapContainer, Marker, Popup } from "react-leaflet"
import Filter from "./Filter"
import DoctorsIcon from "./icons"
import MapTiles from "./MapTiles"
import SearchWrapper, { useSearch } from "./SearchWrapper"

const NearByDoctors = () => {
  const { doctors, filterState } = useSearch()
  return (
    <Stack direction={"row"}>
      <Filter />
      <Box
        style={{
          height: "70vh",
          width: "100%",
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
          {doctors.map((doc, k) => (
            <Marker
              position={[doc.lat, doc.lng]}
              icon={DoctorsIcon(doc.username)}
              key={k}
            >
              <Popup>{doc.name}</Popup>
            </Marker>
          ))}
          <Circle
            center={[8.9806034, 38.7577605]}
            pathOptions={{ fillColor: "blue", weight: 1 }}
            radius={filterState.distance}
          />
        </MapContainer>
      </Box>
    </Stack>
  )
}
export default NearByDoctors
