import { useState } from "react";
import axios from "axios";

const URI_AUTH = 'http://localhost:8000/auth/';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Recibir el token que viene desde la URL, está guardado en la variable "llave"
  const tokenForPassword = new URLSearchParams(location.search).get(`llave`);

  const updatePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URI_AUTH}reset-password`, { tokenForPassword, newPassword });
      setMessage(response.data.message);
      setNewPassword('');
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un estatus diferente de 2xx
        setMessage(error.response.data.message || 'Error desconocido');
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        setMessage('No se recibió respuesta del servidor');
      } else {
        // Algo sucedió al configurar la solicitud
        setMessage('Error al configurar la solicitud');
      }
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={updatePassword}>
        <label>Nueva contraseña:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Restablecer Contraseña</button>
        {message && <p className="bg-info">{message}, por favor vuelve al inicio de sesión.</p>}
      </form>
    </>
  );
};

export default ResetPassword;
