import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"; // Importa useLocation
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import '../centros/formEstilo.css';




const URI_DEPTOS = 'http://localhost:8000/deptos/';
const URI_MCIPIOS_POR_DEPTO = 'http://localhost:8000/mcipios/depto/';
const URI_CENTERS = 'http://localhost:8000/centers/';

const FormCenters = () => {
    const { id } = useParams(); // Obtén el ID del centro de la URL
    const location = useLocation(); // Obtén la ubicación actual
    const navigate = useNavigate(); // Instancia de useNavigate
    const [codigoCentro, setCodigoCentro] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [nombreCentro, setNombreCentro] = useState('');
    const [datosDepartamentos, setDatosDepartamentos] = useState([]);
    const [municipiosPorDepto, setMunicipiosPorDepto] = useState([]);
    const { center, buttonForm, updateTextButton } = location.state || {}; // Desestructuración de props

    const getDeptos = async () => {
        try {
            const response = await axios.get(URI_DEPTOS);
            setDatosDepartamentos(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const getCenterById = async (idCenter) => {
        try {
            const response = await axios.get(`${URI_CENTERS}${idCenter}`);
            const centerData = response.data;
            setCodigoCentro(centerData.codigo_centro || '');
            setDepartamento(centerData.idDepto || '');
            setMunicipio(centerData.id_municipio || '');
            setNombreCentro(centerData.nombre_centro || '');
            searchMunicipio(centerData.idDepto); // Cargar municipios al cambiar de departamento
        } catch (error) {
            console.error("Error fetching center:", error);
        }
    };

    useEffect(() => {
        getDeptos();
        if (id) {
            getCenterById(id); // Cargar datos del centro al cargar el componente
        }

        // Si se pasan datos desde el Link, establece los valores del formulario
        if (location.state && location.state.center) {
            const center = location.state.center;
            setCodigoCentro(center.codigo_centro);
            setDepartamento(center.idDepto);
            setMunicipio(center.id_municipio);
            setNombreCentro(center.nombre_centro);
        }
    }, [id, location.state]);

    const searchMunicipio = async (id) => {
        if (id) {
            const response = await axios.get(`${URI_MCIPIOS_POR_DEPTO}${id}`);
            setMunicipiosPorDepto(response.data);
        } else {
            setMunicipiosPorDepto([]);
        }
    };

    const sendForm = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`${URI_CENTERS}${id}`, {
                    codigo_centro: codigoCentro,
                    idDepto: departamento,
                    id_municipio: municipio,
                    nombre_centro: nombreCentro
                });
            } else {
                await axios.post(URI_CENTERS, {
                    codigo_centro: codigoCentro,
                    idDepto: departamento,
                    id_municipio: municipio,
                    nombre_centro: nombreCentro
                });
            }
            clearForm();
           // Verifica que updateTextButton sea una función antes de llamarla
           if (typeof updateTextButton === 'function') {
            updateTextButton('Enviar'); // Actualiza el texto del botón
        } 
             navigate('/centers'); // Redirigir a /centers después de la actualización
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const clearForm = () => {
        setCodigoCentro('');
        setDepartamento('');
        setMunicipio('');
        setNombreCentro('');
    };

    return (

        <div className="container-estilo">
        {/* //     <div className="formulario"> */}
            <div className="card text-center">
        <form id="formCenter" onSubmit={sendForm}>
            <label  htmlFor="codigoCentro">Código</label>
            <input type="number" value={codigoCentro} onChange={(e) => setCodigoCentro(e.target.value)} id="codigoCentro"    className="form-control"  />
            <br />
            <label    htmlFor="departamento">Departamento</label>
            <select value={departamento} onChange={(e) => { setDepartamento(e.target.value); searchMunicipio(e.target.value); }} id="departamento"  className="form-control"  >
                <option value="">Seleccione uno..</option>
                {datosDepartamentos.map(depto => (
                    <option key={depto.idDepartamento} value={depto.idDepartamento}>{depto.DepNombre}</option>
                ))}
            </select>
            <br />
            <label    htmlFor="municipio">Municipios</label>
            <select value={municipio} onChange={(e) => setMunicipio(e.target.value)} id="municipio"  className="form-control"  >
                <option value="">Seleccione uno...</option>
                {municipiosPorDepto.map(mcipio => (
                    <option key={mcipio.id} value={mcipio.id}>{mcipio.mcipioNombre}</option>
                ))}
            </select>
            <br />
            <label    htmlFor="nombreCentro">Nombre Centro</label>
            <input type="text" value={nombreCentro} onChange={(e) => setNombreCentro(e.target.value)} id="nombreCentro"  className="form-control"  />
            <br />
            <input type="submit" id="boton" value={id ? 'Actualizar' : 'Enviar'} className="btn btn-success" />
           
            <br>
            </br>
            <Link className="sin-subrayado" to="/centers">Volver </Link>
        </form>
     </div>
         </div> 
        // </div>
    );
};

export default FormCenters;
