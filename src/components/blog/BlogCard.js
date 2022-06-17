import { Bookmark } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material"

const BlogCard = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              React useContext
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box>
            <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <Box ml={2}>
              <Typography variant="subtitle2" component="p">
                Guy Clemons
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                May 14, 2020
              </Typography>
            </Box>
          </Box>
          <Box>
            <Bookmark />
          </Box>
        </CardActions>
      </Card>
    </Grid>
  )
}
export default BlogCard
