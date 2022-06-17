import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Config from "../../api/Config"
import BlogCard from "./BlogCard"
import axios from "axios"
import useToken from "../../hooks/useToken"
import mati from "../../api/repository"

export default function BlogDetaile() {
  const { state } = useLocation()

  return (
    <>
      <BlogCard data={state} />
      <br />
      <Divider />
      <br />
      <Stack spacing={3}>
        {state.comments?.map((e, i) => (
          <Comment key={i} comment={e} />
        ))}
      </Stack>
      <br />
      <WriteComment blogId={state.blogId} />
    </>
  )
}

function Comment({ comment }) {
  const [loading, setLoading] = useState(true)
  const [author, setAuthor] = useState()
  useEffect(() => {
    axios.get(Config.USER_URL + "/id/" + 7).then(({ data }) => {
      setLoading(false)
      setAuthor(data.user)
    })
  }, [])
  if (loading) <p>loading . . .</p>
  if (author)
    return (
      <Card>
        <Box>
          {author?.email && (
            <Avatar src={`${Config.USER_URL}/avatar/${author?.email}`} />
          )}
          <Box ml={2}>
            <Typography variant="subtitle2" component="p">
              {author?.firstname} {author?.middlename}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              {new Date(comment.commentDate).toDateString()}
            </Typography>
          </Box>
        </Box>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {comment.body}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    )
}

function WriteComment({ blogId }) {
  const { token } = useToken()
  const [comment, setComment] = useState("")
  const [error, setError] = useState()

  return (
    <Stack spacing={3} width={"100%"}>
      <p>{error}</p>
      <TextField
        fullWidth
        label={"write here . . ."}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        width={"200px"}
        onClick={() => {
          setError("loading")
          mati
            .post("api/Comment", {
              blogId,
              helpId: 0,
              commentorId: token.userId,
              body: comment,
            })
            .then(() => {
              setComment("")
              window.location.reload()
            })
            .catch(({ message }) => setError(message))
        }}
      >
        Comment
      </Button>
    </Stack>
  )
}
