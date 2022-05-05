import { Book, PersonSearch } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CustomNoDataOverlay from "../gridComponents/CustomNoDataOverlay"

const TherapyGroupList = () => {
   const [rows,setRows] = useState([]);
   const [loading,setLoading] = useState(true);

   useEffect(()=>{
       setRows([
           {id:'1',name:'Monday',time:'12:20',number:'12/23'},
           {id:'2',name:'Wednesday',time:'12:20',number:'12/23'},
           {id:'3',name:'Sunday',time:'12:20',number:'12/23'},
        ])
        setLoading(false);
   },[])

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
           field:"number",
           headerName:"Number",
       },
       {
           field:"actions",
           type:"actions",
           getActions:()=>{
               return [
                   <GridActionsCellItem
                        icon={<Book/>}
                        label={"Book Appointment"}
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<PersonSearch/>}
                        label={"Show Therapist"}
                        showInMenu
                    />
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