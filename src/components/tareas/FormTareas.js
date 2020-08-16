import React,{useContext, useState, useEffect} from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext"
import tareasContext from "../../context/tareas/tareasContext"
const FormTareas = () => {
    
    //context proyecto
    const proyectosContext = useContext(proyectoContext)
    const {activo} = proyectosContext
    

    //context tarea
    const tareaContext = useContext(tareasContext)
    const {agregarTarea, validarTarea, errorTarea, obtenerTareas, activa, actualizarTarea} = tareaContext

    useEffect(() => {
        if(activa !== null){
            setForm(activa)
        }else{
            setForm({name: ""})
        }
    }, [activa])
    

    //state del form
    const [form, setForm] = useState({
        name:""
    })
    const{name} = form

    

    if(!activo) return null;
    const [proyectoActual] = activo

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name.trim() === "") {
            validarTarea()
            return 
        }
        if(activa === null){
            form.project = proyectoActual._id
            agregarTarea(form)
        }else{
            actualizarTarea(form)
        }
        
        obtenerTareas(proyectoActual._id)
        setForm({name: ""})
    }

    return ( 
        <div className="formulario">
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        value={activa ? "Editar tarea":"Agregar Tarea"}
                        className="btn btn-primario btn-submit btn-block"
                    />
                </div>
            </form>
            {errorTarea && <p className="mensaje error">El nombre es requerido</p>}
        </div>
     );
}
 
export default FormTareas;