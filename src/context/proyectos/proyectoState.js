import React, {useReducer} from 'react';
import proyectoContext from "./proyectoContext"
import proyectoReducer from "./proyectoReducer"
import {FORMULARIO_PROYECTO, OBTENER_PROYECTO, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTIVO, ELIMINAR_PROYECTO, PROYECTO_ERROR} from "../../types"
import clienteAxios from '../../config/config';
const ProyectoState = props => {
    
    const initialState = {
        proyectos : [],
        errorFormulario: false,
        formulario: false,
        activo: null,
        mensaje: null
    }

const [state, dispatch] = useReducer(proyectoReducer, initialState)
const mostrarFormulario = () => {
    dispatch({
        type: FORMULARIO_PROYECTO
    })
}
const obtenerProyectos = async () => {
    try {
        const response = await clienteAxios.get("/api/projects")
        //console.log(response)
        dispatch({
            type: OBTENER_PROYECTO,
            payload: response.data.projects
        })
    } catch (error) {
        console.log(error)
        const alerta ={
            msg: "there was a mistake",
            category: "alerta-error"
        }
        dispatch({
            type: PROYECTO_ERROR,
            payload: alerta
        })
    }
}
const agregarProyecto = async (project) => {
    
    try {
        const response = await clienteAxios.post("/api/projects", project)
        console.log(response)
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: response.data
        })
    } catch (error) {
        console.log(error)
        const alerta ={
            msg: "there was a mistake",
            category: "alerta-error"
        }
        dispatch({
            type: PROYECTO_ERROR,
            payload: alerta
        })
    }
}
const validarFormulario = () => {
    dispatch({
        type: VALIDAR_FORMULARIO
    })
}
const proyectoActivo = proyectoId => {
    dispatch({
        type: PROYECTO_ACTIVO,
        payload: proyectoId
    })
}
const eliminarProyecto = async (proyectoId)=>{
    try {
        await clienteAxios.delete(`/api/projects/${proyectoId}`)
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    } catch (error) {
        console.log(error)
        const alerta ={
            msg: "there was a mistake",
            category: "alerta-error"
        }
        dispatch({
            type: PROYECTO_ERROR,
            payload: alerta
        })
    }
}
return (
    <proyectoContext.Provider
        value={{
            proyectos: state.proyectos,
            formulario: state.formulario,
            errorFormulario: state.errorFormulario,
            activo: state.activo,
            mensaje: state.mensaje,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            validarFormulario,
            proyectoActivo,
            eliminarProyecto
        }}
    >
        {props.children}
    </proyectoContext.Provider>
)
}
export default ProyectoState