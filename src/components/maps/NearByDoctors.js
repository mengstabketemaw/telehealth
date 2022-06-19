import { Box, Stack } from "@mui/material"
import { Circle, MapContainer, Marker, Popup } from "react-leaflet"
import Filter from "./Filter"
import useToken from "../../hooks/useToken"
import DoctorsIcon from "./icons"
import MapTiles from "./MapTiles"
import SearchWrapper, { useSearch } from "./SearchWrapper"
import { useEffect, useState } from "react"
import axios from "axios"
import Config from "../../api/Config"
import { useSnackbar } from "../../pages/patient/Patient"

const NearByDoctors = ({ handleClose }) => {
  const [user, setUser] = useState({ loading: true, data: {} })
  const { doctors, filterState } = useSearch()
  const { token } = useToken()
  const { setSnackbar } = useSnackbar()
  useEffect(() => {
    axios
      .get(`${Config.USER_URL}/id/${token.userId}`)
      .then(({ data }) => {
        setUser({ loading: false, data })
      })
      .catch(({ message }) => {
        handleClose()
        setSnackbar({
          open: true,
          children: "Could't do it: " + message,
          severity: "error",
        })
        setUser({ loading: true })
      })
  }, [])

  if (user.loading) return <p>loading. . .</p>
  if (user.data)
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
            center={[user.data.user.latitude, user.data.user.longitude]}
            zoom={15}
            scrollWheelZoom={true}
          >
            <MapTiles />
            <Marker
              position={[user.data.user.latitude, user.data.user.longitude]}
              icon={DoctorsIcon(user.data.user.email)}
            >
              <Popup>You are Here</Popup>
            </Marker>
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
              center={[user.data.user.latitude, user.data.user.longitude]}
              pathOptions={{ fillColor: "blue", weight: 1 }}
              radius={filterState.distance}
            />
          </MapContainer>
        </Box>
      </Stack>
    )
}
export default NearByDoctors
