import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Avatar } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DoctorProfile({open,handleClose,name,img,specialization,homedoctor,consultation,id,...row}) {
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
              User Profile
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Ok
            </Button>
          </Toolbar>
        </AppBar>
        <Stack alignItems={"center"} spacing={1}>
          <hr/>
          <Avatar src={img||row.avatar} sx={{width:'200px',height:'200px'}}/>
          <Divider/>
          
        </Stack>
      </Dialog>
    </div>
  );
}
