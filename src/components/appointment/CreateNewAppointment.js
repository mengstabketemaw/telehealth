import {Stack,Button} from "@mui/material"
import {Add} from "@mui/icons-material"
import { useGridApiContext } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom";

const CreateNewAppointment = (props) =>{
    const apiRef = useGridApiContext();
    const nav = useNavigate();
    const handleClick = ()=>{
        nav("/patient/doctorlist/appointment")
    }

    return <>
    <Stack direction="row" justifyContent="flex-end">
        <Button
            onClick={handleClick}
            startIcon={<Add/>}
        >
            Schedule new Appointment
        </Button>
    </Stack>
    </>
}
export default CreateNewAppointment;