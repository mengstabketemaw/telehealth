import { LoadingButton } from "@mui/lab"
import {
  Box,
  Container,
  Grid,
  Typography,
  Tab,
  Button,
  CardActionArea,
  Card,
  CardContent,
  Avatar,
  CardActions,
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
import mati from "../../api/repository"
import Chat from "react-simple-chat"
import "react-simple-chat/src/components/index.css"

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
  const { token } = useToken()
  const [chats, setChats] = useState([])
  const stompClient = useStompClient()

  const nav = useNavigate()

  //private message subscription
  useSubscription("/user/" + token.username + "/msg", ({ body }) => {
    const message = JSON.parse(body)
    console.log(message)
    nav("/user/patient/room/" + message.username)
  })

  //status subscription
  useSubscription("/topic/status", ({ body }) => {
    const message = JSON.parse(body)
    setCurrent({ loading: false, data: message })
    console.log(message)
  })

  //public chat subscription
  useSubscription("/topic/chat/patient", ({ body }) => {
    //{from:"email",message:"the message body"}
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
      destination: "/topic/chat/patient",
      body: JSON.stringify({ from: token.username, message }),
    })
  }

  return (
    <Box
      sx={{
        height: "75vh",
        typography: "body1",
        overflow: "scroll",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={(e, v) => setValue(v)}>
            <Tab label="Current Status" value="1" />
            <Tab label="Blog" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CurrentStatus current={current} />
        </TabPanel>
        <TabPanel value="2">
          <VdtBlog />
        </TabPanel>
      </TabContext>
      <Chat
        title="Group chat"
        minimized={true}
        user={{ id: 1 }}
        messages={chats}
        onSend={(message) => sendMessage(message)}
      />
    </Box>
  )
}

function VdtBlog() {
  return <VdtBlogLists />
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

function VdtBlogLists() {
  const [blogs, setBlogs] = useState({ loading: true, data: [] })
  const [detaile, setDetaile] = useState({ value: false, index: -1 })
  useEffect(() => {
    mati
      .get("api/Blog")
      .then((data) => {
        setBlogs({ loading: false, data })
      })
      .catch(({ message }) => {
        console.log("Could't load ", message)
      })
  }, [])

  if (blogs.loading) return <Typography>loading . . .</Typography>

  if (detaile.value)
    return (
      <>
        <Button onClick={() => setDetaile({ value: false, index: -1 })}>
          back
        </Button>
        <VdtBlogCard data={blogs.data[detaile.index]} detaile={true} />
      </>
    )

  if (blogs.data?.length)
    return (
      <Grid container spacing={3}>
        {blogs.data.map((e, i) => (
          <VdtBlogCard key={i} index={i} data={e} setDetaile={setDetaile} />
        ))}
      </Grid>
    )
  else return <Typography>No blog</Typography>
}

function VdtBlogCard({
  data,
  detaile = false,
  setDetaile = (f) => f,
  index = 0,
}) {
  const [author, setAuthor] = useState()
  useEffect(() => {
    axios.get(Config.USER_URL + "/id/" + data.authorId).then(({ data }) => {
      setAuthor(data.user)
    })
  }, [])
  return (
    <Grid item xs={12}>
      <Card>
        <CardActionArea
          onClick={() => {
            setDetaile({ value: true, index })
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {detaile ? data.body + "  . . . " : data.body.substr(0, 100)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box>
            {author?.email && (
              <Avatar src={`${Config.USER_URL}/avatar/${author?.email}`} />
            )}
            <Box ml={2}>
              <Typography variant="subtitle2" component="p">
                {author?.firstname} {author?.middlename}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                {new Date(data.postDate).toDateString()}
              </Typography>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Vdt
