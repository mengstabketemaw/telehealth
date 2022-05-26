import { DisabledByDefault, Done } from "@mui/icons-material";
import { Avatar, Button, Chip, Link, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Config from "../../api/Config";
import CustomNoDataOverlay from "../../components/gridComponents/CustomNoDataOverlay";
import {useSnackbar} from "./Admin"

const Doctors = () => {
    const {setSnackbar} = useSnackbar();
    const [data,setData] = useState({loading:true,row:[]})

    useEffect(()=>{
        axios.get(Config.ADMIN_URL+"/doctors",Config.getAuthHeaders())
        .then(({data})=>{
            const mappedData = data.map(element=>{
                return {
                    id:element.user.id,
                    docRoles:element.docRoles.join(),
                    avatar: element.user.email,
                    name:element.user.firstname+" "+element.user.middlename,
                    specialization:element.specialization,
                    homedoctor:element.homedoctor||false,
                    disabled:element.user.disabled,
                    doctorId:element.id,
                }
            })
            setData({loading:false,row:mappedData});
        })
        .catch(error=>{
            setSnackbar({open:true,children:"could't load data from the server: "+error.message,severity:"error"});
            setData({row:[],loading:false});
        })
    },[]);
    
    const handleAccountStatus = (row) => {
        setData({...data,loading:true});
            axios.put(Config.ADMIN_URL+`/user/${row.id}?disabled=${!row.disabled}`,null,Config.getAuthHeaders())
            .then(()=>{
                const newDate = data.row.map(e=>{
                    if(e.id===row.id)
                    return {...e,disabled:!row.disabled};
                    return e;
                });
                setData({loading:false,row:newDate})
                setSnackbar({open:true,children:`Account has been ${row.disabled?"enabled":"disabled"} successfully`});
            })
            .catch(error=>{
                setData({...data,loading:false})
                setSnackbar({open:true,children:"error changing use account: "+error.message,severity:"error"})
            })
    }

    //from https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
    //good answer by kj-sudarshan
    const handleDownloadApi = async (id) => {
        setSnackbar({open:true,children:"File is being download please wait, we will notify you when it is ready!",severity:"info"})
        try {
            // It doesn't matter whether this api responds with the Content-Disposition header or not
            const response = await axios.get(
              `${Config.ADMIN_URL}/doctor/${id}`,
              {
                responseType: "blob", // this is important!
                ...Config.getAuthHeaders()
              }
            );
            const filename = response.headers?.file_name||"unknown";
            const url = window.URL.createObjectURL(new Blob([response.data])); // you can mention a type if you wish
            const link = document.createElement("a");
            link.href = url;
            console.log(response);
            link.setAttribute("download",filename); //this is the name with which the file will be downloaded
            link.click();
            // no need to append link as child to body.
            setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
          } catch (e) {
            setSnackbar({open:true,children:"couldn't download the file: "+e.message,severity:"error"});
          } 
    }

    const column = [
        {
            field:"avatar",
            headerName:"Avatar",
            width:100,
            renderCell:({value})=>{
                return <Avatar sx={{width:'70px',height:'70px'}} src={`${Config.USER_URL}/avatar/${value}`}/>
            }
        },
        {
            field:"name",
            flex:1,
            headerName:"Name",
        },
        {
            field:"specialization",
            flex:1,
            headerName:"specialization",
            renderCell:({row})=>{
                return <Button onClick={()=>handleDownloadApi(row.doctorId)}>{row.specialization}</Button>
            }
        },
        {
            field:"docRoles",
            flex:0.5,
            headerName:"Roles",
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
                        label={row.disabled?"Enable Account":"Disable Account"}
                        showInMenu
                        icon={row.disabled?<Done color="success"/>:<DisabledByDefault/>}
                        onClick={()=>handleAccountStatus(row)}
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