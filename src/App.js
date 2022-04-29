import Login from "./pages/Login";
import {Routes,Route,Navigate} from "react-router"
import CreateAccount from "./pages/CreateAccount";
import Patient from "./pages/patient/Patient";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace/>}/>    
      <Route path="login" element={<Login/>}/>
      <Route path="create-account" element={<CreateAccount/>}/>
      <Route path="patient" element={<Patient/>}/>
    </Routes>
    );
}

export default App;
