import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import FormPlayers from './formPlayers';
import FormQueryPlayer from './formQueryPlayers';
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../players/Estilos.css';


const URI = 'http://localhost:8000/players/';
const PATH_FOTOS = 'http://localhost:8000/public/uploads/'

const CrudPlayers = () => {
    const [playerList, setPlayerList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar')

    const [player, setPlayer] = useState({

        documento: '',
        nombres: '',
        apellidos: '',
        genero: '',
        foto: ''
    })

    useEffect(() => {
        getAllPlayers();
    }, [playerList]);

    const getAllPlayers = async () => {
        try {
            const response = await axios.get(URI);
            setPlayerList(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de jugadores:', error);
        }
    };

    const deletePlayer = (idPlayer) => {
        Swal.fire({
            title: "¿Está seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(URI + idPlayer);
                    Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
                    getAllPlayers();
                } catch (error) {
                    console.error('Error al borrar el jugador:', error);
                }
            }
        });
    };
    const getPlayer = async (idPlayer) => {
        setButtonForm('Enviar')
        const respuesta = await axios.get(URI + idPlayer)
        
        setButtonForm('Actualizar')
        setPlayer({
            ...respuesta.data
        })
    }
    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }

    return (
        <>
         <FormPlayers buttonForm={buttonForm} player={player} URI={URI} updateTextButton={updateTextButton}/>
         <br>
         </br>
        {/* <div className="componente-tabla"> */}
          
          
          
        <table  className='Tabla' >
            
            <thead  >
                <tr>
                    <th className='color-columna'>Documento</th>
                    <th className='color-columna'>Nombre</th>
                    <th className='color-columna'>Apellidos</th>
                    <th className='color-columna'>Género</th>
                    <th className='color-columna'>Foto</th>
                    <th className='color-columna'>Acciones</th>
                    
                </tr>
                
            </thead>
            <tbody>
                {playerList.map((player) => (
                    <tr key={player.id}>
                        <td>{player.documento}</td>
                        <td>{player.nombres}</td>
                        <td>{player.apellidos}</td>
                        <td>{player.genero}</td>
                        <td><img width="150px"  src={PATH_FOTOS + player.foto}></img></td>
                        <td>
                            <button  className='color-boton' onClick={() => getPlayer(player.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>
                            <button  className='color-rojo' onClick={() => deletePlayer(player.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button>

                            
                            
                        </td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
        {/* </div> */}
        
        
         
       
        
      < FormQueryPlayer URI ={URI} getPlayer={getPlayer} deletePlayer={deletePlayer} buttonForm={buttonForm}/>
      
        </>

    )
}

export default CrudPlayers;
