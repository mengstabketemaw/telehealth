import { Delete, Edit } from "@mui/icons-material";
import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { DataGrid, useGridApiRef,GridCellEditStopReasons, useGridApiContext, GridActionsCell, GridActionsCellItem} from "@mui/x-data-grid"
import { useCallback, useState } from "react";
import CustomNoDataOverlay from "../../components/gridComponents/CustomNoDataOverlay";
import CreateNewAppointment from "./appointment/CreateNewAppointment";


const column=[
    {
        field:"name",
        headerName:"Name",
        flex:1,
    },
    {
        field:"specialization",
        headerName:"Specialization",
        flex:1,
    },
    {
        field:"date",
        headerName:"Date",
        type:'dateTime',
        flex:1,
        editable:true,
    },
    {
        field:"actions",
        headerName:"Actions",
        width:100,
        cellClassName:"actions",
        getActions:({id})=>{
            return [
                <GridActionsCellItem
                    icon={<Edit color="secondary"/>}
                   // onClick={handleEdit(id)}
                />,
                <GridActionsCellItem
                    icon={<Delete colot={pink}/>}
                    //onClick={handleClick(id)}
                />
            ]
        }
    }

]


const Appointment = ()=>{
    
    return (<>
    <Typography color="primary" variant="h4" sx={{mb:'20px'}}>Appointments</Typography>
    <div style = {{height:'500px',width:'100%'}}>
    <DataGrid
        experimentalFeatures={{newEditingApi:true}}
        rows={[]}
        columns={column}
        hideFooterPagination
        hideFooterSelectedRowCount
        components={{
            NoRowsOverlay:CustomNoDataOverlay,
            Footer:CreateNewAppointment
        }}
        // loading
    />
    </div>
    </>)
}
export default Appointment;