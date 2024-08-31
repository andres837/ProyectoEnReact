import axios from "axios";
import { useState, useEffect } from "react";
//import { Link } from 'react-router-dom';


 const URI = 'http://localhost:8000/players/'



const CrudPlayers = () => {
    const [playerList, setPlayerList] = useState([])

    useEffect(() => {
        getAllPlayers()
    }, [])

    const getAllPlayers = async () => {
        try {
            const respuesta = await axios.get(URI);
            setPlayerList(respuesta.data);
            console.log(respuesta.data);
        } catch (error) {
            console.error('Error al obtener la lista de jugadores:', error);
            // Aquí puedes manejar el error de acuerdo a tus necesidades, como mostrar un mensaje al usuario.
        }
    }
    
    
    

    return (
        <>
       
       <table>
        <thead>
            <tr>
                <th>Documento</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Genero</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        {playerList.map((player) => (
            <tr key={player.id}>
                <td>{player.documento}</td>
                <td>{player.nombres}</td>
                <td>{player.apellidos}</td>
                <td>{player.genero}</td>
                <td>
                    <button>Editar</button>
                    <button>Borrar</button></td>
                

            </tr>
        
    ))}
        

        </tbody>
       </table>
        </>
    )
}
export default CrudPlayers