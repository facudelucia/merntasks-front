import {FORMULARIO_PROYECTO, OBTENER_PROYECTO, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTIVO, ELIMINAR_PROYECTO, PROYECTO_ERROR} from "../../types"

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTO:
            return{
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return{
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorFormulario:false
            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorFormulario: true
            }
        case PROYECTO_ACTIVO:
            return{
                ...state,
                activo: state.proyectos.filter(
                        proyecto => proyecto._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                proyectos: state.proyectos.filter(
                    proyecto => proyecto._id !== action.payload),
                activo: null
            }
        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        default:
          return state;
    }
}