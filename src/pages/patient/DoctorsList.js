import { Stack, Typography } from "@mui/material"
import Consultants from "../../components/appointment/Consultants"

const DoctorList = () => {
  return (
    <>
      <Stack>
        <br />
        <Typography color="primary" variant="h4">
          Schedule Appointment
        </Typography>
        <br />
        <Consultants />
      </Stack>
    </>
  )
}
export default DoctorList
