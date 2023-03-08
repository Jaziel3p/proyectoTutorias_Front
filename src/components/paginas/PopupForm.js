import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios"

export default class FormDialog extends Component {
  state = {
    open: false,
    rfc: "",
    periodo: "",
    carrera: "",
    aceptado: false,
  };
  nombreRef = React.createRef();

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  cancelar = () => {
    this.setState({
      open: false,
      aceptado: false,
    });
  };
  aceptar = () => {

    this.setState({
      open: false,
      aceptado: true,
      
    });
    
          Axios.post('http://127.0.0.1:8000/api/tutores/', 
          {
            rfc: this.state.rfc,
            periodo: this.state.periodo,
            carrera: this.state.carrera
          })
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            })
  }
  setrfc = (event) => {
    this.setState({ rfc: event.target.value });
  };
  setperiodo = (event) => {
    this.setState({ periodo: event.target.value });
  };
  setcarrera = (event) => {
    this.setState({ carrera: event.target.value });
  };

  render() {
    return (
      <div>
        
        <Button variant="outlined" color="primary" onClick={this.handleOpen} style={{ marginRight: '1rem' }}>
          Abrir Form
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.cancelar}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Formulario para enviar datos API local</DialogTitle>
          <DialogContent>
            
            <TextField
              autoFocus
              margin="dense"
              id="rfc"
              onChange={this.setrfc}
              label="rfc"
              type="text"
              fullWidth
            />
            <TextField
              
              margin="dense"
              id="periodo"
              onChange={this.setperiodo}
              label="periodo"
              type="text"
              fullWidth
            />
            <TextField
             
              margin="dense"
              id="carrera"
              onChange={this.setcarrera}
              label="carrera"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelar} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.aceptar} color="primary">
              Enviar API local
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}