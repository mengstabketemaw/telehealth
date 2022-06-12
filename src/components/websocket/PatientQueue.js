import { useEffect, useState } from "react"
import useToken from "../../hooks/useToken"
import PatientProfileCard from "../doctor/PatientProfileCard"
import { StompSessionProvider, useSubscription } from "react-stomp-hooks"
import Config from "../../api/Config"
import { Typography } from "@mui/material"
import { useSnackbar } from "../../pages/doctor/Doctor"

const PatientQueue = ({ open, handleClose, onView }) => {
  const { token } = useToken()
  return (
    <StompSessionProvider
      connectHeaders={{ username: token.username, type: "doctor" }}
      url={Config.VIDEOSERVER + "/communication-server"}
    >
      <SubscriberComponent
        open={open}
        handleClose={handleClose}
        onView={onView}
      />
    </StompSessionProvider>
  )
}

function SubscriberComponent({ onView, open, handleClose }) {
  const [user, setUser] = useState({ status: "wating", data: {} })
  const { token } = useToken()

  //get message if patient enter VDT room.
  useSubscription("/user/" + token.username + "/msg", ({ body }) => {
    const message = JSON.parse(body)
    setUser({ status: "found", data: message })
  })

  return user.status === "wating" ? (
    <Typography>Wating for patient . . .</Typography>
  ) : (
    <PatientProfileCard
      username={user.data.username}
      onView={onView}
      open={open}
      handleClose={handleClose}
    />
  )
}

export default PatientQueue
