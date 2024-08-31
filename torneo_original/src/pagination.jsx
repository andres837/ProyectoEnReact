import axios from 'axios'
import { useEffect, useState } from 'react'

const Pagination = ({ URI, setDesde, setHasta }) => { // Recibir variables desde el componente padre

    const [numRegistros, setNumRegistros] = useState(0) // prop para establcer el numero de registros que tiene la tabla
    const [registrosPorPagina, setRegistrosPorPagina] = useState(5) // numero de registros a mostrar porpagina 
    const [paginaActual, setPaginaActual] = useState(1) // prop para saber la pagina actual, la cual inicia siempre en 1
    const [paginas ,setPaginas] = useState(0)  
    const [ocultarMostrarAnterior, setOcultarMostrarPaginaAnterior] = useState('') // prop para mostrar y ocultar 
    const [ocultarMostrarSiguiente, setOcultarMostrarPaginaSiguiente] = useState('')
    const [botones, setbotones] = useState([])
    

    const  getAllPlayers  = async() => {

       const respuesta = await axios.get(URI) // usar la URI QUE Llega del componente
       let cantidadRegistros = respuesta.data.length
       setNumRegistros(cantidadRegistros) // obtener la cantidad de registros de la tabla 

       // calcular la cantidad de paginas (botones)
       let pages = Math.ceil(cantidadRegistros / registrosPorPagina) 
       setPaginas(pages)
    }
    
 

    
}