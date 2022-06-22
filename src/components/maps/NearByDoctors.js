import {
  Box,
  Button,
  Paper,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { Circle, MapContainer, Marker, Popup } from "react-leaflet"
import useToken from "../../hooks/useToken"
import DoctorsIcon, { point } from "./icons"
import MapTiles from "./MapTiles"
import { useEffect, useState } from "react"
import axios from "axios"
import Config from "../../api/Config"
import mick from "../../api/Scheduler"
import { useSnackbar } from "../../pages/patient/Patient"
import { LoadingButton } from "@mui/lab"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"

const NearByDoctors = ({ handleClose, apply }) => {
  const [user, setUser] = useState({ loading: true, data: {} })
  const [doctors, setDoctors] = useState({ loading: false, row: [] })
  const [value, setValue] = useState(10000)
  const { token } = useToken()
  const { setSnackbar } = useSnackbar()

  const getDoctors = (km, data) => {
    let dis = Number(km) / 1000
    setDoctors({ ...doctors, loading: true })
    mick
      .get(
        `/doctors/?long=${data.user.latitude}&lat=${data.user.longitude}&km=${dis}`
      )
      .then(({ data: { features } }) => {
        setDoctors({ loading: false, row: features })
      })
      .catch(({ message }) => {
        setSnackbar({
          open: true,
          children: "Could't fetch doctor by location: " + message,
          severity: "error",
        })
      })
  }

  useEffect(() => {
    axios
      .get(`${Config.USER_URL}/id/${token.userId}`)
      .then(({ data }) => {
        setUser({ loading: false, data })
        getDoctors(value, data)
      })
      .catch(({ message }) => {
        handleClose()
        setSnackbar({
          open: true,
          children: "Could't fetch user info: " + message,
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
          <LoadingButton
            loading={doctors.loading}
            onClick={() => {
              getDoctors(value, user.data)
            }}
          >
            Apply
          </LoadingButton>
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
              <DoctorInfo doc={doc} key={k} apply={apply} />
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

function DoctorInfo({ doc, apply }) {
  const [doctor, setDoctor] = useState({ loading: true, data: {} })
  const [dateValue, setDateValue] = useState(null)
  useEffect(() => {
    axios
      .get(`${Config.USER_URL}/id/${doc.id}`)
      .then(({ data }) => {
        setDoctor({ loading: false, data })
      })
      .catch(({ message }) => {})
  }, [])
  console.log(doctor)
  if (doctor.loading) return null
  if (doctor.data)
    return (
      <Marker
        position={[doc.geometry.coordinates[1], doc.geometry.coordinates[0]]}
        icon={DoctorsIcon(doctor.data.user.email)}
      >
        <Popup>
          <Stack spacing={5}>
            <Box>
              <Typography variant="h6" color={"green"}>
                Doctor: {doctor.data.user.firstname}{" "}
                {doctor.data.user.middlename}
              </Typography>
              <Typography variant="h6" color={"GrayText"}>
                {doctor.data.specialization}
              </Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DateTimePicker
                label="Enter Date"
                value={dateValue}
                onChange={(value) => setDateValue(value)}
                renderInput={(parms) => <TextField {...parms} />}
              />
            </LocalizationProvider>
            <Button
              onClick={() => {
                apply(doc.id, dateValue)
              }}
            >
              Apply
            </Button>
          </Stack>
        </Popup>
      </Marker>
    )
}

export default NearByDoctors
