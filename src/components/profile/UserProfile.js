import { PhotoCamera } from "@mui/icons-material";
import { Avatar, Box, Button, Container, IconButton, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Config from "../../api/Config";
import useToken from "../../hooks/useToken";
import {useSnackbar} from "../../pages/patient/Patient"

const UserProfile = () => {
    const {token} = useToken();
    const {setSnackbar} = useSnackbar();
    const [profile,setProfile] = useState({});

    useEffect(()=>{
        (async function(){
            try {
                const {data} = await axios.get(Config.USER_URL+"/id/"+token.userId);
                setProfile({...data.user,custom:data.martialStatus||data.docRoles?.join(),imageSrc:`${Config.USER_URL}/avatar/${token.username}`});   
                } catch (error) {
                setSnackbar({open:true,children:"There was error loading Profile from the server: "+error?.message,severity:"error"});            
                }
        })();
    },[token.userId]);
    
    const handleChange = (state)=>(event)=>{
        setProfile(ins=>({...ins,[state]:event.target.value}))
    }

    const handleChangeProfilePicture = async (e)=>{
        try {
            let req = new FormData();
            req.append("file",e.target.files[0]);
            await axios.put(Config.USER_URL+"/avatar/"+token.userId,req)
            setProfile({...profile,image:e.target.value})
            setSnackbar({open:true,children:"Avatar changed successfully",severity:"success"}); 
            window.location.reload(); // To show the user chage we have to reload the page;
        } catch (error) {
            setSnackbar({open:true,children:"Something is wrong can't change avatar: "+error.message,severity:"error"})
        }
    }

    return (<>
    <Box sx={{width:"100%"}}>
        <Container sx={{width:"fit-content"}}>
            <Stack alignItems={"center"} spacing={0}>
                <Avatar sx={{width:"150px",height:"150px"} }
                    src={profile.imageSrc}
                >A</Avatar>
                <label>
                    <input 
                        style={{display:"none"}} id="icon-button-file" type="file" accept="image/*"
                        value={profile.image||""}  
                        onChange={handleChangeProfilePicture}
                        />
                    <IconButton component="span" color="primary">
                        <PhotoCamera/>
                    </IconButton>
                </label>
            </Stack>
        </Container>
        <Box sx={{'& .MuiTextField-root': { m: 2},marginBottom:"50px",display:"flex",alignItems:"flex-start", spacing:"10",flexWrap:"wrap",justifyContent:"space-evenly"}}>
        <TextField
            sx={{margin:"12"}}
            value={profile.firstname||""}
            onChange={handleChange("firstname")}
            label={"First name"}
        />
        <TextField
            value={profile.middlename||""}
            onChange={handleChange("middlename")}
            label={"Middle name"}
        />
        <TextField
            value={profile.lastname||""}
            onChange={handleChange("lastname")}
            label={"Last name"}
        />
        <TextField
            value={profile.birthDate||""}
            InputProps={{
                readOnly: true,
              }}
            onChange={handleChange("birthDate")}
            label={"Birth Date"}
        />
        <TextField
            InputProps={{
                readOnly: true,
                }}
            value={profile.sex||""}
            onChange={handleChange("sex")}
            label={"Sex"}
        />
        <TextField
            value={profile.phoneNumber||""}
            onChange={handleChange("phoneNumber")}
            label={"Phone Number"}
        />
        
        <TextField
            value={profile.homePhoneNumber||""}
            onChange={handleChange("homePhoneNumber")}
            label={"Home Phone Number"}
        />
        <TextField
            value={profile.email||""}
            onChange={handleChange("email")}
            label={"Email"}
        />
        <TextField
            value={profile.password||""}
            onChange={handleChange("password")}
            label={"Password"}
        />
        <TextField
            InputProps={{
                readOnly: true,
            }}
            value={profile.latitude||""}
            onChange={handleChange("latitude")}
            label={"Latitude"}
        />
        <TextField
            InputProps={{
                readOnly: true,
            }}
            value={profile.longitude||""}
            onChange={handleChange("longitude")}
            label={"Longitude"}
        />
        <TextField
            value={profile.custom||""}
            onChange={handleChange("custom")}
            label={"Role"}
        />
        </Box>
        <Button variant="contained">Save</Button>
    </Box>
    </>)
}
export default UserProfile;