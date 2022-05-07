import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const ApplyForHelp = ()=>{
    const [desc,setDesc] = useState("");
    const [files,setFiles] = useState([])



    return (<>
    <br/>
    <Typography variant="h4" color="primary">Apply For Help</Typography>
    <br/>
    <Stack spacing={3}>
        <TextField
            label={"Brifely explaine what is the problem"}
            multiline
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
            rows={10}
            fullWidth
        />
        <label>
            <input 
                style={{"display":"none"}} 
                accept="*" id="contained-button-file" 
                files={files} 
                multiple 
                type="file"
                onChange={e=>setFiles(Object.values(e.target.files))}
            />
            <Button variant="contained" color="info" component="span">Upload All the neccessary files</Button>
        </label>    
        {
            files.map((e,i)=>(<Typography key={i} variant="caption">{e?.name}</Typography>))
        }
    <Button variant="contained">Submite</Button>
    </Stack>        
    </>
    )
}
export default ApplyForHelp;