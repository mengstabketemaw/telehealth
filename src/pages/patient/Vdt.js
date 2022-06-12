import { LoadingButton } from "@mui/lab"
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import Config from "../../api/Config"

const Vdt = () => {
  const [data, setData] = useState({ status: false, data: {} })
  const handleWaite = () => {
    setData(true)
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
              <Grid item xs={6}>
                <Typography>Time to waite in minute</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.data?.patients * 30 || "UNKNOWN"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Current Patient who are diagnosing</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.data?.current}</Typography>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  loading={data.status}
                  fullWidth
                  variant="contained"
                  onClick={handleWaite}
                >
                  WAITE
                </LoadingButton>
                <br />
                <br />
                {data.status && (
                  <Button fullWidth>read blog, while waitng</Button>
                )}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}
export default Vdt
