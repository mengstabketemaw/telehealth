import { useState } from "react"
import useToken from "../../hooks/useToken"
import PatientProfile from "../doctor/PatientProfile"
import { StompSessionProvider, useSubscription } from "react-stomp-hooks"
import Config from "../../api/Config"

const PatientQueue = () => {
  return (
    <StompSessionProvider url={Config.VIDEOSERVER + "/communication-server"}>
      <SubscriberComponent />
    </StompSessionProvider>
  )
}

function SubscriberComponent() {
  const [user, setUser] = useState({ status: "wating", data: {} })
  const { token } = useToken()

  return <></>
}

export default PatientQueue
