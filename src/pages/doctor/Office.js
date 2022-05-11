import { OnlinePrediction } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Profiler, useState } from "react";
import PatientProfile from "../../components/doctor/PatientProfile";
import PatientProfileCard from "../../components/doctor/PatientProfileCard";

const Office = () => {
    const [status,setStatus] = useState({active:false});
    const [profile,setProfile] = useState({open:false});

    const handleStartSession = ()=>{
        setStatus({active:!status.active})
    }
    return (<>
    <br/>
    <Typography variant="h4" color="primary">Virtual Office.</Typography>
    <br/>
    <Box sx={{width:"100%",height:"70vh",display:"flex",flexWrap:"wrap", border:"1px solid green"}}>
        <Box sx={{width:"60%",height:"100%",borderRight:"1px solid green"}}>
            <Box sx={{width:"100px",height:"100px",border:"1px solid red"}}>
                
            </Box>
            
        </Box>
        <Box sx={{width:"39%", height:"100%",flexGrow:"1",overflow:"scroll"}}>
            <Stack justifyContent="center" direction="row">
                <Typography variant="h6" color="InfoText">QUEUE</Typography>
            </Stack>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
            <PatientProfileCard name="mamush" src="image"/>
        </Box>
    </Box>
    <Stack padding={1} direction="row" spacing={3} alignItems="center">
        <OnlinePrediction color={status.active?"success":"error"}/>
        <Typography color="InfoText">{status.active?"online":"offline"}</Typography>
        <Button variant={"contained"} onClick={handleStartSession}
            
        >
            {!status.active?"START SESSION":"STOP SESSION"}
        </Button>
    </Stack>
    <PatientProfile open={profile.open}/>
    </>)
}
export default Office;