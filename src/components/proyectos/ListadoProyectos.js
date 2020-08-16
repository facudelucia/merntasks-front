import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Proyecto from './Proyecto'
import proyectoContext from "../../context/proyectos/proyectoContext"

const ListadoProyectos = () => {
    const { proyectos, mensaje, obtenerProyectos } = useContext(proyectoContext)
    useEffect(() => {

        obtenerProyectos()
        // eslint-disable-next-line
    }, [mensaje])
    if (proyectos.length === 0) return <p>No hay proyectos, puedes crear uno</p>;
    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
            {proyectos.map(proyecto =>(
                <CSSTransition 
                    key={proyecto._id}
                    timeout={300}
                    classNames="proyecto" 
                >
                    <Proyecto proyecto={proyecto}/>
                </CSSTransition>
           ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;