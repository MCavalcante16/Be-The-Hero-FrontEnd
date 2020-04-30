import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('/incidents').then(response => {
            setIncidents(response.data);
        })
    },[]);

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Entre em contato com a ONG responsável do caso e Salve o Dia! </span>

                <Link className="button" to="/register">Cadastrar novo caso</Link>
            
            </header>
        
            <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar
            </Link>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>

                        <strong>ONG Responsável: </strong>
                        <p>{incident.name}</p>

                        <strong>DESCRIÇÃO: </strong>
                        <p>{incident.description}</p>
                    
                        <strong>VALOR: </strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <strong>WHATSAPP: </strong>
                <       p>{'(' + incident.whatsapp[0] + incident.whatsapp[1] + ') ' + incident.whatsapp.slice(2) }</p>    

                        <strong>EMAIL: </strong>
                        <p>{incident.email}</p>                   
                    </li> 
                ))}
            </ul>
        </div>
    );
}