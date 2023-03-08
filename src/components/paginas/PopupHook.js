import React, { useState, useEffect, Component, useRef } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios"
import GetPrueba2 from './getComponent';


function PopupHooks()

{
    const [open, setOpen] = useState(false);
    const [aceptado, setAceptado] = useState(false);
    const [rfc, setRfc] = useState("");
    const [periodo, setPeridod] = useState("");
    const [carrera, setCarrera] = useState("");
    const [value, setValue] = useState(false);
    const [tutores, setTutores] = useState([]);


    const handleChildClick = (newValue) => {
        setValue(newValue);
      }
    

    const handleOpen = () => {setOpen(true);}, 
    cancelar = () => {setAceptado(false); setOpen(false)},
    aceptar = () => {setAceptado(true); setOpen(false);},
    reset = () => {setAceptado(false);setCarrera("");setCarrera("");setCarrera(""); } 

    const handleRfcChange = (event) => {
        setRfc(event.target.value);
      },
    
       handlePeriodoChange = (event) => {
        setPeridod(event.target.value);
      },
    
       handleCarreraChange = (event) => {
        setCarrera(event.target.value);
      };

      const prevData ={
          
        rfc: rfc,
        periodo: periodo,
        carrera: carrera
      }

      const AxiosCon = () =>
      {
        Axios.post('http://127.0.0.1:8000/api/tutores/', prevData)
        
          .then(response => {
            setTutores(prevTutores => [...prevTutores, response.data]);
            console.log("SetTutores!!",response);
          //  fullTuts = response
          })
          .catch(error => {
            console.log(error);
          })
      }
    useEffect(() =>
    {
       if (aceptado && rfc!=="" && periodo!=="" && carrera!=="") 
       {
        AxiosCon()
          }  
          
          reset()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aceptado])

    return(
        <div>
        
        <Button variant="outlined" color="primary" onClick={handleOpen} style={{ marginRight: '1rem' }}>
          Abrir Form
        </Button>
        <Dialog
          open={open}
          onClose={cancelar}
          aria-labelledby="form-dialog-title"
          
        >
          <DialogTitle id="form-dialog-title">Formulario para enviar datos API local</DialogTitle>
          <DialogContent>
            
            <TextField
              autoFocus
              margin="dense"
              id="rfc"
              onChange={handleRfcChange}
              label="rfc"
              type="text"
              fullWidth
            />
            <TextField
              
              margin="dense"
              id="periodo"
              onChange={handlePeriodoChange}
              label="periodo"
              type="text"
              fullWidth
            />
            <TextField
             
              margin="dense"
              id="carrera"
              onChange={handleCarreraChange}
              label="carrera"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelar} color="primary">
              Cancelar
            </Button>
            <Button id='BtnChg' onClick={aceptar} color="primary">
              Enviar API local
            </Button>
         
          </DialogActions>
          
        </Dialog>
      </div>

      
    )
}
export default PopupHooks

