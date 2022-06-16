import { LoadingButton } from "@mui/lab"
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material"
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
  const { token } = useToken()
  const [data, setData] = useState({ status: false, data: {} })

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
        <CommonComponent data={data}>
          <LoadingButton
            loading={data.status}
            fullWidth
            variant="contained"
            onClick={handleWaite}
          >
            WAIT
          </LoadingButton>
        </CommonComponent>
      )}

      {data.status && (
        <StompSessionProvider
          connectHeaders={{ username: token.username, type: "patient" }}
          url={Config.VIDEOSERVER + "/communication-server"}
        >
          <HandlePatient token={token} />
        </StompSessionProvider>
      )}
    </>
  )
}

function HandlePatient({ token }) {
  const [data, setData] = useState({})
  const nav = useNavigate()
  useSubscription("/topic/status", ({ body }) => {
    const message = JSON.parse(body)
    setData(message)
    console.log(message)
  })
  useSubscription("/user/" + token.username + "/msg", ({ body }) => {
    const message = JSON.parse(body)
    console.log(message)
    nav("/user/patient/room/" + message.username)
  })

  return (
    <CommonComponent data={{ data: data }}>
      <Button>read blog while wating</Button>
    </CommonComponent>
  )
}

export function CommonComponent({ data, doctor = false, children }) {
  let waiting
  if (data.data?.doctors > 1) {
    waiting = 0
  } else if (data.data?.patients) {
    if (data.data?.current) {
      waiting = (data.data?.patients / data.data?.current) * 30
    } else {
      waiting = data.data?.patients * 30
    }
  } else {
    waiting = "UNKNOWN"
  }

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
              <Typography>{data.data?.patients}</Typography>
            </Grid>
            {!doctor && (
              <>
                <Grid item xs={6}>
                  <Typography>
                    Approximate Time wating time in minute
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{waiting}</Typography>
                </Grid>
              </>
            )}
            <Grid item xs={6}>
              <Typography>Current Patient who are diagnosing</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{data.data?.current}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Available Doctor</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{data.data?.doctors}</Typography>
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
