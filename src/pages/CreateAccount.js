import { Button, Grid,Box,FormControl,InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography, Input, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import Location from "../components/Location"
import {AdapterLuxon} from "@mui/x-date-pickers/AdapterLuxon"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ContactSupportOutlined, PhotoCamera } from "@mui/icons-material";

function CreateAccount() {
    const [user, setUser] = useState("patient");
    const [modalOpen,setModalOpen] = useState(false);
    const [userLocation,setUserLocation] = useState({lat:0,lng:0});
    const [userInfo, setUserInfo] = useState({});

    const renderBasedOnUser = () =>{
        if(user==="patient"){
            return<Grid item xs={8}>
            <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel>Martial Status</InputLabel>
             <Select
                label="Martial Status"
                value={userInfo?.martialStatus||''}
                onChange={e=>{setUserInfo({...userInfo,martialStatus:e.target.value})}}
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
                    value={userInfo?.doctorRole||[]}
                    onChange={e=>{
                        let value = e.target.value;
                        let userValue =  typeof value === 'string' ? value.split(',') : value;
                        setUserInfo({...userInfo,doctorRole:userValue});
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
                label="Qualification/Specialization"
                type="file"
            />
            </Grid>
        </>
    }


    return (<>
    <Grid padding={4} container direction={"row"} justifyContent={"flex-start"} alignItems={"center"} spacing={3}>
        <Grid item xs={12}>
            <Stack direction={"row"} spacing={3} >
                <Typography variant="h2" color={"primary"}>Register</Typography>
                <Select
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    variant="standard"
                    renderValue={(value) => (<Typography variant="p" color="primary">As a {value}</Typography>)}
                >
                    <MenuItem value="patient">patient</MenuItem>
                    <MenuItem value="doctor">doctor</MenuItem>
                </Select>
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <TextField fullWidth label={"First Name"}/>
        </Grid>
        <Grid item xs={4}>
            <TextField fullWidth label={"MIddle Name"}/>
        </Grid>
        <Grid item xs={4}>
            <TextField fullWidth label={"Last Name"}/>
        </Grid>
        <Grid item xs={4}>
            <TextField fullWidth aria-readonly value = {userLocation.lat} label={"Latitude"}/>
        </Grid>
        <Grid item xs={4}>
            <TextField fullWidth aria-readonly value={userLocation.lng} label={"Longtiude"}/>
        </Grid>
        <Grid item xs={4}>
            <Button onClick={()=>setModalOpen(true)}>Choose Location</Button>
        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth label={"Phone Number"}/>
        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth label={"Home Phone Number"}/>
        </Grid>
        <Grid item xs={4}>
            <TextField 
              fullWidth 
              label={"Email"} 
              type="email"
              helperText={"used to login to the system"}
            />
        </Grid>
        <Grid item xs={4}>
            <TextField 
              fullWidth 
              label={"Password"}
              type="password"
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
                    value={userInfo?.birthDate||null}
                    onChange={value=>{setUserInfo({...userInfo,birthDate:value})}}
                    renderInput={(parms)=><TextField {...parms}/>}
                />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
            <FormControl sx={{m:1,minWidth:130}}>
                <InputLabel>Gender</InputLabel>
                <Select
                label="Gender"
                value={userInfo?.gender||""}
                onChange={(e)=>{setUserInfo({...userInfo,gender:e.target.value})}}
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
                        <Input  style={{display:"none"}} id="icon-button-file" accept="image/*" type="file"/>
                    </label>
                </Stack>
                <Stack direction={"row"}>
                    <FormControlLabel sx={{margin:0,padding:0.1}} control={<Checkbox/>} label="I agreee to "></FormControlLabel>
                    <Button>Term and Condition</Button>
                </Stack>
                <Button variant="contained">Register</Button>
                <Button>Already have an account</Button>
            </Stack>
        </Grid>
    </Grid>
    <Modal
      open={modalOpen}
      onClose={()=>setModalOpen(false)}
     >
        <Box sx = {{position:"absolute",top:"20%",width:"100%"}}>
            <Location setUserLocation={setUserLocation} setModalOpen={setModalOpen}/>
        </Box>
    </Modal>
    </>);
}

export default CreateAccount;