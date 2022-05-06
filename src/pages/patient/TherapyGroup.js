import { Delete, VideoCall } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import TherapyGroupList from "../../components/therapygroup/TherapyGroupList";
import { useSnackbar } from "./Patient";

const TherapyGroup = ()=>{
    const [data,setData] = useState({rows:[],loading:true});
    const [openDialog,setOpenDialog] = useState(false);
    const [deleteDialog,setDeleteDialog] = useState({open:false,row:{}});
    const {setSnackbar} = useSnackbar();

    useEffect(()=>{
        //logic to get all the 
        setData({
            rows:[{id:1,therapy:"Monday",date:"12:20"}],
            loading:false
        })
    },[]);

    const handleDelete = () => {
      //here layi the logic to delete the booked appointment use the delete dialog row
      setDeleteDialog({open:false,row:{}})
      setSnackbar({open:true,children:"Delete operation was unsuccessful"+deleteDialog.row,severity:"error"})
    }
    const handleJoin = () => {}
    const column=[
        {
            field:"therapy",
            headersName:"Therapy",
            flex:1
        },
        {
            field:"date",
            headersName:"Data Time",
            flex:1
        },
        {
            field:"actions",
            type:"actions",
            getActions:({row})=>{
                return [
                    <GridActionsCellItem
                        icon={<Delete/>}
                        label={"Delete"}
                        onClick={()=>setDeleteDialog({open:true,row})}
                    />,
                    <GridActionsCellItem
                        icon={<VideoCall/>}
                        label={"Join Table"}
                        onClick={()=>handleJoin(row)}
                        showInMenu
                    />
                ]
            }
        }
    ]
    return (<>
    <br/>
    <Typography variant="h4" color="primary">Therapy Group</Typography>
    <br/>
    <Stack alignItems="flex-end">
        <div style={{height:"400px",width:"100%"}}>    
            <DataGrid
                rows={data.rows}
                columns={column}
                hideFooter
                loading={data.loading}
            />    
        </div>
        <Button onClick={()=>setOpenDialog(true)}>Book new Therapy</Button>
    </Stack>
    {
        openDialog&&
        <Dialog
            fullWidth
            open
        >
            <DialogTitle>Book new Therapy</DialogTitle>
            <DialogContent dividers>
                <TherapyGroupList setData={setData} handleClose={()=>setOpenDialog(false)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpenDialog(false)}>OK</Button>
            </DialogActions>
        </Dialog>
    }
    {
        deleteDialog.open&&
        <Dialog
            handleClose={()=>setDeleteDialog(false)}
            open
        >
            <DialogTitle>Cancel Reservation for the Therapygroup</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to Cancel the appointment for the therapy group {deleteDialog.row?.therapy}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={handleDelete}>yes</Button>
                <Button onClick={()=>setDeleteDialog(false)}>no</Button>
            </DialogActions>
        </Dialog>
    }
    </>

    )
}
export default TherapyGroup;