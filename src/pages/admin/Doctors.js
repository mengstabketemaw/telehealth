import { DisabledByDefault, Done } from "@mui/icons-material";
import { Avatar, Chip, Link, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import CustomNoDataOverlay from "../../components/gridComponents/CustomNoDataOverlay";

const Doctors = () => {
    const [data,setData] = useState({loading:false,row:[]})
    useEffect(()=>{
        const row = [
            {
                id:1,
                avatar:"this avatar",
                name:"Mamush tefera",
                specialization:"Surgned",
                document:"doc",
                homedoctor:false,
                disabled:false,
            },
            {
                id:2,
                avatar:"this avatar",
                name:"Mamush tefera",
                specialization:"Surgned",
                document:"doc",
                homedoctor:true,
                disabled:true,
            }
        ]
        setData({loading:false,row});
    },[]);
    const column = [
        {
            field:"avatar",
            headerName:"Avatar",
            width:100,
            renderCell:(params)=>{
                //just to be sure of params, if i get the id of the user, i think this the best place to configure the avatar thing
                console.log(params);
                return <Avatar />
            }
        },
        {
            field:"name",
            flex:1,
            headerName:"Name",
        },
        {
            field:"Specialization",
            flex:1,
            headerName:"specialization",
        },
        {
            field:"document",
            flex:0.5,
            headerName:"Document",
            renderCell:()=>{
                //render the link to the doctor account here
                <Link>document name</Link>
            }
        },
        {
            field:"homedoctor",
            headerName:"Home Doctor",
            type:"boolean",
        },
        {
            field:"disabled",
            headerName:"Activated",
            flex:1,
            type:"boolean",
            renderCell:({value})=>{
                return value?<Chip icon={<DisabledByDefault/>} color={"error"} label="Disabled"/>:
                <Chip icon={<Done color="success"/>} color={"success"} label="Activated"/>
            }
        },
        {
            field:"actions",
            type:"actions",
            getActions:({row})=>{
                return [
                    <GridActionsCellItem
                        label="View Profile"
                        showInMenu
                        />,
                    <GridActionsCellItem
                        label={row.disabled?"Enable":"Disable"}
                        showInMenu
                        icon={row.disabled?<Done color="success"/>:<DisabledByDefault/>}
                    />
                ]
            }
        }
    ]
    return (<>
    <br/>
    <Typography variant="h4" color="primary">Doctors</Typography>
    <br/>
    <div style={{height:"500px",width:"100%"}}>
        <DataGrid
            loading={data.loading}
            rows={data.row}
            columns={column}
            hideFooter
            rowHeight={100}
            components={
                { NoRowsOverlay:CustomNoDataOverlay }
            }
        />
    </div>
    </>)
}
export default Doctors;