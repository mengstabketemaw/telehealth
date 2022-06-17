import { Typography, Grid } from "@mui/material"
import BlogCard from "../../components/blog/BlogCard"

const DocBlog = () => {
  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Blog
      </Typography>
      <br />
      <Grid container spacing={3}>
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </Grid>
      <BlogLists />
      <WriteBlog />
    </>
  )
}

function BlogLists() {
  return <></>
}

function WriteBlog() {
  return <></>
}

export default DocBlog
