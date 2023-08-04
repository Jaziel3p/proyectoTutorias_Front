import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [noDeControl, setNoDeControl] = useState('');
  const [nip, setNip] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'noDeControl') {
      setNoDeControl(value);
    } else if (name === 'nip') {
      setNip(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const alumnoData = {
      no_de_control: noDeControl,
      nip: nip
    };

    axios.post('http://127.0.0.1:8001/api/login/', alumnoData)
      .then(response => {
        // Manejar la respuesta exitosa del backend
        console.log("Se ha registrado correctamente!!");
        console.log(response.status);
        console.log(response.data);

        // Guardar los tokens en el local storage
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
      })
      .catch(error => {
        // Manejar el error de la solicitud o la respuesta del backend
        console.error(error);
      });
  };

  const logout = (event) => {
    event.preventDefault();
    
    // Obtener el token de actualización del local storage
    const refresh_token = localStorage.getItem('refresh_token');

    // Enviar el token de actualización al backend para hacer logout
    axios.post('http://127.0.0.1:8001/api/logout/', { refresh_token })
      .then(response => {
        // Manejar la respuesta exitosa del backend
        console.log("Se ha cerrado sesión!!");
        console.log(response.data)
        
        // Eliminar los tokens del local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      })
      .catch(error => {
        // Manejar el error de la solicitud o la respuesta del backend
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Inicia sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>No. de Control:</label>
          <input
            type="text"
            name="noDeControl"
            value={noDeControl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>NIP:</label>
          <input
            type="password"
            name="nip"
            value={nip}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <form onSubmit={logout}>
        <div>
          <button type="submit">Logout</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
