import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import ForgetPasswordDialog from "../components/ForgetPasswordDialog";
import { loginUser } from "../features/user/userSlice"


const Login = () => {
    const [value, setValue] = useState({ username: "", password: "", rememberme:false, show: false });
    const [openForgetPassword,setOpenForgetPassword] = useState(false);
    const userData = useSelector(store => store.user)
    const dispach = useDispatch();
    const [errorPermission,setErrorPermission] = useState(true)

    const handleVisibility = () => {
        setValue(state => {
            return { ...state, show: !state.show };
        })
    }

    const handleChange = (props) => e => {
        setErrorPermission(false);
        setValue({ ...value, [props]: e.target.value })
        console.log(value);
    }

    return <>
        <Grid height={"100vh"} container direction={"row"} justifyContent={"center"} alignItems={"center"}>
            <Grid item xs>
                <Container sx={{ width: "fit-content", boxShadow: "2px 2px 8px #888888" }}>
                    <Grid container direction={"column"} justifyContent={"center"} alignItems={"flex-start"} spacing={2}>
                        <Grid item xs sx={{ marginBottom: "70px" }}>
                            <Typography variant="h4" color="primary">Wellcome</Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h3" color="primary">Login</Typography>
                        </Grid>
                        <Grid item xs>
                            <Stack spacing={3} sx={{ padding: 5, width: "400px" }}>
                                <TextField label="user name"
                                    error={errorPermission && userData.status==="error"}
                                    helperText={errorPermission && userData.status==="error"?"username or password is incorrect":""}
                                    required
                                    onChange={handleChange("username")}
                                    InputProps={{
                                        endAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>)
                                    }}
                                />
                                <TextField type={value.show ? "text" : "password"} label="password" variant="outlined"
                                    required
                                    error={errorPermission && userData.status==="error"}
                                    helperText={errorPermission && userData.status==="error"?"username or password is incorrect":""}
                                    onChange={handleChange("password")}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><IconButton onClick={handleVisibility}>
                                            {value.show ? <VisibilityOff /> : <Visibility />}
                                        </IconButton></InputAdornment>
                                    }}
                                />
                                <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                                    <FormControlLabel control={<Checkbox onChange={(e)=>setValue({...value,rememberme:e.target.checked})}/>} label="Remember me" />
                                    <Button onClick={()=>setOpenForgetPassword(true)}>Forget Password?</Button>
                                </Stack>
                                <LoadingButton variant="contained"
                                        disabled={![value.username, value.password].every(Boolean)} 
                                        loading={userData.status === "loading"}
                                        onClick={()=>{
                                            setErrorPermission(true);
                                            dispach(loginUser(value))
                                        }}>Login</LoadingButton>
                                <Button>Don't have Accoutn? Get Started</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
            <ForgetPasswordDialog open={openForgetPassword} handleClose={(value)=>{setOpenForgetPassword(value)}}/>
        </Grid>
    </>
}
export default Login;