import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/navegacion/Navbar';
import Asignartutor from './components/paginas/Asignartutor';
import Asignartutorados from './components/paginas/Asignartutorados';
import PopupHooks from './components/paginas/PopupHook';
import GetPrueba2 from './components/paginas/getComponent';

function App() {
  const [response, setTutores] = useState([]);
 // setTutores([1,2,3,4])

return(
 <div className='App'>
  <Router>
    <Navbar/>
    <Asignartutor/>
    
    <GetPrueba2/>
  </Router>
  </div>
  )

}

export default App;