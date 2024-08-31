import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './home/Home';
import CrudPlayers from './players/crudPlayers';
import CrudCenters from './centros/crudCenters';
import FormCenters from './centros/formCenters';

import "../src/Estilos.css";
import Auth from '../auth/auth';
import axios from 'axios';
import ResetPassword from '../auth/resetPassword';

const URI_AUTH = 'http://localhost:8000/auth/';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  // const [userData, setUserData] = useState(null); // Estado para almacenar datos del usuario
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userTorneo'));

    if (!user) {

      setIsAuth(false);
      
      
    } else {
      axios.get(URI_AUTH + 'verify', {
        headers: { Authorization: `Bearer ${user.tokenUser}` }
        
      }).then(response => {
        if (response.status === 200) {
          setIsAuth(true);
        
          
          // setUserData(user);  // Guarda los datos completos del usuario
        }
      }).catch(() => {
        setIsAuth(false);// comente esta lina 17 de agosto
      });
    }
  }, []);

  const logOutUser = () => {
    localStorage.removeItem('userTorneo');
    setIsAuth(false);
    navigate("/auth");
  };
  <div style={{ backgroundImage: "url(/image.png)" }}>
 
</div>

  return (
    <> 
    
    <div className='barra'>

  
    <nav className="navbar navbar-expand-lg ">
   <div className='posicion-contenido'>
    <lu>
      
        <span className='color'>
   <Link className="sin-subrayado" to="/">Inicio</Link></span>
   
   
   </lu>
    
  </div>
  
  <div className="collapse navbar-collapse" id="navbarNav">
  <div className='posicion-contenido_2'>
    
    
    <span className='color'>
    <Link  className="sin-subrayado"to="/players">Players</Link>
    </span>
   
    </div>
    

          
          <span className='color'>
            <Link className="sin-subrayado" to="/centers">Centros</Link> 
            </span>
{/* 
            <span className='color'>
            <Link className="sin-subrayado" to="/formCenters">Registro</Link> 
            </span> */}
         
          {!isAuth
           ?
              
                 <span className='color'>
              <Link className="sin-subrayado" to="/auth">Sesión</Link>
              </span>
             
              : 
              ''
           }
         
          

          {isAuth ?
            <li className='posicion-salir'>
              <span className='color'>
              <button onClick={() => logOutUser()} className='btn btn-secondary'>
                <i className='fa-solid fa-door-closed'></i> Salir
              </button>
              </span>
            </li>
           
            : ''
          }
          
     
   
  </div>
  
  
</nav>
</div>

    <div className='container'>
  
      {/* <nav >
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
          <li>
            <Link to="/centers">Centros</Link>
          </li>
           {!isAuth
           ?
              <li>
              <Link to="/auth">Sesión</Link>
              </li>
              : 
              ''
           }
         
          

          {isAuth ?
            <li>
              <button onClick={() => logOutUser()} className='btn btn-secondary'>
                <i className='fa-solid fa-door-closed'></i> Salir
              </button>
            </li>
            : ''
          }

          

        </ul>
      </nav> */}
      
      <Routes>
        <Route path='/' element={<Home />} />
        {isAuth ?
          <>
            <Route path='/players' element={<CrudPlayers />} />
            <Route path='/centers' element={<CrudCenters />} />
            <Route path="/formcenters/:id" element={<FormCenters />} />
            <Route path="/formcenters" element={<FormCenters />} />
            
          </>
          :
          <Route path='*' element={<Navigate to="/" />} />
        }
        {
         !isAuth 
         ? 
              <Route path='/auth' element={<Auth />} />      
              :
              ''
        }
        <Route path='/reset-password' element={<ResetPassword />}/>
       
      </Routes>
   
      </div>
      
    </>
  );
}

export default App;
