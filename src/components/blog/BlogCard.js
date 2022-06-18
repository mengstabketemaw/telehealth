import { Comment } from "@mui/icons-material"
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

const BlogCard = ({ data }) => {
  const { token } = useToken()
  const { pathname } = useLocation()
  const [author, setAuthor] = useState()
  const nav = useNavigate()
  console.log(pathname)
  useEffect(() => {
    axios.get(Config.USER_URL + "/id/" + data.authorId).then(({ data }) => {
      setAuthor(data.user)
    })
  }, [])
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea
          onClick={() => {
            if (token.role === "DOCTOR")
              nav("/user/doctor/blogdetaile", { state: { ...data } })
            else if (token.role === "PATIENT")
              nav("/user/patient/blogdetaile", { state: { ...data } })
            else nav("/user/admin/blogdetaile", { state: { ...data } })
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {pathname.includes("blogdetaile")
                ? data.body + "  . . . "
                : data.body.substr(0, 100)}
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
          <Box>
            <Comment />
            {data.comments?.length || 0}
          </Box>
        </CardActions>
      </Card>
    </Grid>
  )
}
export default BlogCard
