import { Groups, MedicalServices, Medication, VideoCall } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = ()=>{
   const nav = useNavigate();

   
   
   const createBox = (icon,name,no,i)=>{
   return (<Box 
      onClick={e=>nav(name.toLowerCase().replace(" ",""))} 
      key={i}
      sx={{
        display:'flex',
        width:'200px',
        padding:'20px',
        border:1,
        borderColor:'divider',
        margin:'2px',
        boxShadow:'0px 1px 10px gray',
        '&:hover': {
            backgroundColor: 'primary',
            opacity: [0.9, 0.8, 0.7],
        },
        '&:active': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
        },
    }}>
        {icon}
        <Stack direction="column" sx={{ml:'5px'}}>
            <Typography>{name}</Typography>
            <Typography color="primary">{no}</Typography>
        </Stack>
    </Box>)
    }
    
    const allIconProps = {
        sx:{fontSize:'50px'},
        color:'primary'
    }

   return (<>
    <Box sx={{ justifyContent:'space-between',display:'flex',direction:'row',width:'100%',}}>
        {
            [{icon:<MedicalServices {...allIconProps}/>,name:'Appointment',no:3},
            {icon:<VideoCall {...allIconProps}/>,name:'Vdt',no:1},
            {icon:<Groups {...allIconProps}/>,name:'Therapy Group',no:1},
            {icon:<Medication {...allIconProps}/>,name:'Medical Record',no:12},
            ].map((e,i)=>{
                return createBox(e.icon,e.name,e.no,i)
            })
        }
    </Box>    
    <Outlet/>
    </>
    )
}
export default Dashboard;