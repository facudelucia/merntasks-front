import React,{useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import validator from "validator"
import alertaContext from "../../context/alertas/alertaContext"
import authContext from "../../context/authentication/authContext"
const Login = (props) => {
    const {alerta, mostrarAlerta} = useContext(alertaContext)
    const {mensaje, autenticado, logIn} = useContext(authContext)
    useEffect(() => {
        if(autenticado){
            props.history.push("/proyectos")
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.category)
        }
    }, [mensaje, autenticado, props.history])
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const {email, password} = user
    const handleChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit =(e) => {
        e.preventDefault();
        if(!validator.isEmail(email)){
            mostrarAlerta("Debes ingresar un email valido", "alerta-error")
            return
        }else if(password.trim() === ""){
            mostrarAlerta("Ingresa una contraseña", "alerta-error")
            return
        }
        logIn({
            email,
            password
        })
    }
    return ( 
        <div className="form-usuario">
            {alerta && <div className={`alerta ${alerta.category}`}>{alerta.msg}</div>}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                <form onSubmit={handleSubmit}>
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
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar sesión"
                        />
                    </div>
                </form>
                <Link to={"/nueva-cuenta"} className="enlace-cuenta">Registrarme</Link>
            </div>
        </div>
     );
}
 
export default Login;