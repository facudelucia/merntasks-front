import React, { useReducer } from "react";
import tareasReducer from "./tareasReducer";
import tareasContext from "./tareasContext";

import { AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREAS_PROYECTO, TAREA_ACTIVA, ACTUALIZAR_TAREA } from "../../types";
import clienteAxios from "../../config/config";

const TareasState = props => {

    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        activa: null
    }

    const [state, dispatch] = useReducer(tareasReducer, initialState)

    const obtenerTareas = async (project) => {
        console.log(project)
        try {
            const response = await clienteAxios.get("/api/tasks", { params: { project } })
            console.log(response)
            dispatch({
                type: TAREAS_PROYECTO,
                payload: response.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const agregarTarea = async (task) => {
        console.log(task)
        try {
            const response = await clienteAxios.post("/api/tasks", task)
            console.log(response)
            dispatch({
                type: AGREGAR_TAREA,
                payload: response
            })
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarTarea = async (taskId, project) => {
        try {
            await clienteAxios.delete(`/api/tasks/${taskId}`, {params: {project}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: taskId
            })
        } catch (error) {
            console.log(error)
        }
    }

    const tareaActiva = (tarea) => {
        dispatch({
            type: TAREA_ACTIVA,
            payload: tarea
        })
    }

    const actualizarTarea = async (task) => {
        try {
            const response = await clienteAxios.put(`/api/tasks/${task._id}`, task)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: response.data.task
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <tareasContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                activa: state.activa,
                obtenerTareas,
                validarTarea,
                agregarTarea,
                eliminarTarea,
                tareaActiva,
                actualizarTarea
            }}
        >{props.children}
        </tareasContext.Provider>
    )

}


export default TareasState