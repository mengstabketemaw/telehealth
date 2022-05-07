import { Photo, PhotoCamera } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDisplayImage } from "../../hooks/useDisplayImage";


const Profile = ()=>{
    const [profile,setProfile] = useState({});
    const {result,uploader} = useDisplayImage();

    return (<>
    <br/>
    <Typography variant="h4" color="primary">Profile</Typography>
    <br/>
    <Box sx={{width:"100%"}}>
        <Container sx={{width:"fit-content"}}>
            <Stack alignItems={"center"} spacing={0}>
                <Avatar sx={{width:"150px",height:"150px"}}
                    src={result}
                >A</Avatar>
                <label>
                    <input 
                        style={{display:"none"}} id="icon-button-file" type="file" accept="image/*"
                        files={[profile?.image||""]}  
                        onChange={e=>{
                            uploader(e);
                            setProfile({...profile,image:URL.createObjectURL(e.target.files[0])})
                        }}
                        />
                    <IconButton component="span" color="primary">
                        <PhotoCamera/>
                    </IconButton>
                </label>
            </Stack>
        </Container>
        <Box sx={{marginBottom:"50px",display:"flex",alignItems:"flex-start", spacing:"10",flexWrap:"wrap",justifyContent:"space-evenly"}}>
        <TextField
            label={"First name"}
        />
        <TextField
            label={"Middle name"}
        />
        <TextField
            label={"Last name"}
        />
        <TextField
            label={"Last name"}
        />
        <TextField
            label={"Last name"}
        />
        <TextField
            label={"Last name"}
        />
        
        <TextField
            label={"First name"}
        />
        <TextField
            label={"Middle name"}
        />
        <TextField
            label={"Last name"}
        />
        <TextField
            label={"Last name"}
        />
        <TextField
            label={"Last name"}
        />
        <TextField
            label={"Last name"}
        />
        </Box>
        <Button variant="contained">Save</Button>
    </Box>
    </>
    )
}
export default Profile;