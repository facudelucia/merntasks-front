import authContext from "./authContext"
import React, { useReducer } from "react"
import authReducer from "./authReducer"
import clienteAxios from "../../config/config"
import tokenAuth from "../../config/tokenAuth"
import { REGISTRO_EXITOSO, REGISTRO_ERROR, LOGIN_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, CERRAR_SESION } from "../../types"
const AuthState = props => {
    
    const initialState = {
        token: localStorage.getItem("token"),
        autenticado: null,
        usuario: null,
        mensaje:null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const registerUser = async datos =>{
        try {
            const response = await clienteAxios.post("/api/users", datos)
            console.log(response.data)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: response.data
            })
            userAuthenticated()
        } catch (error) {
            console.log(error)
            const alerta ={
                msg: error.response.data.msg,
                category: "alerta-error"
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            }) 
        }
    }
    const userAuthenticated = async ()=>{
        const token = localStorage.getItem("token")
        if(token){
            tokenAuth(token)
        }
        try {
            const response = await clienteAxios.get("/api/auth")
            dispatch({
                type: OBTENER_USUARIO,
                payload: response.data.user
            })
            //console.log(response.data)
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }
    const logIn = async (datos) => {
        try {
            const response = await clienteAxios.post("/api/auth", datos)
            //console.log(response.data)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: response.data
            })
            userAuthenticated()
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta ={
                msg: error.response.data.msg,
                category: "alerta-error"
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            }) 
        }
    }
    const logOut = ()=>{
        dispatch({
            type: CERRAR_SESION
        })
    }
    return (
        <authContext.Provider
            value={{
                token:state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                cargando:state.cargando,
                registerUser,
                userAuthenticated,
                logIn,
                logOut
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}
export default AuthState