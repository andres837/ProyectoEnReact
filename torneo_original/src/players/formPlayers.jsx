import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const FormPlayers = ({ buttonForm, player, URI, updateTextButton }) => {
  const [documento, setDocumento] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [genero, setGenero] = useState("");
  const [foto, setFoto] = useState(null)
  const inputFoto = useRef(null)

  //Evento que permite validar el campo documento
  const handleChange = (e) => { //evento para  controlar la logitud de valores en el input en el documento  asignar el nombre al evento al input para que funcione
    const inputValue = e.target.value;
    if (inputValue.length > 15) {
      Swal.fire({
        title: "Error",
        text: "El número de documento no puede tener más de 15 caracteres.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      
      
    } else {
      setDocumento(inputValue);
    }
  };
  const handleChangeNombre = (e) => {//evento para  controlar la logitud de valores en el input en el nombre  asignar el nombre al evento al input  para que funcione 
    const inputValue = e.target.value;
    if (inputValue.length > 12) {
      Swal.fire({
        title: 'Error',
        text: 'El nombre no puede tener más de 12 caracteres',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
    } else {
       
        setNombres(inputValue);
    }
};
const handleChangeApellido = (e) => { //evento para  controlar la logitud de valores en el input en el apellido  asignar el nombre al evento al input  para que funcione
  const inputValue = e.target.value;
  if (inputValue.length > 20) {
    Swal.fire({
      title: "Error",
      text: "El apellido no puede tener más de 12 caracteres.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    setApellidos(inputValue);
  }
};
  
const validateForm = () => { // La función validateForm se utiliza para centralizar toda la validación del formulario antes de enviarlo.
  if (documento.length === 0 || documento.length > 15) {
    Swal.fire({
      title: "Error",
      text: "Por favor, ingrese un número de documento válido.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return false;
  }
  if (nombres.trim() === "" || nombres.length > 20) {
    Swal.fire({
      title: "Error",
      text: "Por favor, ingrese un nombre válido.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return false;
  }
  if (apellidos.trim() === "" || apellidos.length > 20) {
    Swal.fire({
      title: "Error",
      text: "Por favor, ingrese un apellido válido.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return false;
  }
  if (genero.trim() === "") {
    Swal.fire({
      title: "Error",
      text: "Por favor, seleccione un género.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return false;
  }
  return true;
};

  // Función que recibe los datos del formulario
  const sendForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // retorna cuando le damos en enviar una alerta haciendo que los campos sean obligatorios 

    const formData = {
      documento,
      nombres,
      apellidos,
      genero,
      foto,
    };

    

    if (buttonForm === "Actualizar") { 
      console.log("actualizando datos..");
      try {
        await axios.put(URI + player.id, {
          documento: documento,
          nombres: nombres,
          apellidos: apellidos,
          genero: genero,
          foto: foto
        }, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        Swal.fire({ // si vamos actualizar ponemos una alerta que diga  "El formulario fue actualizado.",
          title: "¡Éxito!",
          html: "<i>El usuario <strong>"+ nombres+" "+ apellidos + "</strong> fue actualizado..</i>",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        updateTextButton("Enviar"); // Cambiar el texto del botón
        clearForm(); // Limpiar los campos del formulario
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al actualizar los datos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } else if (buttonForm === "Enviar") {// si vamos a registrar ponemos una alerta que diga "Los datos de formulario se registraron correctamente.",
     // mensaje por pantalla 
      console.log("guardando datos..." + foto);
      try {
        await axios.post(URI, {
          documento: documento,
          nombres: nombres,
          apellidos: apellidos,
          genero: genero,
          foto: foto
        }, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        Swal.fire({
          title: " <strong> Exitoso  </strong",
          html: "<i>El usuario <strong>"+ nombres+" "+ apellidos + "</strong> fue registrado..</i>",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        clearForm(); // Limpiar los campos del formulario
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al guardar los datos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const clearForm = () => {
    // Se vacía el elemento player
    setDocumento("");
    setNombres("");
    setApellidos("");
    setGenero("");
    setFoto(null);
    inputFoto.current.value = '' //  restablecer el valor del input
  };

  const setData = () => {
    // Función que establece los valores en los campos cuando se presiona el botón de editar
    setDocumento(player.documento);
    setNombres(player.nombres);
    setApellidos(player.apellidos);
    setGenero(player.genero);
    setFoto(player.foto);
  };

  useEffect(() => {
    setData();
  }, [player]);

  return (
    <>
      <br />
    
       
<div className="container">
       
         <div className="color-formulario">
        <div className="card text-center">
          <div className="titulo-usuario">
          <div className="card-header" >
          Registro de  Usuarios
          </div>
          </div>
          </div>
        
          
          <form  id="playerForm" onSubmit={sendForm}>
            
          <div className="form-row">
          <div className="form-group">
           
          <label  className="Documento-posicion" htmlFor="documento">Documento</label>
          
          <input
            type="text"
            id="documento"
            value={documento}
            onChange={handleChange}
            className="form-control"
            placeholder="documento"
          />
         
          
          </div>
          
          
         
          <div className="form-group">

          <label  htmlFor="nombres">Nombres</label>
          <input
            type="text"
            id="nombres"
            value={nombres}
            onChange={handleChangeNombre}
            className="form-control"
            placeholder="nombre"
          />
          <br>
          </br>
         
          </div>
          
          <div className="form-group">
          <label  htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            value={apellidos}
            onChange={handleChangeApellido}
            className="form-control"
            placeholder="apellidos"
          />
          
          </div>
          
          <div className="form-group">

          <label htmlFor="genero">Genero</label>
          <select    className="form-control"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          
          >
            <option value="">seleccione uno</option>
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
            <option value="O">Otro</option>
          </select>
          <br />
         
          </div>
          <div className="form-group">
          <label className="posicion-foto" htmlFor="foto"></label>
          
          <input type="file" id="foto" onChange={(e) => setFoto(e.target.files[0])} ref={inputFoto}></input>
          {/* <div className="card-header" > */}
          <br>
          </br>
          </div>
          <br>
          </br>

          <br>
          </br>
          <div className="center-button">
            <input
              type="submit"
              id="boton"
              value={buttonForm}
              className="btn btn-success"
            />
            </div>
           </div>
            
            
          {/* </div> */}
        </form>
        </div>
       
        

          </div>
          {/* <div className="card-footer text-muted">
          dss
          </div>    */}
            
          
           

      
    
    </>
  );
};

export default FormPlayers;
