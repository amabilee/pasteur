import { Container } from 'react-bootstrap';
import './style.css'
import leaveIcon from '../../assets/leaveIcon.svg'
import { UseAuth } from '../../hooks/index';

export default function HeaderHomeAluno() {
    const { signOut } = UseAuth()

    function returnLogin() {
        signOut()
    }
    return (
        <Container>
            <div className="headerHomeAluno">
                <button className='button-15' onClick={returnLogin}><img src={leaveIcon} /></button>
            </div>
        </Container>
    );
}