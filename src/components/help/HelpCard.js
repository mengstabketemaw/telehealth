import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import Config from "../../api/Config"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import useToken from "../../hooks/useToken"

const HelpCard = ({ data }) => {
  const { token } = useToken()
  const { pathname } = useLocation()
  const [requestor, setRequestor] = useState()
  const nav = useNavigate()

  useEffect(() => {
    axios.get(Config.USER_URL + "/id/" + data.requestorId).then(({ data }) => {
      setRequestor(data.user)
    })
  }, [])

  return (
    <Grid item xs={12} md={10} ml={10}>
      <Card>
        <CardActionArea
          onClick={() => {
            if (token.role === "DOCTOR")
              nav("/user/doctor/helpdetail", { state: { ...data } })
            else if (token.role === "PATIENT")
              nav("/user/patient/helpdetail", { state: { ...data } })
            else nav("/user/admin/helpdetail", { state: { ...data } })
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="h2"
              color="common.blue"
            >
              Help request
            </Typography>
            <Typography variant="subtitle2" component="p">
              By {requestor?.firstname} {requestor?.middlename}
            </Typography>
            <br />
            <Typography
              sx={{ lineHeight: 2, fontSize: 15, textAlign: "justify" }}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {pathname.includes("helpdetail")
                ? data.body
                : data.body.substr(0, 200) + "  . . . "}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box ml={2}>
            {requestor?.email && (
              <Avatar src={`${Config.USER_URL}/avatar/${requestor?.email}`} />
            )}
          </Box>
          <Box ml={3}>
            <Typography variant="subtitle2" component="p">
              {requestor?.firstname} {requestor?.middlename}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              {new Date(data.postDate).toDateString()}
            </Typography>
          </Box>
        </CardActions>
        {pathname.includes("helpdetail") ? (
          <Box m={3}>
            <Typography variant="subtitle2">Contact information</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Email: {requestor?.email}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Phone: {requestor?.phoneNumber}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Home: {requestor?.homePhoneNumber}
            </Typography>
          </Box>
        ) : (
          <></>
        )}
      </Card>
    </Grid>
  )
}
export default HelpCard
