import React from 'react'
import { Container } from 'react-bootstrap';
import './style.css'
import leaveIcon from '../../assets/leaveIcon.svg'
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../hooks/index';

export default function HeaderHomeAluno() {
    const navigate = useNavigate();
    const {signOut} = UseAuth()
    
    function returnLogin(){
        navigate('/entrar')
        signOut()
    }
	return (
		<Container>
            <div className="headerHomeAluno">
                <button className='button-15' onClick={returnLogin}><img src={leaveIcon}/></button>
            </div>
        </Container>
	);
}