import * as React from 'react';
import { AppBar, Button, Dialog, IconButton, Divider, Grid, Stack, Slide, TextField, Typography, Toolbar } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useSnackbar } from "./Patient";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Prescription = ({ handleClose })=>{
    const [data,setData] = useState({row:[],loading:true})
    const {setSnackbar} = useSnackbar();
    const [open,setOpen] = useState(false);
    const [viewDetaile,setViewDetaile] = useState({open:false});
    const [record,setRecord] = useState({desc:"",file:""});

    useEffect(()=>{

        //get the prescription here
        setData({
            row:[{id:1,date:'12/12/2014',drug:"Omeprazol", status:"Prescribed",remark:"This"}],
            loading:false
        })

    },[])
    const handleShowItem = (row) =>{
        setViewDetaile({...row,open:true,handleClose:()=>setViewDetaile({...viewDetaile,open:false})})
    }

    const column = [
    {
        field:"date",
        headerName:"Date",
        flex:1,
        type:"date"
    },
    {
        field:"drug",
        headerName:"Type",
        flex:1,
    },
    {
        field:"status",
        headerName:"Type",
        flex:1,
    },
    {
        field:"remark",
        headerName:"Remark",
        flex:1,
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
    </Stack>
    
    {viewDetaile.open&&
        <>
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'fixed' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Medical Record
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              OK
            </Button>
          </Toolbar>
        </AppBar>
        
        <Grid container padding={5} spacing={3}>
            <Grid xs={1} item>
                <Typography>Date</Typography>
            </Grid>
            {/* <Grid xs={11} item>
                <Typography color={"GrayText"}>{row[0].date}</Typography>
            </Grid>
            <Grid xs={1} item>
                <Typography>Describtion</Typography>
            </Grid>
            <Grid xs={11} item>
                <Typography color={"GrayText"}>{row.describtion}</Typography>
            </Grid>
            <Grid xs={1} item>
                <Typography>Added by</Typography>
            </Grid>
            <Grid xs={11} item>
                <Typography color={"GrayText"}>{row.addedby}</Typography>
            </Grid> */}
        </Grid>
      </Dialog>
        </>
    }  
  </>
 )
}
export default Prescription;