import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Avatar, Box, CircularProgress, Dialog, DialogTitle,DialogContent,DialogActions, TextField, Grid } from '@mui/material';
import client from '../../api/client';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PatientProfile(props) {
    const [profile,setProfile] = React.useState({loading:true});
    const [medicalRecord,setMedicalRecord] = React.useState({loading:true,row:[]})
    const [prescribe,setPrescribe] = React.useState({open:false});
    const [report,setReport] = React.useState({open:false});
    
    React.useEffect(()=>{
        client.post()
        .then(()=>{
            setProfile({loading:false})
            setMedicalRecord({loading:false,row:[
                {id:1,date:"1999-12-2",desc:"X ray for my ribe",type:"image/png"},
                {id:2,date:"1999-11-2",desc:"Rage for my elbow",type:"video/mp4"},
                {id:3,date:"2012-12-3",desc:"Medical Prescription",type:"E-prescription"},
            ]})
        });
    })

    const column=[
        {
            field:"date",
            headerName:"Date",
            type:"date",
            flex:0.5
        },
        {
            field:"desc",
            headerName:"Describtion",
            flex:1
        },
        {
            field:"type",
            headerName:"Type",
            flex:0.5
        },
        {
            field:"actions",
            type:"actions",
            getActions:({row})=>{
                return [
                    <GridActionsCellItem
                        label={"Show In Detaile"}
                        showInMenu
                    />
                ]
            }
        }
    ]

    const handlePrescribeMedicine = () =>{
        console.log(prescribe);
    }

    const handleChangePrescribtion = (type) => (event) =>{
        setPrescribe(state=>({
            ...state,
            [type]:event.target.evalue
        }))
    }


   return (
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Patient Profile
            </Typography>
            <Button autoFocus color="inherit" onClick={props.handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Box height={"100px"}><br/><br/><br/></Box>
        <Stack alignItems={"center"} spacing={1}>
            <hr/>
            <Avatar src={props.img} sx={{width:'200px',height:'200px'}}/>
            <Divider variant='middle' width={"50%"}/>
                {
                    profile.loading?<CircularProgress/>:<>
                    <Typography>Patient full name</Typography>
                    <Typography>Male</Typography>
                    <Typography>30 years old</Typography>
                    <Typography>Single</Typography>
                    </>
                }
            <Divider variant='middle' width={"50%"}/>
            <Typography variant='h5' color="primary">Medical Informations</Typography>
            <div style={{width:"90%",height:"500px"}}>
                <DataGrid
                    loading={medicalRecord.loading}
                    rows={medicalRecord.row}
                    columns={column}
                    hideFooter
                />
            </div>
            <Stack direction="row" justifyContent="flex-end" spacing={3} width={"90%"} padding={5}>
                <Button variant="contained" onClick={()=>setPrescribe({open:true})}>Prescribe medicne</Button>
                <Button variant="outlined">Add report</Button>
            </Stack>
            <Dialog
                open={prescribe.open}
            >
                <DialogTitle>Prescribe Medicine</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                label={"Drug Name"}
                                value={prescribe?.name}
                                onChange={handleChangePrescribtion("name")}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label={"Strength"}
                                value={prescribe?.strength}
                                onChange={handlePrescribeMedicine("strength")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label={"Sig"}
                                value={prescribe?.sig}
                                onChange={handleChangePrescribtion("sig")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label={"Qty"}
                                value={prescribe?.qty}
                                onChange={handleChangePrescribtion("qty")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label={"Memo"}
                                value={prescribe?.memo}
                                onChange={handleChangePrescribtion("memo")}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePrescribeMedicine}>OK</Button>
                    <Button onClick={()=>setPrescribe({open:false})}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Stack>
      </Dialog>
  );
}
