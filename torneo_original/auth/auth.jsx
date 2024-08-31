import axios from "axios";
import { useState } from "react";
import "../auth/Estilos.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ResetPassword from '../auth/resetPassword';

const URI_AUTH = 'http://localhost:8000/auth/';

const Auth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [buttonForm, setButtonForm] = useState('Registrar');
    const [signInOrLogin, setSignInOrLogin] = useState('signIn');
    const [resetPass, setResetPass] =  useState(false);
    

    const sendForm = async (e) => {
        e.preventDefault();

        try {
            if (buttonForm === 'Registrar') {
                console.log('Registrando usuario...');
                
                const response = await axios.post(URI_AUTH, {
                    name: name,
                    email: email,
                    password: password
                }).then(response => {

                    
                    if (response.data.tokenUser) {
                        localStorage.setItem('userTorneo', JSON.stringify(response.data));
                        // window.location.replace(window.location.origin); // Redirige a la raíz del sitio
                        
                    }
                    //console.log(response.data); // Para depuración
                    Swal.fire({ // usamos una alerta para saber si el usuario ya se encuentra registrado.",
                        title: "¡Alerta!",
                        html: "<i>El usuario <strong>"+ email+  "</strong> se encuentra registrado ..</i>",
                        icon: "warning",
                        confirmButtonText: "Aceptar",
                      });
                    
                })
                
                
        
               
               
               
            } else if (buttonForm === 'Iniciar Sesion') {
                console.log('Iniciando sesión...');
                const response = await axios.post(`${URI_AUTH}login`, {
                    email: email,
                    password: password
                });
                console.log(response.data)
                if (response.data.tokenUser) {
                    localStorage.setItem('userTorneo', JSON.stringify(response.data));
                    let miHost = window.location.host
                    console.log(miHost)
                    window.location.href = miHost.toString // Redirige a la raíz del sitio
                } 
            }
        } catch (error) {
            Swal.fire('Error', 'Contraseña incorrecta. Intenta nuevamente.', 'error');
          
        }
    };

    const switchForm = (opcion) => {
        setSignInOrLogin(opcion);
        setButtonForm(opcion === 'signIn' ? 'Registrar' : 'Iniciar Sesion');
    };

    return (
        <>
       
       {/* <div className="container">
       
       <div className="estilo2">
      
      <div className="card text-center">
      
      
   
      <div className="card-header" >
         Usuarios
         </div> */}
           
         
                {

                resetPass == false ?
                signInOrLogin == 'signIn'
                    ? 
                    <button className="btn btn-primary" onClick={() => { switchForm('logIn');setButtonForm('Iniciar Sesion')}}>Iniciar sesión</button>
                    :
                     <span className="btn btn-primary" onClick={() => { switchForm('signIn'); setButtonForm('Registrarse') }}>Registrarse</span>
                    : ''
            }
            {
        
            resetPass == false ?
               <>
            
            <form onSubmit={sendForm}>
                {
                    signInOrLogin == 'signIn'
                        ? 
                        <>
                  <label className="Aliniamiento-textos" htmlFor="name">Nombre completo</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Ingrese su nombre"/>
                        </>
                        : ''
                }
                <br />
                <label className="Aliniamiento-textos" htmlFor="email">Correo electrónico</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"placeholder="Ingrese correo"/>
                <br />
                <label className="Aliniamiento-texto-contraseña" htmlFor="password">Contraseña</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"placeholder="Ingrese contraseña"
                />
                <br />
                <input type="submit" value={buttonForm} className="btn btn-success" />
               
            </form>
            <Link onClick={() =>  { setResetPass(!resetPass) }}>Restablecer contraseña</Link>
             </>
            :
            <>
                <form>
                <label className="Aliniamiento-textos" htmlFor="email">Correo electrónico</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Ingrese correo"
                />
                <br>
                </br>
                <input type="submit" value="Enviar" />
                </form>
                <Link onClick={() => { setResetPass(!resetPass) }}>volver</Link>
            </>
           }
{/* </div>
</div>
</div> */}
            </>

        

    );
};

export default Auth;
