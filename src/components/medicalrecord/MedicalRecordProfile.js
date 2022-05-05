import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Grid } from '@mui/material';
import { FileViewer } from 'react-file-viewer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
              Medical Record
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container padding={5} spacing={3}>
            <Grid xs={1} item>
                <Typography>date</Typography>
            </Grid>
            <Grid xs={11} item>
                <Typography>12-02-2014</Typography>
            </Grid>
            <Grid xs={1} item>
                <Typography>Describtion</Typography>
            </Grid>
            <Grid xs={11} item>
                <Typography>Lorem ipsum meta grb aferfe as  s fesfe</Typography>
            </Grid>
            <Grid xs={1} item>
                <Typography>Added by</Typography>
            </Grid>
            <Grid xs={11} item>
                <Typography>You</Typography>
            </Grid>
            <Grid xs={12} item>
                <FileViewer
                    fileType={"image/png"}
                    filePath={"file:///C:/Users/Public/Pictures/Sample Pictures/mengstab.png"}
                />
            </Grid>
            
        </Grid>
      </Dialog>
    </div>
  );
}
