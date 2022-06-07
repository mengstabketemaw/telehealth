import { useState } from "react"
import SockJsClient from "react-stomp"
import Config from "../../api/Config"
import useToken from "../../hooks/useToken"

const PatientQueue = () => {
  const [data, setData] = useState({ status: "wating", data: {} })
  const { token } = useToken()

  const onMessage = (message) => {}

  return (
    <>
      <SockJsClient
        url={Config.VIDEOSERVER + "/communication-server"}
        topics={["/user/" + token.username + "/msg"]}
      ></SockJsClient>
    </>
  )
}
export default PatientQueue
