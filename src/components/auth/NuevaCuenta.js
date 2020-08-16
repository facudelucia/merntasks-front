import React,{useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import alertaContext from "../../context/alertas/alertaContext"
import authContext from "../../context/authentication/authContext"
import validator from "validator"
const NuevaCuenta = (props) => {
    const {alerta, mostrarAlerta} = useContext(alertaContext)
    const {mensaje, autenticado, registerUser} = useContext(authContext)
    useEffect(() => {
        if(autenticado){
            props.history.push("/proyectos")
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.category)
        }
    }, [mensaje, autenticado, props.history])
    const [user, setUser] = useState({
        name:"",
        email: "",
        password: "",
        confirmar: "",
    })
    const {name, email, password, confirmar} = user
    const handleChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit =(e) => {
        e.preventDefault();
        if(name.trim()=== ""|| password.trim() === "" || confirmar.trim()===""){
            mostrarAlerta("Todos los campos son obligatorios", "alerta-error")
            return
        }else if(!validator.isEmail(email)){
            mostrarAlerta("Todos los campos son obligatorios", "alerta-error")
            return
        }else if(password.length < 6){
            mostrarAlerta("La contraseña debe tener al menos 6 caracteres", "alerta-error")
            return
        }else if(password !== confirmar){
            mostrarAlerta("Las contraseñas no coinciden", "alerta-error")
            return
        }
        registerUser({
            name,
            email,
            password
        })
    }
    return ( 
        <div className="form-usuario">
            {alerta && <div className={`alerta ${alerta.category}`}>{alerta.msg}</div>}
            <div className="contenedor-form sombra-dark">
                <h1>Crear una cuenta</h1>
                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            placeholder="Tu nombre"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            placeholder="Tu email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input 
                            type="password"
                            name="confirmar"
                            id="confirmar"
                            value={confirmar}
                            placeholder="Confirma tu password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={"/"} className="enlace-cuenta">Ya tengo una cuenta</Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;