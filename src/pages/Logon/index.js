import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('/sessions', { id });

            localStorage.setItem('ongName', response.data.name);
            localStorage.setItem('ongId', id);

            history.push('/profile');
        } catch(err){
            alert('ID inválido. Tente novamente.');
        }
    }

    async function beHero(e){
        e.preventDefault();

        history.push('/incidents');
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
            
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar como ONG</button>
                
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>

                    <button className="buttonHero" onClick={beHero}>Quero ser um Herói</button>
                </form>
            
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}