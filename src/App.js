import Login from "./pages/Login";
import {Routes,Route,Navigate} from "react-router"
import CreateAccount from "./pages/CreateAccount";
import Patient from "./pages/patient/Patient";
import Dashboard from "./pages/patient/Dashboard";
import HomeDoctor from "./pages/patient/HomeDoctor";
import Appointment from "./pages/patient/Appintment";
import TherapyGroup from "./pages/patient/TherapyGroup";
import Vdt from "./pages/patient/HomeDoctor";
import MedicalRecord from "./pages/patient/MedicalRecord";
import ApplyForHelp from "./pages/patient/ApplyForHelp";
import Profile from "./pages/patient/Profile";
import Blog from "./pages/patient/Blog";
import DoctorList from "./pages/patient/DoctorsList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace/>}/>    
      <Route path="login" element={<Login/>}/>
      <Route path="create-account" element={<CreateAccount/>}/>
      <Route path="patient" element={<Patient/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="dashboard" element={<Dashboard/>}>
            <Route path="appointment" element={<Appointment/>}/>
            <Route path="therapygroup" element={<TherapyGroup/>}/>
            <Route path="homedoctor" element={<HomeDoctor/>}/>
            <Route path="medicalrecord" element={<MedicalRecord/>}/>
          </Route>
          <Route path="appointment" element={<Appointment/>}/>
          <Route path="therapygroup" element={<TherapyGroup/>}/>
          <Route path="homedoctor" element={<HomeDoctor/>}/>
          <Route path="vdt" element={<Vdt/>}/>
          <Route path="medicalrecord" element={<MedicalRecord/>}/>
          <Route path="applyforhelp" element={<ApplyForHelp/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="blog" element={<Blog/>}/>
          <Route path="doctorlist/:value" element={<DoctorList/>}/>
      </Route>
    </Routes>
    );
}

export default App;
