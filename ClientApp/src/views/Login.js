import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import Swal from 'sweetalert2'
import { Navigate } from "react-router-dom"

const Login = () => {

    const [_correo, set_Correo] = useState("")
    const [_clave, set_Clave] = useState("")
    const { user, iniciarSession } = useContext(UserContext)

    if (user != null) {
        return <Navigate to="/"/>
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let request = {
            correo: _correo,
            clave:_clave
        }

        const api = fetch("api/session/Login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request)
        })
        .then((response) => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then((dataJson) => {
            if (dataJson.idUsuario == 0) {
                Swal.fire(
                    'Opps!',
                    'No se encontro el usuario',
                    'error'
                )
            } else {
                iniciarSession(dataJson)
            }

        }).catch((error) => {
            Swal.fire(
                'Opps!',
                'No se pudo iniciar sessión',
                'error'
            )
        })
    }

    return (
        
        <div className="container" id="logcontainer">

            <div className="row justify-content-center m-1" >

                <div className="col-md-6 col-sm-8 col-xl-4 col-lg-5 formulario">
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group text-center pt-3">
                            <h1 className="text-light">BIENVENIDO</h1>
                        </div>
                        <div className="form-group mx-sm-4 pt-3">
                            <input type="email" className="form-control form-control-user" aria-describedby="emailHelp" placeholder="Correo"
                                value={_correo}
                                onChange={(e) => set_Correo(e.target.value)}
                            />
                        </div>
                        <div className="form-group mx-sm-4 pt-3">
                            <input type="password" className="form-control form-control-user" placeholder="Contraseña"
                                value={_clave}
                                onChange={(e) => set_Clave(e.target.value)}
                            />
                        </div>
                        <div className="form-group mx-sm-4 pb-2" >
                            <input type="submit" id="ingresar" className="btn btn-block ingresar" value="INGRESAR"></input>
                        </div>
                        

                    </form>

                    

                </div>

            </div>

        </div>
        )
}

export default Login