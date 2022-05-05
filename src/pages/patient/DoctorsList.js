import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Consultants from "../../components/appointment/Consultants";
import TherapyGroupList from "../../components/therapygroup/TherapyGroupList";

const DoctorList = () =>{
const {value} = useParams()
const [tabValue,setTabValue] = useState(value);
const handleChange = (event,newValue)=>{
    setTabValue(newValue);
}

    return <>
<TabContext value={tabValue||"appointment"}>
    <TabList onChange={handleChange}>
        <Tab label={"Appointment"} value={"appointment"}/>
        <Tab label={"Therapy Group"} value={"therapygroup"}/>
    </TabList>
    <TabPanel value={"appointment"}>
        <Consultants/>
    </TabPanel>
    <TabPanel value={"therapygroup"}>
        <TherapyGroupList/>
    </TabPanel>
</TabContext>

    </>
}
export default DoctorList;