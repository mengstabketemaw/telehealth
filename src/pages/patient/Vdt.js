import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Vdt = ()=>{
    const [loading,setLoading] = useState(false)
    const handleWaite = ()=>{
        setLoading(true)
    }
    useEffect(()=>{
        //get the amount of time and number of user in the ques
    },[])
    return (<>
    <br/>
    <Typography variant="h4" color="primary">VIRTUAL DIAGNOSIS AND TREATMENT CENTER</Typography>    
    <br/>
    <Grid height={"50vh"} container direction={"row"} justifyContent="center" alignItems="center">
        <Grid item xs>
            <Container sx={{ width: "fit-content", padding:"50px",boxShadow: "2px 2px 8px #888888" }}>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item xs={6}>
                        <Typography>Number of Patient in Queue</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>12</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Time to waite</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>12:2:1</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton loading={loading}fullWidth variant="contained" onClick={handleWaite}>WAITE</LoadingButton>
                        <br/><br/>
                        {loading&&<Button fullWidth>read blog, while waitng</Button>}
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    </Grid>
    
    </>
    )
}
export default Vdt;