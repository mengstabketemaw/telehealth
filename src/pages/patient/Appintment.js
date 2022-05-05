import {DataGrid,useGridApiRef,useGridApiContext} from "@mui/x-data-grid"
import { Button } from "@mui/material"

const row = [
    {id:1,name:"mrx"},
    {id:2,name:"mry"},
    {id:3,name:"mrz"},
]

const column = [
    {
        field:"name",
        editable:true
    }
]


const AddToolbar = (props) => {
    const apiRef = useGridApiContext();
    
    const handleClick=()=>{
        const id = 12;
        console.log(apiRef)
        apiRef.current.updateRows([{ id, isNew: true }]);
        apiRef.current.startRowEditMode({ id });
        setTimeout(() => {
            apiRef.current.setCellFocus(id, 'name');
          });
    }


    return <Button onClick = {handleClick} onMouseDown={e=>e.preventDefault()}>
        add new record
    </Button>
}


const Appointment = ()=>{
    const apiRef = useGridApiRef();

    return <>
    <div style={{height:"400px",width:'100%'}}>
        <DataGrid
            rows={row}
            columns={column}
            apiRef={apiRef}
            editMode="row"
            experimentalFeatures={{newEditingApi:true}}
            components={{
                Toolbar:AddToolbar
            }}
            componentsProps={{
                toolbar:{
                    apiRef
                }
            }}
        />
    </div>    
    </>
}
export default Appointment;