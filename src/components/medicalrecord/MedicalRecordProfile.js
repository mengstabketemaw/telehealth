import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Divider, Grid, Stack } from '@mui/material';
import QRCode from "react-qr-code";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fileViewerFor = (file) => {
      console.log(file);
      let type = file?.type;
      let url = file?.url;
      const typ =type?.toLowerCase();
      let view = null;
      if(typ?.includes("pdf")){
        view=<iframe src={url} width={"100%"} height={"1000px"}/>
      }
      else if(typ?.includes("video")){
        view = <video controls width={"auto"} ><source src={url} type={type}/></video>
      }
      else if(typ?.includes("image")){
        view = <img src={url} height={"auto"} width={"auto"}/>;
      }
      else if(type?.includes("prescribtion")){
        //get the prescribtion detaile using the url or the id 
        //
        view = <>
        <Stack>
          <br/>
          <Divider/>
          <Typography variant='h3'>E-Prescribtion</Typography>
          <Divider/>
          <br/>
          <Typography variant='h5' color="InfoText">for Sample D.Patient</Typography>
          <br/>
          <Typography variant='h6'>New order: Omeprazol 40 mg Cap delayed rel</Typography>
          <Typography>Sig: 1 capsule orally daily</Typography>
          <Typography>Qty: 1(one) unit not specified</Typography>
          <Typography>the dispense approved, plus an additional 0 refill(s). Substitution is allowed.</Typography>
          <br/>
          <QRCode value={url}/>
          <br/>
          <br/>
          <Button sx={{width:"200px"}} variant='contained'>Download QRCode</Button>
        </Stack>
        </>
      }
      else{
        view = <p>The file format is not supported <a href={url}>download</a> the file directly</p>
      }
    return view;

}


export default function MedicalRecordProfile({open,handleClose,...row}) {
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
            <Grid xs={11} item>
                <Typography color={"GrayText"}>{row.date}</Typography>
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
            </Grid>
            <Grid xs={12} item>
              <Typography>File</Typography>
               {
                 fileViewerFor(row.file)
               }
            </Grid>
            
        </Grid>
      </Dialog>
    </div>
  );
}
