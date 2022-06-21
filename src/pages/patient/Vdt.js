import { LoadingButton } from "@mui/lab"
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Tab,
} from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import axios from "axios"
import { useEffect, useState } from "react"
import Config from "../../api/Config"
import {
  StompSessionProvider,
  useStompClient,
  useSubscription,
} from "react-stomp-hooks"
import useToken from "../../hooks/useToken"
import { useNavigate } from "react-router-dom"

const Vdt = () => {
  const [data, setData] = useState({ status: false, data: {} })
  const { token } = useToken()
  const handleWaite = () => {
    setData({ ...data, status: true })
  }
  useEffect(() => {
    //get the amount of time and number of user in the ques
    axios
      .get(Config.VIDEOSERVER + "/vdt-status")
      .then(({ data }) => setData({ status: false, data }))
  }, [])
  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        VIRTUAL DIAGNOSIS AND TREATMENT CENTER
      </Typography>
      <br />

      {!data.status && (
        <CommonComponent data={{ ...data }}>
          <LoadingButton
            loading={data.status}
            fullWidth
            variant="contained"
            onClick={handleWaite}
          >
            Enter Room
          </LoadingButton>
        </CommonComponent>
      )}

      {data.status && (
        <StompSessionProvider
          connectHeaders={{ username: token.username, type: "patient" }}
          url={Config.VIDEOSERVER + "/communication-server"}
        >
          <HandlePatient />
        </StompSessionProvider>
      )}
    </>
  )
}

function HandlePatient() {
  const [value, setValue] = useState("1")
  const [current, setCurrent] = useState({ loading: true, data: {} })
  const [chats, setChats] = useState([])

  const { token } = useToken()

  const nav = useNavigate()

  //private message subscription
  useSubscription("/user/" + token.username + "/msg", ({ body }) => {
    const message = JSON.parse(body)
    console.log(message)
    nav("/user/patient/room/" + message.username)
  })

  //public chat subscription
  useSubscription("/topic/chat/patient", ({ body }) => {
    const message = JSON.parse(body)
    setChats((prev) => setChats([...prev, message]))
    console.log(message)
  })

  //status subscription
  useSubscription("/topic/status", ({ body }) => {
    const message = JSON.parse(body)
    setCurrent({ loading: false, data: message })
    console.log(message)
  })

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={(e, v) => setValue(v)}>
            <Tab label="Current Status" value="1" />
            <Tab label="Chat room" value="2" />
            <Tab label="Blog" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CurrentStatus current={current} />
        </TabPanel>
        <TabPanel value="2">
          <ChatRoom chats={chats} />
        </TabPanel>
        <TabPanel value="3">
          <VdtBlog />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

function VdtBlog() {
  return <p>This is vdt blog</p>
}

function ChatRoom({ chats }) {
  return chats.map((e, k) => <p key={k}>{e?.message}</p>)
}

function CurrentStatus({ current }) {
  if (current.loading) return <p>loading. . .</p>
  return <CommonComponent data={{ ...current }} />
}

export function CommonComponent({ data, doctor = false, children }) {
  return (
    <Grid
      height={"50vh"}
      container
      direction={"row"}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs>
        <Container
          sx={{
            width: "fit-content",
            padding: "50px",
            boxShadow: "2px 2px 8px #888888",
          }}
        >
          <Grid
            container
            spacing={5}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography>Number of Patient in Queue</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{data.data.patients}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Current Doctors who are diagnosing patients
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{data.data.current}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Free doctors</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{data.data.doctors}</Typography>
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  )
}

export default Vdt
