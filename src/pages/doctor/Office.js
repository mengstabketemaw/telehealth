import { Box, Typography } from "@mui/material";
import { border } from "@mui/system";

const Office = () => {
    return (<>
    <br/>
    <Typography variant="h4" color="primary">Wellcome to Your Virtual Office Sir.</Typography>
    <br/>
    <Box sx={{width:"100%",height:"70vh",display:"flex",flexWrap:"wrap", border:"1px solid green"}}>
        <Box sx={{width:"60%",height:"100%",borderRight:"1px solid green"}}>

        </Box>
        <Box sx={{width:"auto", height:"100%",border:"1px solid green"}}>

        </Box>
    </Box>
    </>)
}
export default Office;