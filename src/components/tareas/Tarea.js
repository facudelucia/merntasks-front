import React, { useContext } from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareasContext from "../../context/tareas/tareasContext"


const Tarea = ({ tarea }) => {
    const proyectosContext = useContext(proyectoContext)
    const {activo} = proyectosContext
    const tareaContext = useContext(tareasContext)
    const {eliminarTarea, obtenerTareas, actualizarTarea, tareaActiva} = tareaContext
    const [proyectoActual] = activo
    const handleDelete=(e)=>{
        e.preventDefault()
        eliminarTarea(tarea._id, proyectoActual._id)
        obtenerTareas(proyectoActual._id)
    }
    const cambiarEstado = () => {
        if(tarea.status){
            tarea.status = false
        }else{
            tarea.status = true
        }
        actualizarTarea(tarea)
    }
    const handleEdit = () =>{
        tareaActiva(tarea)
    } 
    return (
        <li className="tarea sombra">
            <p>{tarea.name}</p>
            <div className="estado">
                {tarea.status
                    ? <button
                        type="button"
                        className="completo"
                        onClick={cambiarEstado}

                    >Completo</button>
                    : <button
                        type="button"
                        className="incompleto"
                        onClick={cambiarEstado}

                    >Incompleto</button>}
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={handleEdit}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={handleDelete}
                >Eliminar</button>
            </div>
        </li>
    );
}

export default Tarea;