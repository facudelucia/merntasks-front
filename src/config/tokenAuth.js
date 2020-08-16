import clienteAxios from "./config"

const tokenAuth = token =>{
    if(token){
        clienteAxios.defaults.headers.common["x-token"] = token
    }else{
        delete clienteAxios.defaults.headers.common["x-token"];
    }
}

export default tokenAuth