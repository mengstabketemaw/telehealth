import { Box, Slider, Stack, Typography } from "@mui/material"
import { Circle, MapContainer, Marker, Popup } from "react-leaflet"
import useToken from "../../hooks/useToken"
import DoctorsIcon from "./icons"
import MapTiles from "./MapTiles"
import { useEffect, useState } from "react"
import axios from "axios"
import Config from "../../api/Config"
import { useSnackbar } from "../../pages/patient/Patient"
import { LoadingButton } from "@mui/lab"

const NearByDoctors = ({ handleClose }) => {
  const [user, setUser] = useState({ loading: true, data: {} })
  const [doctors, setDoctors] = useState({ loading: false, row: [] })
  const [value, setValue] = useState("")
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
        <Stack spacing={5} style={{ padding: 12 }} width={"200px"}>
          <Stack>
            <Typography>Distance your Location</Typography>
            <Slider
              min={1}
              max={20000}
              valueLabelDisplay={"auto"}
              value={value}
              onChange={(e, v) => setValue(v)}
            />
            <Typography variant="caption" fontSize={10} color={"InfoText"}>
              Distance: {value / 1000}km
            </Typography>
          </Stack>
          <LoadingButton loading={doctors.loading}>Apply</LoadingButton>
        </Stack>
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
            {doctors.row.map((doc, k) => (
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
              radius={value}
            />
          </MapContainer>
        </Box>
      </Stack>
    )
}

export default NearByDoctors
