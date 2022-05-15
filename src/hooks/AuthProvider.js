import * as React from 'react';
import useToken from './useToken';
import Auth from '../api/Auth';
const AuthContext = React.createContext();
export const useAuth = ()=>React.useContext(AuthContext);
const AuthProvider = ({children}) => {
    const {token,setToken} = useToken();
    const [auth,_] = React.useState(new Auth(token,setToken));
 
    return (<>
        <AuthContext.Provider value = {{auth}}>
            {children}
        </AuthContext.Provider>
    </>)
}
export default AuthProvider;