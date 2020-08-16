import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from "./components/proyectos/Proyectos";
import ProyectoState from './context/proyectos/proyectoState';
import TareasState from './context/tareas/tareasState';
import AlertaState from "./context/alertas/alertaState";
import AuthState from './context/authentication/authState';
import tokenAuth from "./config/tokenAuth"
import PrivateRoute from "./PrivateRoute"

const token = localStorage.getItem("token")
  if(token){
    tokenAuth(token)
  }
function App() {
  
  return (
    
    <ProyectoState>
      <TareasState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/nueva-cuenta"component={NuevaCuenta}/>
                <PrivateRoute exact path="/proyectos" component={Proyectos}/>
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareasState>
    </ProyectoState>
    
  );
}

export default App;
