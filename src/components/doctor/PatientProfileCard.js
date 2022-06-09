import { FiberManualRecord } from "@mui/icons-material"
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material"
import { useState } from "react"
import Config from "../../api/Config"
import PatientProfile from "./PatientProfile"

const PatientProfileCard = ({ username, onView, open, handleClose }) => {
  //we can fetch more about the user from the auth server, like it full name instade of there username,
  //but we have to configure the autht server
  return (
    <>
      <Stack direction="row" spacing={3} padding={2}>
        <Avatar src={`${Config.USER_URL}/avatar/${username}`} />
        <Typography color="InfoText" variant="h6">
          {username}
        </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <FiberManualRecord sx={{ fontSize: "small" }} color={"error"} />
      </Stack>
      <Stack direction="row" spacing={3} paddingRight={3}>
        <Button onClick={onView}>View</Button>
        {/* <Button>REMOVE</Button> */}
        <Box sx={{ flexGrow: 1 }}></Box>
        <Typography>2:30</Typography>
      </Stack>
      <Divider />
      {open && (
        <PatientProfile
          open={open}
          handleClose={handleClose}
          username={username}
        />
      )}
    </>
  )
}
export default PatientProfileCard
