import React,{useContext, useEffect} from 'react';
import authContext from "../../context/authentication/authContext"
const Barra = () => {
    const {usuario, userAuthenticated, logOut} = useContext(authContext)
    useEffect(() => {
        userAuthenticated()
        // eslint-disable-next-line
    }, [])
    const handleLogout = () => {
        logOut()
    }
    return ( 
        <header className="app-header">
            {usuario && <p className="nombre-usuario">Hola <span>{usuario.name}</span></p>}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={handleLogout}
                >Cerrar sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;