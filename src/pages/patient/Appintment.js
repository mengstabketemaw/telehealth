import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem} from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import CustomNoDataOverlay from "../../components/gridComponents/CustomNoDataOverlay";
import CreateNewAppointment from "../../components/appointment/CreateNewAppointment";
import { randomeUser } from "../../api/client";


const Appointment = ()=>{
    const [data,setData] = useState({rows:[],loading:true});
    useEffect(()=>{
        randomeUser.get()
        .then(response=>response.data.results)
        .then((response)=>{
            setData({rows:response.map((e,i)=>{
                return {
                    id:i,
                    name:`${e.name.title} ${e.name.first} ${e.name.last}`,
                    specialization:e.email,
                    avatar:e.picture.large,
                    date:e.registered.date,
                    type:e.gender==="male"?"Consultation":"Home Appointment",
                }
            }),loading:false})
            
        })
    },[])

    const handleEdit = () =>{}
    const handleClick = () =>{}

    const column=[
        {
            field:"avatar",
            headerName:"Avatar",
            renderCell:({value})=>{
                return <Avatar src={value} sx={{width:'60px',height:'60px'}}/>
            }
        },
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
        },
        {
            field:"type",
            headerName:"Type",
            flex:0.7
        },
        {
            field:"actions",
            headerName:"Actions",
            type:"actions",
            width:100,
            cellClassName:"actions",
            getActions:({id})=>{
                return [
                    <GridActionsCellItem
                        icon={<Edit color="secondary"/>}
                        label={"Edit"}
                        onClick={handleEdit(id)}
                    />,
                    <GridActionsCellItem
                        icon={<Delete/>}
                        label={"Delete"}
                        onClick={handleClick(id)}
                    />
                ]
            }
        }
    
    ]


    

    return (<>
    <Typography color="primary" variant="h4" sx={{mb:'20px'}}>Appointments</Typography>
    <div style = {{height:'70vh',width:'100%'}}>
    <DataGrid
        experimentalFeatures={{newEditingApi:true}}
        rowHeight={100}
        rows={data.rows}
        columns={column}
        hideFooterPagination
        hideFooterSelectedRowCount
        components={{
            NoRowsOverlay:CustomNoDataOverlay,
            Footer:CreateNewAppointment
        }}
        loading={data.loading}
    />
    </div>
    </>)
}
export default Appointment;