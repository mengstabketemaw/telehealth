import { Delete, VideoCall } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const TherapyGroup = ()=>{
    const [data,setData] = useState({rows:[],loading:true});

    useEffect(()=>{
        //logic to get all the 
        setData({
            rows:[{id:1,therapy:"Monday",date:"12:20"}],
            loading:false
        })
    },[]);

    const handleDelete = () => {}
    const handleJoin = () => {}
    const column=[
        {
            field:"therapy",
            headersName:"Therapy",
            flex:1
        },
        {
            field:"date",
            headersName:"Data Time",
            flex:1
        },
        {
            field:"actions",
            type:"actions",
            getActions:(params)=>{
                return [
                    <GridActionsCellItem
                        icon={<Delete/>}
                        label={"Delete"}
                        onClick={()=>handleDelete(params)}
                    />,
                    <GridActionsCellItem
                        icon={<VideoCall/>}
                        label={"Join Table"}
                        onClick={()=>handleJoin(params)}
                        showInMenu
                    />
                ]
            }
        }
    ]
    return (<>
    <br/>
    <Typography variant="h4" color="primary">Therapy Group</Typography>
    <br/>
    <Stack alignItems="flex-end">
        <div style={{height:"400px",width:"100%"}}>    
            <DataGrid
                rows={data.rows}
                columns={column}
                hideFooter
                loading={data.loading}
            />    
        </div>
        <Button>Book new Therapy</Button>
    </Stack>
    </>

    )
}
export default TherapyGroup;