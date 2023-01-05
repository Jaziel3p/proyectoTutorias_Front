import React, { Component } from "react";
import logo from "./logo.svg";
import './App.css';
import { Component, useEffect, useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { render } from '@testing-library/react';

function App() {


  const [tutores,setTutores] =useState([]);
  const [tablatutores,setTablaTutores] =useState([]);
  const [busqueda, setBusqueda]= useState([]);

  const peticionGet = async()=>{
   await axios.get("http://127.0.0.1:8000/api/Personal/")
    .then(response =>{
      setTutores(response.data);
      setTablaTutores(response.data);
    }).catch(error =>{
      console.log(error);
    })
  }

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablatutores.filter((elemento)=>{
      if(elemento.clave_area.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.rfc.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setTutores(resultadosBusqueda);
  }

  useEffect(()=>{
  peticionGet();
  },[])

  return (   
    <div className="App">
    <div className="containerInput">
      <input
        className="form-control inputBuscar"
        value={busqueda}
        placeholder="Busqueda por Area Academica o RFC"
        onChange={handleChange}
      />
      <button button className= "btn btn-success">
        <FontAwesomeIcon icon ={faSearch}/>
      </button>
    </div>
    <div className='table.responsive'>
      <table className='table table-sm table-bordered'>
      <thead>
        <tr>
          <th>RFC</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Area Academica</th>
          <th>Status</th>
          <th>Seleccionar Tutor</th>
        </tr>
      </thead>

      <tbody>
        {tutores &&
        tutores.map((tutor)=>(
          <tr key={tutor.rfc}>
            <td>{tutor.rfc}</td>
            <td>{tutor.nombre_empleado}</td>
            <td>{tutor.apellidos_empleado}</td>
            <td>{tutor.clave_area}</td>
            <td>{tutor.status_empleado}</td>
            <td>
            <button button className= "btn btn-success">
              Seleccionar Tutor
            </button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
    </div>  
  );
}

export default App;




/*
class App extends Component {
  state={
     Carreras:[]
  }
  componentDidMount(){
    axios 
      .get("http://127.0.0.1:8000/api/Carreras/")
      .then((response) => {
        console.log(response);
        this.setState({Carreras: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }
 
  render() {
    return (
      <div className="App">
        <div className="form-group">
          <select name="Carreras" className="form-control">
            {this.state.Carreras.map(elemento=>(
              <option key={elemento.carrera} value={elemento.carrera}>{elemento.nombre_carrera}</option>
            )

            )}
         </select>
        </div>
      </div>
    );
  }
}
/*


