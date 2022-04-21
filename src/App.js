import Login from "./pages/Login";
import {Routes,Route,Navigate} from "react-router"
import CreateAccount from "./pages/CreateAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace/>}/>    
      <Route path="login" element={<Login/>}/>
      <Route path="create-account" element={<CreateAccount/>}/>
    </Routes>
    );
}

export default App;
