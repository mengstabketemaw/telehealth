import { useState } from "react";
import {ShowLocations} from "../../components/maps/MapUtils"

const users = [
  {name:"mamush",position:[9,38]},
  {name:"mereed",position:[9.12,38.44]},
  {name:"mamaru",position:[9.4,38.2]},
  {name:"matiwos",position:[9.32,38.90]},
]

const DocIndex = () => {
const [position,setPosition] = useState();
const setLocation = (lat,lng) =>{
  setPosition({lat,lng});
}
return <>
  
  <p>Hello Doctor how r u{position?.lat}-{position?.lng}</p>
  <ShowLocations users={users}/>
</>
    
}
export default DocIndex;