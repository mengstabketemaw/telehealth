import {Stack,Button} from "@mui/material"
import {Add} from "@mui/icons-material"

const CreateNewAppointment = () =>{
    return <>
    <Stack direction="row" justifyContent="flex-end">
        <Button
            startIcon={<Add/>}
        >
            Schedule new Appointment
        </Button>
    </Stack>
    </>
}
export default CreateNewAppointment;