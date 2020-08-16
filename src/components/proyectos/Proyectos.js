import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar'
import Barra from "../layout/Barra"
import FormTareas from '../tareas/FormTareas'
import ListadoTareas from '../tareas/ListadoTareas'
import authContext from "../../context/authentication/authContext"
const Proyectos = () => {
    const {userAuthenticated} = useContext(authContext)

    useEffect(() => {
        userAuthenticated()
    }, [])
    return ( 
        <div className="contenedor-app">
            <aside>
                <Sidebar />
            </aside>
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTareas />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;