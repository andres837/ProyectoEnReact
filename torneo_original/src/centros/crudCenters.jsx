import axios from "axios";
import React, { useEffect, useState } from "react";
import FormCenters from '../centros/formCenters';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import "../centros/formEstilo.css";

import moment from 'moment';

const URI_CENTERS = 'http://localhost:8000/centers/'

const CrudCenters = () => {
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true); // Nuevo estado para el manejo de carga
    const [buttonForm, setButtonForm] = useState('Enviar');
      //FUNCION PARA FORMATEAR EL CAMPO UPDATEDAT Y MOSTRAR EL LA VISTA 
    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';
    
        const date = new Date(dateString);
    
        if (isNaN(date.getTime())) return 'Fecha inválida';
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}/${month}/${day}`;
    };
    
    const [centerParaForm, setCenterParaForm] = useState({
        id: '',
        codigo_centro: '',
        idDepto: '',
        id_municipio: '',
        nombre_centro: ''
    });

  // Función para obtener todos los centros
const getAllCenters = async () => {
    setLoading(true); // Activar el estado de carga antes de hacer la llamada
    try {
        const response = await axios.get(URI_CENTERS);
        
        // console.log('Respuesta de la API:', response.data); // Imprimir la respuesta para depuración
        
        if (Array.isArray(response.data)) { // Verifica que la respuesta sea un arreglo
            setCenters(response.data); // Establece el estado con los datos
        } else {
            // console.error('La respuesta no es un arreglo:', response.data);
            // Opcional: Manejar el error en la interfaz de usuario si es necesario
        }
    } catch (error) {
        console.error('Error fetching centers:', error);
        // Opcional: Mostrar un mensaje de error en la interfaz de usuario
    } finally {
        setLoading(false); // Asegúrate de desactivar el estado de carga
    }
};


    // Cargar los centros cuando el componente se monta
    useEffect(() => {
        getAllCenters();
    }, []); // centers

    // Función para obtener un centro específico por su ID
    const getCenter = async (idCenter) => {
        
            setButtonForm('Enviar')
            const response = await axios.get(URI_CENTERS + idCenter);
            // const centerData = response.data;
            setButtonForm('Actualizar'); // Cambiar el formulario a modo Actualizar
            
            setCenterParaForm({...response.data});
             // También deberías llamar a `searchMunicipio` para cargar los municipios correspondientes
           searchMunicipio(response.data.idDepto);
       
    };

    // Función para actualizar el texto del botón en el formulario
    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    if (loading) {
        return <p>Cargando centros...</p>; // Puedes mostrar un mensaje de carga mientras se obtienen los datos
    }



    
    // Recibe los parámetros en FormCenters
//Modificar el Link para enviar el objeto center al componente FormCenters a través de la propiedad state.
//Usar useLocation en FormCenters para acceder a los datos que se enviaron mediante el Link, y establecer los valores del formulario si están disponibles.
    return (
        <>
        <br></br>
        <button className="btn btn-danger">

        
            <Link className="sin-subrayado" to="/formCenters">Registrar un Centro</Link> 
           
        </button>
        <br>
       
        </br>
       
             <hr />
            <h1 style={{ color: 'Black', marginLeft: '400px' }}>Centro de formación</h1>
            <table>
                <thead>
                    <tr>
                        <th>Código de centro</th>
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Nombre del centro</th>
                        <th>Ultimo cambios</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {centers.map((center) => (
                        <tr key={center.id}>
                            <td>{center.codigo_centro}</td>
                            <td>{center.deptos?.DepNombre || 'No disponible'}</td> {/* Manejo de null */}
                            <td>{center.mcipio?.mcipioNombre}</td>
                            <td>{center.nombre_centro}</td>
                            <td className="color-fecha">{formatDate(center.updatedAt)}</td>
                            
                            <td>
                            <Link  to={{pathname: `/formcenters/${center.id}`, 
                            state: { 
                            codigo_centro: center.codigo_centro,
                            idDepto: center.idDepto,
                            id_municipio: center.id_municipio,
                            nombre_centro: center.nombre_centro,
                            
                           
                             }
                            
                            //  buttonForm, // Pasamos el estado del botón
                            //  updateTextButton // Pasamos la función
               
            
                             
                                 }} 
                                 className="sin-subrayado"
                                    >
                                       <button className="btn btn-primary" ><i className="fa-solid fa-pen-to-square"></i></button>
                                    
                                    </Link>
                                    {/* <button className="btn btn-success">

        
<Link className="sin-subrayado" to="/formCenters"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
  <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
</svg></Link> 

</button> */}
                                
                            </td>
                            
                        
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <Routes>
                
            </Routes>
           

            
        </>
    );
};

export default CrudCenters;
