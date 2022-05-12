import { FiberManualRecord } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";

const PatientProfileCard = (props)=>{
    //i think it is the perfect place to fetch data from the communication module inside this component
    //we can get if the patient is active or nor, or we can fetch other data 
    return(<>
    <Stack direction="row" spacing={3} padding={2}>
        <Avatar src={props.img}>{props?.name[0].toUpperCase()}</Avatar>
        <Typography color="InfoText" variant="h6">{props.name}</Typography>
        <Box sx={{flexGrow:1}}></Box>
        <FiberManualRecord sx={{fontSize:"small"}}color={"error"}/>
    </Stack>
    <Stack direction="row" spacing={3} paddingRight={3}>
        <Button onClick={props.onView}>View</Button>
        {/* <Button>REMOVE</Button> */}
        <Box sx={{flexGrow:1}}></Box>
        <Typography>2:30</Typography>
    </Stack>
    <Divider/>
    </>)
}
export default PatientProfileCard;