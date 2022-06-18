import { Typography } from "@mui/material"
import BlogCard from "../../components/blog/BlogCard"
import { BlogLists } from "../doctor/DocBlog"

const Blog = () => {
  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Blog
      </Typography>
      <br />
      <BlogLists />
    </>
  )
}

export default Blog
