import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Typography,Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText,Button } from "@mui/material";
import { DataGrid, GridActionsCellItem} from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import CustomNoDataOverlay from "../../components/gridComponents/CustomNoDataOverlay";
import CreateNewAppointment from "../../components/appointment/CreateNewAppointment";
import { randomeUser } from "../../api/client";
import DoctorProfile from "../../components/appointment/DoctorProfile";
import Client from "../../api/client"
import {useSnackbar} from "./Patient"

const Appointment = ()=>{
    const [data,setData] = useState({rows:[],loading:true});
    const [profile,setProfile] = useState({open:false})
    const [deleteAppointment, setDeleteAppointment] = useState({open:false});
    const {setSnackbar} = useSnackbar();

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

    const handleEdit = (row) =>{
        const consultation = row.type.includes("tation");
        const homedoctor = row.type.includes("ome");
        setProfile({open:true,handleClose:()=>setProfile({open:false}),...row,consultation,homedoctor})
    }
    const handleDelete = () =>{
        setDeleteAppointment({open:false})
        setData({...data,loading:true})
        Client.post()
        .then(()=>{
        //data must be fetched from the server
        setData({...data,loading:false})
        setSnackbar({open:true,children:"Appointment has been canceled",severity:"success"})
        })
    }
   

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
            getActions:({row})=>{
                return [
                    <GridActionsCellItem
                        icon={<Edit color="secondary"/>}
                        label={"Edit"}
                        onClick={()=>handleEdit(row)}
                    />,
                    <GridActionsCellItem
                        icon={<Delete/>}
                        label={"Delete"}
                        onClick={()=>setDeleteAppointment({open:true,row})}
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
    <DoctorProfile {...profile}/>
    {deleteAppointment.open&&
        <Dialog open onClose={()=>setDeleteAppointment({open:false})}>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to cance your schedule with <strong>Dr. {deleteAppointment?.row?.name}</strong></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleDelete}>Yes</Button>
                <Button color="success" onClick={()=>setDeleteAppointment({open:false})}>no</Button>    
            </DialogActions>
        </Dialog>
    }
    </>)
}
export default Appointment;