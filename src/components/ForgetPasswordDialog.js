import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material"
import { useState } from "react"
import client from "../api/client"

const ForgetPasswordDialog = ({ open, handleClose }) => {
  const [data, setData] = useState({
    status: "none",
    openback: false,
    error: "",
  })
  const [email, setEmail] = useState("")

  const handleSend = () => {
    if (!email) return
    setData({ ...data, status: "loading", openback: true })
    client
      .post("", email)
      .then((response) => {
        setData((data) => ({ ...data, status: "success", openback: false }))
      })
      .catch((error) => {
        setData((data) => ({
          ...data,
          status: "error",
          error: error.message,
          openback: false,
        }))
      })
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 200 }}
        open={data.openback}
      >
        <CircularProgress />
      </Backdrop>

      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Reset your password, please enter your email address here. we
            will send you link to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="dense"
            label="Email address"
            type={"email"}
            required
            fullWidth
            variant="standard"
          />
          {data.status === "success" && (
            <Alert severity="success">
              Email has been sent to you account follow the instruction for
              furture guidance!
            </Alert>
          )}
          {data.status === "error" && (
            <Alert severity="error">
              Cannot Performe Operation : {data.error.toString()}!
            </Alert>
          )}
          <DialogActions>
            <Button onClick={handleSend}>Send Link</Button>
            <Button onClick={() => handleClose(false)}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default ForgetPasswordDialog
