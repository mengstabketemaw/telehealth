import { Stack, Typography } from "@mui/material";
import BlogCard from "../../components/blog/BlogCard";

const Blog = ()=>{
    
    return (<>
      <br/>
      <Typography variant="h4" color="primary">Blog</Typography>  
      <br/>
       <BlogCard img={"https://sample-videos.com/img/Sample-png-image-100kb.png"} title={"title"} text={text}/>
    </>
    )
}


const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis lorem vitae eros posuere efficitur. Duis pulvinar lacus sed malesuada imperdiet. Nulla facilisi. Donec nec nulla purus. Mauris sit amet ullamcorper lectus. Praesent nec imperdiet dui. Cras quis mi risus. In mattis ac mauris vel luctus. Donec quis scelerisque sem. Sed efficitur mi sollicitudin, faucibus libero in, luctus enim. Aliquam tempus turpis ex, et viverra tortor luctus ut. Aliquam erat volutpat. Sed justo erat, luctus in laoreet non, tempus blandit turpis. Curabitur sit amet nunc non erat pulvinar pretium.Integer eget ante lorem. Vestibulum tempus ullamcorper efficitur. Nulla euismod urna sed viverra rutrum. Sed consequat fermentum sem non interdum. Morbi fringilla dui quis quam suscipit tempus. Quisque auctor efficitur justo, quis tristique augue mollis et. Ut tincidunt, urna eget dignissim consequat, metus nisi pretium purus, a fermentum nibh est sed tellus. Morbi sit amet efficitur mi, nec mattis ante. Curabitur vel est elit. Maecenas at faucibus risus. Morbi tempor nulla pulvinar elit auctor commodo sed eu tellus. Cras facilisis, eros nec viverra finibus, arcu massa dapibus dui, pulvinar commodo ex nisi in elit.`
export default Blog;