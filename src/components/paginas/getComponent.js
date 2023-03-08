import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PopupHooks from './PopupHook';


function GetPrueba2() {
   const [tutores, setTutores] = useState([]);
    
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/tutores/")
            .then(res => {
                const data = res.data;
                setTutores(data.tutor);
                console.log(data);
            })
    }, [tutores]);
            

    return (
        <>
             <div>
                <table>
                    <thead>
                        <tr>
                        <th>RFC</th>
                        <th>PERIODO</th>
                        <th>CARRERA</th>
                        </tr>
                    </thead>

                    <tbody>
                    {tutores &&
                    tutores.sort((a, b) => a.carrera.localeCompare(b.carrera)).map((tutor) => (
                        <tr key={tutor.id}>
                            <td>{tutor.rfc}</td>
                            <td>{tutor.periodo}</td>
                            <td>{tutor.carrera}</td>
                        </tr>
                        ))} 
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default GetPrueba2;