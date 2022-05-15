import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import {useSelector} from "react-redux";

/**
 * A wrapper around the element which checks if the user is authenticated
 * If authenticated, renders the passed element
 * If not authenticated, redirects the user to Login page.
 */
const PrivateElement = ({ children }) => {
  let location = useLocation()
  const authenticatedUser = useSelector(store=>store.user);
  console.log(children);
  const {role} = authenticatedUser.data;
  if(Boolean(role)){
    if(location.pathname.includes(role.toLowerCase()))
        return <Outlet/>
    else    
        return <Navigate to={role.toLowerCase()}/>
  }
  return <Navigate to="/login" state={{from:location}}/>
}

export default PrivateElement