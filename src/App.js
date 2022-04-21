import Login from "./pages/Login";
import {Routes,Route,Navigate} from "react-router"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace/>}/>    
      <Route path="login" element={<Login/>}/>
    </Routes>
    );
}

export default App;
