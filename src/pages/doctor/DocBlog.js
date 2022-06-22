import {
  Typography,
  Grid,
  Button,
  Dialog,
  Stack,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { useEffect, useState } from "react"
import BlogCard from "../../components/blog/BlogCard"
import { useSnackbar } from "../doctor/Doctor"
import useToken from "../../hooks/useToken"
import mati from "../../api/repository"
import HelpCard from "../../components/help/HelpCard"

const DocBlog = () => {
  const [modal, setModal] = useState({ open: false })
  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Blog
      </Typography>
      <br />
      <Button onClick={() => setModal({ open: true })}>Write Blog</Button>
      <BlogLists />
      <WriteBlog modal={modal} setModal={setModal} />
    </>
  )
}

export function BlogLists() {
  const [blogs, setBlogs] = useState({ loading: true, data: [] })
  const [help, setHelp] = useState({ loading: true, data: {} })
  useEffect(() => {
    async function fetchData() {
      await mati
        .get("api/Blog")
        .then((data) => {
          setBlogs({ loading: false, data })
        })
        .catch(({ message }) => {
          console.log("Could't load ", message)
        })

      await mati
        .get("api/Help/random")
        .then((data) => {
          setHelp({ loading: false, data })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchData()
  }, [])

  if (blogs.loading || help.loading)
    return <Typography>loading . . .</Typography>

  if (blogs.data?.length)
    return (
      <Grid container spacing={3}>
        <HelpCard data={help.data} />
        <br />
        <br />
        {blogs.data.map((e, i) => (
          <BlogCard key={i} data={e} />
        ))}
      </Grid>
    )
  else return <Typography>No blogs found</Typography>
}

function WriteBlog({ modal, setModal }) {
  const { token } = useToken()
  const { setSnackbar } = useSnackbar()
  const [data, setData] = useState({ title: "", body: "" })
  const handleWriteBlog = () => {
    //write blog handler
    setModal({ open: false })
    mati
      .post("api/Blog", { ...data, authorId: token.userId })
      .then(() => {
        window.location.reload()
        setSnackbar({ children: "Blog posted", open: true })
      })
      .catch(({ message }) =>
        setSnackbar({
          children: "Could't post: " + message,
          severity: "error",
          open: true,
        })
      )
  }
  return (
    <Dialog fullWidth open={modal.open}>
      <DialogTitle>Write Blog</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            label={"Title"}
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            fullWidth
          />
          <TextField
            label={"Describtion"}
            multiline
            rows={3}
            value={data.body}
            onChange={(e) => setData({ ...data, body: e.target.value })}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleWriteBlog}>OK</Button>
        <Button onClick={() => setModal({ open: false })}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DocBlog
