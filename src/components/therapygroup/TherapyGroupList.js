import { Book, PersonSearch } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CustomNoDataOverlay from "../gridComponents/CustomNoDataOverlay"
import {useSnackbar} from "../../pages/patient/Patient"
import Client from "../../api/client"

const TherapyGroupList = ({setData,handleClose}) => {
   const [rows,setRows] = useState([]);
   const [loading,setLoading] = useState(true);
   const {setSnackbar} = useSnackbar();
 
   useEffect(()=>{
       setRows([
           {id:'1',name:'Monday',time:'12:20',number:'12/23'},
           {id:'2',name:'Wednesday',time:'12:20',number:'12/23'},
           {id:'3',name:'Sunday',time:'12:20',number:'12/23'},
        ])
        setLoading(false);
   },[])
      
   const handleBookAppointment = (row)=>{
    handleClose();
    console.log(row)
    setData(data=>({...data,loading:true}));
    //here lay the logic to book for new appointment 
    Client.post()
    .then((response)=>{
     setData(data=>({...data,loading:false}))
     setSnackbar({open:true,children:"Appointment has been Booked, you can join the conference by clicking on the join, when the time come.",severity:"success"})
    })
   }
   

   const columns=[
       {
           field:"name",
           headerName:"Name",
           flex:1
       },
       {
           field:"time",
           headerName:"Time",
       },
       {
           field:"date",
           headerName:"Date"
       },
       {
           field:"number",
           headerName:"Number",
       },
       {
           field:"actions",
           type:"actions",
           getActions:({row})=>{
               return [
                   <GridActionsCellItem
                        icon={<Book/>}
                        onClick={()=>handleBookAppointment(row)}
                        label={"Book Appointment"}
                        showInMenu
                    />,
               ]
           }
       }


   ]
  
   return <>
    <div style={{height:"500px",width:"100%"}}>
        <DataGrid
            hideFooter
            rows={rows}
            columns={columns}
            loading={loading}
            components={{
                NoResultsOverlay:CustomNoDataOverlay
            }}
        />
    </div> 
    </>
}
export default TherapyGroupList;