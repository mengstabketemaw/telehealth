import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Avatar, Container, Grid } from '@mui/material';
import {AdapterLuxon} from "@mui/x-date-pickers/AdapterLuxon"
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DoctorProfile({open,handleClose,name,img,specialization,homedoctor,consultation,id,...row}) {
  const [dateValue,setDateValue] = React.useState();
  //find the location, available slot for appointment and other purposes.
  React.useEffect(()=>{})

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
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
              Schedule Appointment
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Stack alignItems={"center"} spacing={1}>
          <hr/>
          <Avatar src={img||row.avatar} sx={{width:'200px',height:'200px'}}/>
          <Divider/>
          <Typography variant='h6'>{name}</Typography>
          <Typography variant='p' color="GrayText">{specialization}</Typography>
          {
            homedoctor?
            <Typography>
              Addis Ababa Ethiopia 
            </Typography>:<></>
          }
          <br/>
          {
            consultation?
          <LocalizationProvider dateAdapter={AdapterLuxon}>    
                <DateTimePicker 
                    label="Choose Consultation Date"
                    value={dateValue}
                    onChange={value=>setDateValue(value)}
                    renderInput={(parms)=><TextField {...parms}/>}
                />
            </LocalizationProvider>:<></>
          }
          <br/>
          {
            homedoctor?<>
            <Typography>Or</Typography>
            <br/>
            <LocalizationProvider dateAdapter={AdapterLuxon}>    
                  <DateTimePicker 
                      label="Choose Home Appointment Date"
                      value={dateValue}
                      onChange={value=>setDateValue(value)}
                      renderInput={(parms)=><TextField {...parms}/>}
                  />
            </LocalizationProvider></>:<></>
          }
        </Stack>
      </Dialog>
    </div>
  );
}
