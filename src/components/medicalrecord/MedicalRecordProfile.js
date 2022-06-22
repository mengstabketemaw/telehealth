import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import { Divider, Grid, Stack } from "@mui/material"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const fileViewerFor = (type, fileName) => {
  let url = `http://matiows-001-site1.btempurl.com/api/File/${fileName}`
  let downloadurl = `http://matiows-001-site1.btempurl.com/api/File/download/${fileName}`
  const typ = type?.toLowerCase()
  let view = null
  if (typ?.includes("pdf")) {
    view = <iframe src={url} width={"100%"} height={"1000px"} />
  } else if (typ?.includes("video")) {
    view = (
      <video width="800" height="600" controls>
        <source src={url} />
      </video>
    )
  } else if (typ?.includes("image")) {
    view = <img src={url} height={"auto"} width={"auto"} />
  } else {
    view = (
      <p>
        The file format is not supported{" "}
        <a target="_blank" href={url}>
          download
        </a>{" "}
        the file directly
      </p>
    )
  }
  return view
}

export default function MedicalRecordProfile({ open, handleClose, ...row }) {
  //find the location, available slot for appointment and other purposes.
  React.useEffect(() => {})

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "fixed" }}>
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
            <Typography color={"GrayText"}>{row.recordDate}</Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography>Describtion</Typography>
          </Grid>
          <Grid xs={11} item>
            <Typography color={"GrayText"}>{row.desc}</Typography>
          </Grid>
          <Grid xs={12} item>
            <Typography>File</Typography>
            {fileViewerFor(row.type, row.fileName)}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  )
}
