import { useEffect, useState } from "react"
import useToken from "../../hooks/useToken"
import PatientProfileCard from "../doctor/PatientProfileCard"
import { useSubscription, useStompClient } from "react-stomp-hooks"
import Config from "../../api/Config"
import { CommonComponent } from "../../pages/patient/Vdt"
import { useSnackbar } from "../../pages/doctor/Doctor"
import Chat from "react-simple-chat"
import "react-simple-chat/src/components/index.css"

const PatientQueue = () => {
  const [chats, setChats] = useState([])
  const [patient, setPatient] = useState({ active: false, username: "" })
  const [status, setStatus] = useState({ loading: true, data: {} })
  const { setSnackbar } = useSnackbar()
  const { token } = useToken()
  const stompClient = useStompClient()

  //private message subscription
  useSubscription("/user/" + token.username + "/msg", ({ body }) => {
    const message = JSON.parse(body)
    setSnackbar({
      open: true,
      children: "new patient has joined",
      severity: "info",
    })
    setPatient({ active: true, username: message.username })
  })

  //status subscription
  useSubscription("/topic/status", ({ body }) => {
    const message = JSON.parse(body)
    setStatus({ loading: false, data: message })
    setSnackbar({
      open: true,
      children: "VDT status has changed.",
      severity: "info",
    })
    console.log(message)
  })

  //public chat subscription
  useSubscription("/topic/chat/doctor", ({ body }) => {
    //{from:"email",message:"the message body"}
    setSnackbar({
      open: true,
      children: "new incoming message",
      severity: "info",
    })
    console.log(body)
    console.log(chats)
    const message = JSON.parse(body)

    //my message the one i just sent it.
    if (message.from === token.username) {
      let newmessage = {
        ...message.message,
        id: chats.length + 1,
        user: {
          id: 1,
          avatar: `${Config.USER_URL}/avatar/${token.username}`,
        },
      }
      setChats((chats) => [...chats, newmessage])
      return
    }

    let history = chats.filter((e) => e.username === message.from)

    //this user has sent one or more message prev. so we want to make sure it is not a new user.
    if (history.length > 0) {
      let chechat = {
        ...history[0],
        id: chats.length + 1,
        text: message.message.text,
      }
      setChats((chats) => [...chats, chechat])
      return
    }

    //new message from new user
    let newnewmessage = {
      ...message.message,
      id: chats.length + 1,
      user: {
        id: Date.now(),
        avatar: `${Config.USER_URL}/avatar/${message.from}`,
      },
      username: message.from,
    }
    setChats((prev) => setChats([...prev, newnewmessage]))
    console.log(chats)
  })

  const sendMessage = (message) => {
    stompClient.publish({
      destination: "/topic/chat/doctor",
      body: JSON.stringify({ from: token.username, message }),
    })
  }
  return (
    <>
      <VdtStatus status={status} />
      <ShowPatient patient={patient} />
      <Chat
        title="Group chat"
        minimized={true}
        user={{ id: 1 }}
        messages={chats}
        onSend={(message) => sendMessage(message)}
      />
    </>
  )
}
function VdtStatus({ status }) {
  if (status.loading) return <p>loading. . .</p>
  return <CommonComponent data={status} />
}

function ShowPatient({ patient }) {
  if (!patient.active) return <p>There is no patient yet.</p>
  return (
    <>
      <PatientProfileCard username={patient.username} />
    </>
  )
}

export default PatientQueue
