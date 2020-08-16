import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext"
const NuevoProyecto = () => {
    const [proyecto, setProyecto] = useState({
        name: ""
    })
    const { name } = proyecto
    const proyectosContext = useContext(proyectoContext)
    const { formulario, mostrarFormulario, agregarProyecto, validarFormulario, errorFormulario } = proyectosContext
    const handleChange = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(name === "") {
            validarFormulario()
            return 
        }
        agregarProyecto(proyecto)
        setProyecto({name: ""})
    }
    
    const handleClick = () => {
        mostrarFormulario()
    }
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={handleClick}
            >Nuevo Proyecto</button>
            {formulario &&
            <form 
                className="formulario-nuevo-proyecto" 
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="name"
                    className="input-text"
                    placeholder="Nombre proyecto"
                    value={name}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Agregar proyecto"
                    className="btn btn-primario btn-block"
                />
            </form> }
            {errorFormulario && <p className="mensaje error">El nombre es requerido</p>}
        </Fragment>
    );
}

export default NuevoProyecto;