import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
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
  const [com, setCom] = useState({ loading: true, comments: [] })
  useEffect(() => {
    mati
      .get("api/Blog/" + state.blogId)
      .then((data) => {
        setCom({ loading: false, comments: data.comments })
      })
      .catch(({ message }) => {
        console.log("There was error loading comments: " + message)
      })
  }, [])

  return (
    <Grid item mr={20}>
      <BlogCard data={state} />
      <br />
      <Divider />
      <br />
      <br />
      <Typography>Comments ({com.comments.length})</Typography>
      <br />
      <Stack spacing={3}>
        {com.comments.loading ? (
          <p>loading comments . . .</p>
        ) : (
          com.comments?.map((e, i) => <Comment key={i} comment={e} />)
        )}
      </Stack>
      <br />
      <WriteComment setCommentState={setCom} blogId={state.blogId} />
    </Grid>
  )
}

function Comment({ comment }) {
  const [loading, setLoading] = useState(true)
  const [author, setAuthor] = useState()
  useEffect(() => {
    axios
      .get(Config.USER_URL + "/id/" + comment.commentorId)
      .then(({ data }) => {
        setLoading(false)
        setAuthor(data.user)
      })
  }, [])
  if (loading) <p>loading . . .</p>
  if (author)
    return (
      <Card>
        <CardActions>
          <Box ml={1} mt={1} mr={1}>
            {author?.email && (
              <Avatar src={`${Config.USER_URL}/avatar/${author?.email}`} />
            )}
          </Box>
          <Box ml={1} mt={1} mr={1}>
            <Typography variant="subtitle2" component="p">
              {author?.firstname} {author?.middlename}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              {new Date(comment.commentDate).toDateString()}
            </Typography>
          </Box>
        </CardActions>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {comment.body}
          </Typography>
        </CardContent>
      </Card>
    )
}

function WriteComment({ blogId, setCommentState }) {
  const { token } = useToken()
  const [comment, setComment] = useState("")
  const [error, setError] = useState({ loading: false, msg: "" })

  return (
    <Stack spacing={3} width={"100%"}>
      <p>{error.msg}</p>
      <TextField
        fullWidth
        label={"write here . . ."}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        width={"200px"}
        disabled={error.loading}
        onClick={() => {
          setError({ loading: true, msg: "" })
          mati
            .post("api/Comment", {
              blogId,
              helpId: 0,
              commentorId: token.userId,
              body: comment,
            })
            .then((data) => {
              setCommentState((state) => ({
                loading: false,
                comments: [...state.comments, data],
              }))
              setComment("")
              setError({ loading: false, msg: "" })
            })
            .catch(({ message }) => setError({ loading: false, msg: message }))
        }}
      >
        Comment
      </Button>
    </Stack>
  )
}
