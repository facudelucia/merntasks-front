import { VALIDAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, TAREAS_PROYECTO, TAREA_ACTIVA, ACTUALIZAR_TAREA } from "../../types"


export default(state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return{
                ...state,
                tareasProyecto: action.payload,
                activa:null
            }
        case VALIDAR_TAREA:
            return{
                ...state,
                errorTarea: true
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                tareasProyecto: [action.payload, ...state.tareasProyecto, ],
                errorTarea: false
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasProyecto: state.tareasProyecto.filter(
                    tarea => tarea._id !== action.payload),
                activa: null
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
                activa:null,
                errorTarea: false
            }
        case TAREA_ACTIVA:
            return{
                ...state,
                activa: action.payload
            }
        default:
            return state;
    }
}