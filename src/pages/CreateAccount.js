import { Grid, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

function CreateAccount() {
    const [user,setUser]=useState("patient");


    return ( <Grid container height={"100vh"} direction={"column"} justifyContent={"flex-start"} alignItems={"center"} >
                <Grid item xs>
                    <Stack direction={"row"} spacing={3}>
                        <Typography variant="h2" color={"primary"}>Register</Typography>
                        <Select
                        value={user}
                        onChange={(e)=>setUser(e.target.value)}
                        style={{borderStyle:"none"}}
                        variant="standard"
                        renderValue={(value)=>(<Typography variant="p" color="primary">As a {value}</Typography>)}
                        >
                            <MenuItem value="patient">patient</MenuItem>
                            <MenuItem value="doctor">doctor</MenuItem>

                        </Select>
                    </Stack>
                </Grid>
                <Grid item xs>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <TextField
                         label={"First Name"}
                        />
                        <TextField
                         label={"First Name"}
                        />
                        <TextField
                         label={"First Name"}
                        />
                         </Stack>
                </Grid>



            </Grid>
     );
}

export default CreateAccount;