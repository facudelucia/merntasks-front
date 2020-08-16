import React,{useContext, useEffect} from 'react';
import {Route, Redirect} from "react-router-dom";
import authContext from "./context/authentication/authContext"
const PrivateRoute = ({
    component: Component,
    ...props
}) => {
    const {autenticado, userAuthenticated, cargando}=useContext(authContext)
    useEffect(() => {
        userAuthenticated()
    }, [])
    return ( 
        <Route 
            {...props}
            render={props => (!autenticado && !cargando) 
                    ? (<Redirect to="/"/>)
                    : (<Component {...props}/>)}
        />
     );
}
 
export default PrivateRoute;


