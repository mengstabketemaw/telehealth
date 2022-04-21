import { Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useState } from "react";
import client from "../api/client";

const ForgetPasswordDialog = ({ open, handleClose }) => {
    const [data, setData] = useState({ status: "none",openback:false, error: "none" })
    const [email,setEmail] = useState("");

    const handleSend = () =>{
        console.log(data)
        setData({...data,status:"loading",openback:true})
        client.post("",email)
        .then(response=>{
            setData(data=>({...data,status:"success"}))
    
        })
        .catch((error)=>{
            console.log(data)
            setData(data=>({...data,status:"error",error:error}))
        })
        
    }


    return (<>
    <Backdrop  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 200 }} open={data.openback}>
        {
        data.status==="loading"?<CircularProgress/>:
        data.status==="rejected"?<Alert severity="error">Could't Performe the request {data.error}</Alert>:
        <Alert severity="success" >Email has been sent to you email accoun, follow the instruction for further guidance!</Alert>
        }
    </Backdrop>

    <Dialog
        open={open}
        onClose={() => handleClose(false)}
    >
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
            <DialogContentText>To Reset your password, please enter your email address here. we will send you link to rest your password.</DialogContentText>
            <TextField
                autoFocus
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                margin="dense"
                label="Email address"
                type={"email"}
                fullWidth
                variant="standard"
            />
            <DialogActions>
                <Button onClick={handleSend}>Send Link</Button>
                <Button onClick={() => handleClose(false)}>Cancel</Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
    
    </>
    )
}
export default ForgetPasswordDialog;