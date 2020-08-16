import React,{Fragment, useContext} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group"
import Tarea from './Tarea'
import proyectoContext from "../../context/proyectos/proyectoContext"
import tareasContext from "../../context/tareas/tareasContext"


const ListadoTareas = () => {
    const {activo, eliminarProyecto} = useContext(proyectoContext)
    const {tareasProyecto} = useContext(tareasContext)
    
    if(!activo) return <h2>Selecciona un proyecto</h2>
    const [proyectoActual] = activo
    const handleEliminarProyecto = () => {
        eliminarProyecto(proyectoActual._id)
    }

    
    
    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.name}</h2>
            <ul className="listado-tareas">
                {tareasProyecto.length === 0 
                ? <li 
                    className="tarea"
                    ><p>No hay tareas</p>
                </li>
                : <TransitionGroup>
                    {tareasProyecto.map(tarea => (
                        <CSSTransition 
                            key={tarea._id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea tarea={tarea}/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                }
                
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={handleEliminarProyecto}
            >Eliminar proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;