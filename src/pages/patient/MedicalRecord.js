import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSnackbar } from "./Patient";


const MedicalRecord = ()=>{
    const [data,setData] = useState({row:[],loading:true})
    const {setSnackbar} = useSnackbar();
    const [open,setOpen] = useState(false);
    const [record,setRecord] = useState({desc:"",file:""});

    useEffect(()=>{

        //get the medical record here 
        setData({
            row:[{id:1,date:'12/12/2014',type:"PDF",describtion:"this is describtion",addedby:"You"}],
            loading:false
        })
        setSnackbar({open:true,children:"This message from medical record",severity:"success"})

    },[])
    const handleShowItem = () =>{}

    const column = [
    {
        field:"date",
        headerName:"Date",
        flex:1,
        type:"date"
    },
    {
        field:"type",
        headerName:"Type",
        flex:1,
    },
    {
        field:"describtion",
        headerName:"Describtion",
        flex:1,
    },
    {
        field:"addedby",
        headerName:"Added By",
        flex:1
    },
    {
        field:"actions",
        type:"actions",
        getActions:(params)=>{
            return [
                <GridActionsCellItem
                    label={"Show Detaile"}
                    onClick={()=>{handleShowItem(params.row)}}
                    showInMenu
                />
            ]
        }
    }
    ]

    const handleSave = ()=>{

    }

    return (<>
    <br/>
    <Typography variant="h4" color="primary">Medical Record</Typography>
    <br/>
    <Stack alignItems={"flex-end"}>
        <div style={{height:"400px",width:"100%"}}>
            <DataGrid
                rows={data.row}
                columns={column}
                loading={data.loading}
                hideFooter
            />
        </div>
        <Button startIcon={<Add/>} onClick={()=>setOpen(true)}>Add New MedicalRecord</Button>
    </Stack>
    <Dialog
        open={open}
    >
        <DialogTitle>Add new MedicalRecord</DialogTitle>
        <DialogContent dividers>
            <Stack margin={5} spacing={4}>
                <TextField
                    value={record.desc}
                    onChange={e=>setRecord({...record,desc:e.target.value})}
                    focused
                    fullWidth
                    label={"Describtion"}   
                />
                <TextField
                    files={[record.file]}
                    onChange={e=>setRecord({...record,file:e.target.files[0]})}
                    focused
                    type={"file"}
                    label={"File"}
                />
            </Stack>
        <DialogContentText>
            File that has been added CANNOT be either modfied or deleted!
        </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={_=>setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
    </Dialog>
    </>
 )
}
export default MedicalRecord;