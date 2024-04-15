import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './style.css'
import leaveIcon from '../../assets/leaveIconColab.svg'
import menuIcon from '../../assets/menuIconColab.svg'
import entryIcon from '../../assets/addBlackIcon.svg'
import exitIcon from '../../assets/minusBlack.svg'
import historyIcon from '../../assets/historyIconAdmin.svg'
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../hooks/index';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import configOptionsIcon from '../../assets/configOptionsIcon.svg'
import eyeOn from '../../assets/eyeOn.svg'
import eyeOff from '../../assets/eyeOff.svg'
import { server } from "../../services/server";

export default function HeaderHomeColab() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(true);
    const [showMenuStyle, setShowMenuStyle] = useState('menuColab');
    const [buttonEntryStyle, setbuttonEntryStyle] = useState('button-16-enable');
    const [buttonExitStyle, setbuttonExitStyle] = useState('button-16-disable');
    const [buttonHistoryStyle, setbuttonHistoryStyle] = useState('button-16-disable');
    const [showMenuUser, setShowMenuUser] = useState(false);
    const { signOut } = UseAuth()
    const [showPopSenha, setShowPopSenha] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const closeModalChangeSenha = () => {
        setDataSenhaChange({ senha: '', senhaConfirm: '' })
        setErrorMessage('')
        setShowPopSenha(false)
        setIsPasswordVisible(false)
        setIsPasswordVisible2(false)
    }

    const openModalChangeSenha = () => {
        setShowPopSenha(true);
    };

    function spaceOutClicked() {
        setShowMenuUser(false)
    }

    //Alterar senha
    const [dataSenhaChange, setDataSenhaChange] = useState({ senha: '', senhaConfirm: '' })
    const handlePutSenha = async () => {
        let infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
        let matriculaID = infoUsers.matricula
        if (dataSenhaChange.senha == '' || dataSenhaChange.senhaConfirm == '') {
            setErrorMessage('Preencha todos os campos antes de adicionar.');
        } else if (dataSenhaChange.senha !== dataSenhaChange.senhaConfirm) {
            setErrorMessage(`A senha deve ser igual nos campos 'Senha' e 'Confirmar senha'.`);
        } else {
            let novaSenhaDados = { matricula: Number(matriculaID), senha: dataSenhaChange.senha }
            var token = localStorage.getItem("loggedUserToken");
            try {
                if (token.length <= 1) {
                    localStorage.removeItem('loggedUserToken');
                    localStorage.removeItem('loggedUserData');
                    localStorage.removeItem('auth1');
                    localStorage.removeItem('auth2');
                    localStorage.removeItem('auth3');
                } else {
                    var userCargo = infoUsers.cargo
                    const response = await server.put(`/usuario/${novaSenhaDados.matricula}`, novaSenhaDados, {
                        headers: {
                            "Authorization": `${token}`,
                            "Content-Type": "application/json",
                            "access-level": `${userCargo}`
                        }
                    });
                    setShowPopSenha(false)
                    setDataSenhaChange({ senha: '', senhaConfirm: '' })
                    setErrorMessage('')
                    console.log(response);
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    //Alterar Visibilidade de senha
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };
    const togglePasswordVisibility2 = () => {
        setIsPasswordVisible2((prev) => !prev);
    };

    function returnLogin() {
        navigate('/entrar')
        signOut()
        console.log('deslogar')
    }

    function handleMenu() {
        if (showMenu == false) {
            setShowMenu(true)
            setShowMenuStyle('menuColab-slide-down')
        } else if (showMenu == true) {
            setShowMenuStyle('menuColab-slide-up')
            setTimeout(() => {
                setShowMenu(false);
            }, 500);
        }
    }

    useEffect(() => {
        const path = location.pathname;
        if (path === '/entry-colaborador') {
            setButtonStyles('button-16-enable', 'button-16-disable', 'button-16-disable');
        } else if (path === '/exit-colaborador') {
            setButtonStyles('button-16-disable', 'button-16-enable', 'button-16-disable');
        } else {
            setButtonStyles('button-16-disable', 'button-16-disable', 'button-16-enable');
        }
    }, [location.pathname]);

    function setButtonStyles(entry, exit, history) {
        setbuttonEntryStyle(entry);
        setbuttonExitStyle(exit);
        setbuttonHistoryStyle(history);
    }

    function buttonEntryClicked() {
        setButtonStyles('button-16-enable', 'button-16-disable', 'button-16-disable');
        navigate('/entry-colaborador');
    }

    function buttonExitClicked() {
        setButtonStyles('button-16-disable', 'button-16-enable', 'button-16-disable');
        navigate('/exit-colaborador');
    }

    function buttonHistoryClicked() {
        setButtonStyles('button-16-disable', 'button-16-disable', 'button-16-enable');
        navigate('/history-colaborador')
    }

    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#518FA7',
            color: theme.palette.common.white,
            boxShadow: theme.shadows[2],
            fontSize: 13,
            fontFamily: 'Inter',
            borderRadius: 5,
            fontWeight: 400,
            letterSpacing: '0.5px'
        },
    }));

    function buttonConfigClicked() {
        if (showMenuUser) {
            setShowMenuUser(false)
        } else {
            setShowMenuUser(true)
        }
    }

    function spaceOutClicked() {
        setShowMenuUser(false)
    }

    return (
        <Container>
            <div className="headerHomeColab">
                <div className='headerHomeColabContainer'>
                    <button className='button-17' onClick={handleMenu}>
                        <img src={menuIcon} />
                    </button>
                    <div className="logoHomeColab"></div>
                </div>
                <LightTooltip title="Opções" placement="bottom" >
                    <button className='button-17' onClick={buttonConfigClicked}><img src={configOptionsIcon} /></button>
                </LightTooltip>
            </div>
            {showMenu && (
                <div className={showMenuStyle}>
                    <LightTooltip title="Entrada" placement="right" >
                        <button className={buttonEntryStyle} onClick={buttonEntryClicked}><img src={entryIcon} /></button>
                    </LightTooltip>
                    <LightTooltip title="Saída" placement="right" >
                        <button className={buttonExitStyle} onClick={buttonExitClicked}><img src={exitIcon} className='exitIcon' /></button>
                    </LightTooltip>
                    <LightTooltip title="Histórico" placement="right" >
                        <button className={buttonHistoryStyle} onClick={buttonHistoryClicked}><img src={historyIcon} /></button>
                    </LightTooltip>
                </div>
            )}
            {showMenuUser && (
                <div className="showMenuContainer" onClick={spaceOutClicked}>
                    <div className="showMenuStyleModal">
                        <ul>
                            <li>Nível 2: Colaborador</li>
                            <li><button onClick={openModalChangeSenha}>Mudar senha</button></li>
                            <li><button onClick={returnLogin}>Sair</button></li>
                        </ul>
                    </div>
                </div>
            )}
            {showPopSenha && (
                <div className="popUpView">
                    <div className="popUpDeleteCard2" style={{ height: "400px" }}>
                        <div className="popUpDelete">
                            <div className="deleteCardTopChange">
                                <p className='heading-4 text-align-left margin-bottom-20'>Alterar senha</p>
                                <p className='body-small text-align-left margin-bottom-20' style={{ paddingTop: "5px" }}>Preencha os campos abaixo para modificar a sua senha.</p>
                                <div className='deleteCardTopChangeSenha'>
                                    <div className='searchForms' style={{ marginBottom: '20px' }}>
                                        <span className='body-normal margin-bottom-5'>Senha nova</span>
                                        <div className='iconPasswordContainer'>
                                            <input style={{ width: "220px" }} maxLength="10" placeholder='Senha' className='form-1' value={dataSenhaChange.senha} onChange={(e) => setDataSenhaChange({ ...dataSenhaChange, senha: e.target.value })} type={isPasswordVisible ? 'text' : 'password'} />
                                            <img src={isPasswordVisible ? eyeOn : eyeOff} className="eyePasswordChange" onClick={togglePasswordVisibility} />
                                        </div>
                                    </div>
                                    <div className='searchForms'>
                                        <span className='body-normal margin-bottom-5'>Confirmar senha nova</span>
                                        <div className='iconPasswordContainer'>
                                            <input style={{ width: "220px" }} maxLength="10" placeholder='Senha' className='form-1' value={dataSenhaChange.senhaConfirm} onChange={(e) => setDataSenhaChange({ ...dataSenhaChange, senhaConfirm: e.target.value })} type={isPasswordVisible2 ? 'text' : 'password'} />
                                            <img src={isPasswordVisible2 ? eyeOn : eyeOff} className="eyePasswordChange" onClick={togglePasswordVisibility2} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div className='errorContainer' style={{ position: 'relative', zIndex: 1 }}>
                            {errorMessage && (
                                <p className="error-message-colab" style={{ position: 'absolute', top: 0, left: 0 }}>
                                    {errorMessage}
                                </p>
                            )}
                            <div className='popUpViewButtons' style={{ justifyContent: 'center' }}>
                                <button className='button-8' disabled={false} onClick={closeModalChangeSenha}>
                                    Cancelar
                                </button>
                                <button className='button-9' style={{ margin: '0 20px 0 30px' }} disabled={false} variant='outlined' onClick={handlePutSenha}>
                                    Continuar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </Container>
    );
}