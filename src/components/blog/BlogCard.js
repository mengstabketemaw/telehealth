import { Button, Stack, Typography } from "@mui/material";

const BlogCard = ({text,date,title,img}) =>{
    return(<>
    <Stack direction="row" sx={{width:"70%", boxShadow:"10px 1px 15px gray",border:"1px solid gray"}} alignItems="center" justifyContent="space-around">
            <Stack padding={"20px"}>
                <Typography color="InfoText" variant="h5">{title}</Typography>
                <br/>
                <Typography
                    variant="body1"
                    maxWidth={"200px"}
                    maxHeight={"100px"}
                    sx={{overflow:"hidden"}}
                >
                    {text}
                </Typography>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-around">
                    <Typography>{date}</Typography>
                    <Button>Read more...</Button>
                </Stack>
            </Stack>
            <img src={img} alt={"alt prop is mandatory"} sx={{width:"100%",height:"100%"}}/>
        </Stack>
    </>)
}
export default BlogCard;