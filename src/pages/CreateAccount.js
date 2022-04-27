import { Button, Grid,Box,FormControl,InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography, Input, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import Location from "../components/Location"
import {AdapterLuxon} from "@mui/x-date-pickers/AdapterLuxon"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { PhotoCamera } from "@mui/icons-material";



let initialUserInfo = {
    location:{lat:0,lng:0},
    name:{first:"",middle:"",last:""},
    number:{home:"",phone:""},
    creadential:{email:"",password:""},
    basic:{birthDate:null,gender:"",user:"patient",profilePic:''},
    doctor:{role:[],file:""},
    patient:{martialStatus:""}
};


function CreateAccount() {
    const [user, setUser] = useState("patient");
    const [modalOpen,setModalOpen] = useState(false);
    const [userLocation,setUserLocation] = useState({lat:0,lng:0});
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    const renderBasedOnUser = () =>{
        if(userInfo.basic.user==="patient"){
            return<Grid item xs={8}>
            <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel>Martial Status</InputLabel>
             <Select
                label="Martial Status"
                value={userInfo.patient.martialStatus}
                onChange={handleChange("patient","martialStatus")}
            >
                <MenuItem value={"merride"}>Merride</MenuItem>
                <MenuItem value={"unmerride"}>UnMerride</MenuItem>
            </Select>
            </FormControl>
        </Grid>
        }
        return<> <Grid item xs={4}>
            <FormControl  sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel>Role</InputLabel>
                <Select
                    label="Role"
                    multiple
                    value={userInfo.doctor.role}
                    onChange={e=>{
                        let value = e.target.value;
                        let userValue =  typeof value === 'string' ? value.split(',') : value;
                        setUserInfo(state=>({...state,doctor:{...state.doctor,role:userValue}}));
                                }
                            }
                >
                    <MenuItem value={"consultation"}>Consultation</MenuItem>
                    <MenuItem value={"vdt"}>VDT</MenuItem>
                    <MenuItem value={"therapist"}>Therapist</MenuItem>
                </Select>
            </FormControl> 
            </Grid>
            <Grid item xs={4}>
            <TextField
                fullWidth
                focused
                files={[userInfo.doctor.file]}
                label="Qualification/Specialization"
                onChange={e=>setUserInfo({...userInfo,doctor:{...userInfo.doctor,file:e.target.files[0]}})}
                type="file"
            />
            </Grid>
        </>
    }
    
    const handleChange = (catagory,change)=>(event)=>{
        setUserInfo(state=>{
            state[catagory][change] = event.target.value;
            const newState = {...state};
            console.log("there is change, the new State are :",newState)
            return newState;
        });
    };

    return (<>
    <Grid padding={4} container direction={"row"} justifyContent={"flex-start"} alignItems={"center"} spacing={3}>
        <Grid item xs={12}>
            <Stack direction={"row"} spacing={3} >
                <Typography variant="h2" color={"primary"}>Register</Typography>
                <Select
                    value={userInfo.basic.user}
                    onChange={handleChange("basic","user")}
                    variant="standard"
                    renderValue={(value) => (<Typography variant="p" color="primary">As a {value}</Typography>)}
                >
                    <MenuItem value="patient">patient</MenuItem>
                    <MenuItem value="doctor">doctor</MenuItem>
                </Select>
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <TextField 
                fullWidth 
                label={"First Name"}
                value={userInfo.name.first}
                onChange={handleChange("name","first")}
            />
        </Grid>
        <Grid item xs={4}>
            <TextField 
                fullWidth 
                label={"Middle Name"}
                value={userInfo.name.middle}
                onChange={handleChange("name","middle")}
            />
        </Grid>
        <Grid item xs={4}>
            <TextField 
                fullWidth 
                label={"Last Name"}
                value={userInfo.name.last}
                onChange={handleChange("name","last")}
            />
        </Grid>
        <Grid item xs={4}>
            <TextField fullWidth aria-readonly value = {userInfo.location.lat} label={"Latitude"}/>
        </Grid>
        <Grid item xs={4}>
            <TextField fullWidth aria-readonly value={userInfo.location.lng} label={"Longtiude"}/>
        </Grid>
        <Grid item xs={4}>
            <Button onClick={()=>setModalOpen(true)}>Choose Location</Button>
        </Grid>
        <Grid item xs={6}>
            <TextField 
                fullWidth 
                label={"Phone Number"}
                value={userInfo.number.phone}
                onChange={handleChange("number","phone")}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField 
                fullWidth 
                label={"Home Phone Number"}
                value={userInfo.number.home}
                onChange={handleChange("number","home")}
            />
        </Grid>
        <Grid item xs={4}>
            <TextField 
              fullWidth 
              label={"Email"} 
              type="email"
              value={userInfo.creadential.email}
              onChange={handleChange("creadential","email")}
              helperText={"used to login to the system"}
            />
        </Grid>
        <Grid item xs={4}>
            <TextField 
              fullWidth 
              label={"Password"}
              type="password"
              value={userInfo.creadential.password}
              onChange={handleChange("creadential","password")}
              helperText=" "
            />
        </Grid>
        <Grid item xs={4}>
            <TextField 
              fullWidth 
              label={"Confirm Password"}
              type="password"
              helperText=" "
            />
        </Grid>
        <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>    
                <DatePicker 
                    label="Birth Date"
                    value={userInfo.basic.birthDate}
                    onChange={value=>{setUserInfo({...userInfo,basic:{...userInfo.basic,birthDate:value.toString().split('T')[0]}})}}
                    renderInput={(parms)=><TextField {...parms}/>}
                />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
            <FormControl sx={{m:1,minWidth:130}}>
                <InputLabel>Gender</InputLabel>
                <Select
                label="Gender"
                value={userInfo.basic.gender}
                onChange={handleChange("basic","gender")}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        {
            renderBasedOnUser()
        }
        <Grid item xs={3}>
            <Stack spacing={3}>
                <Stack direction={"row"} spacing={3}>
                    <Typography>Profile Picture</Typography>
                    <label>
                        <IconButton color="primary" component="span">
                            <PhotoCamera/>
                        </IconButton>
                        <Input  
                            style={{display:"none"}} 
                            id="icon-button-file" 
                            accept="image/*" 
                            type="file"
                            files={[userInfo.basic.profilePic]}
                            onChange={e=>setUserInfo({...userInfo,basic:{...userInfo.basic,profilePic:e.target.files[0]}})}
                        />
                    </label>
                </Stack>
                <Stack direction={"row"}>
                    <FormControlLabel sx={{margin:0,padding:0.1}} control={<Checkbox/>} label="I agreee to "></FormControlLabel>
                    <Button>Term and Condition</Button>
                </Stack>
                <Button variant="contained">Register</Button>
                <Button component="span">Already have an account</Button>
            </Stack>
        </Grid>
    </Grid>
    <Modal
      open={modalOpen}
      onClose={()=>setModalOpen(false)}
     >
        <Box sx = {{position:"absolute",top:"20%",width:"100%"}}>
            <Location setUserLocation={setUserInfo} setModalOpen={setModalOpen}/>
        </Box>
    </Modal>
    </>);
}

export default CreateAccount;