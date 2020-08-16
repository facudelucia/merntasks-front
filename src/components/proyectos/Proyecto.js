import React, { useContext } from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext"
import tareasContext from "../../context/tareas/tareasContext"

const Proyecto = ({proyecto}) => {
    const proyectosContext = useContext(proyectoContext)
    const tareaContext = useContext(tareasContext)
    const {proyectoActivo} = proyectosContext
    const {obtenerTareas} = tareaContext
    const handleClick = () =>{
        proyectoActivo(proyecto._id)
        obtenerTareas(proyecto._id)
    }
    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={handleClick}
            >{proyecto.name}</button>
        </li>
     );
}
 
export default Proyecto;