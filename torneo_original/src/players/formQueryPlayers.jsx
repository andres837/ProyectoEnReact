import axios from 'axios';
import { useEffect, useState } from 'react';

const FormQueryPlayer = ({ URI, getPlayer, deletePlayer, buttonForm }) => {
    const [playerQuery, setPlayerQuery] = useState([])
    const [documento, setDocumento] = useState('')

    const sendFormQuery = async (documento) => {
        if (documento) {
            try {
                const respuesta = await axios.get(URI + 'documento/'+  documento)
                setPlayerQuery(
                    respuesta.data
                )
            } catch (error) {
                console.error('Error al obtener el jugador:', error);
            }
        } else {
            setPlayerQuery([]);
        }
    }

    useEffect(() => {
        setPlayerQuery([])
        setDocumento('')
    }, [buttonForm])

    return (
        <>
           <div className='Color-consulta'>
          
           
            <form action="" id="queryForm">
            <h1>Consulta de un Jugador</h1>
                <label className='color' htmlFor="documentoQuery">Documento</label>
                <input className='color-input'  type="number" id="documentoQuery" value={documento} onChange={(e) => { sendFormQuery(e.target.value); setDocumento(e.target.value)
                  }}  placeholder="documento"
                />
            </form>
              
           </div>
           
            
        <br>
        </br>
            
            {/***uso del operador terniario */
            playerQuery.length > 0 ? 
                <table className='posicion-tabla-consulta' >
                    <thead  >
                        <tr>
                            <th >Documento</th>
                            <th >Nombres</th>
                            <th >Apellidos</th>
                            <th >Género</th>
                            <th > Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerQuery.map((player) => (
                            <tr key={player.id}>
                                <td>{player.documento}</td>
                                <td>{player.nombres}</td>
                                <td>{player.apellidos}</td>
                                <td>{player.genero}</td>
                                <td>
                                    <button className='color-boton' onClick={() => getPlayer(player.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>
                                    <button className='color-rojo' onClick={() => deletePlayer(player.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>: ''
}

        
        </>
       
    );
};

export default FormQueryPlayer;