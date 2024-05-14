import { useState, useEffect } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../hooks/index';
import eyeOn from '../../assets/eyeOn.svg'
import eyeOff from '../../assets/eyeOff.svg'
import { server } from "../../services/server";


export default function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopSenha, setShowPopSenha] = useState(false);
    const [username_change, setUsernameChange] = useState('');
    const [dataSenhaChange, setDataSenhaChange] = useState({ senha: '', senhaConfirm: '' })

    const { loginAdmin, error, auth1, auth2, auth3 } = UseAuth()

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const togglePasswordVisibility2 = () => {
        setIsPasswordVisible2((prev) => !prev);
    };

    function handleLogin() {
        loginAdmin(username, pwd)
    }

    useEffect(() => {
        setTimeout(() => {
            setShowLogin(true);
        }, 3000);
    }, []);

    useEffect(() => {
        if (auth1) {
          navigate('/home-aluno');
          setErrorMessage('');
        } else if (auth2) {
          navigate('/entry-colaborador');
          setErrorMessage('');
        } else if (auth3) {
          navigate('/staff-admin');
          setErrorMessage('');
        } else {
          setErrorMessage('');
        }
      }, [auth1, auth2, auth3, navigate, setErrorMessage]);

    const handlePutSenha = async () => {
        if (dataSenhaChange.senha == '' || dataSenhaChange.senhaConfirm == '') {
            setErrorMessage('Preencha todos os campos antes de adicionar.');
        } else if (dataSenhaChange.senha !== dataSenhaChange.senhaConfirm) {
            setErrorMessage(`A senha deve ser igual nos campos 'Senha' e 'Confirmar senha'.`);
        } else {
            let novaSenhaDados = { matricula: Number(username_change), senha: dataSenhaChange.senha }
            var token = localStorage.getItem("loggedUserToken");
            try {
                await server.put(`/usuario/modificar/${novaSenhaDados.matricula}`, novaSenhaDados, {
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json",
                    }
                });
                setShowPopSenha(false)
                setUsernameChange('')
                setDataSenhaChange({ senha: '', senhaConfirm: '' })
                setErrorMessage('')
            } catch (e) {
                console.log(e)
            }
        }
    }

    const closeModalChangeSenha = () => {
        setDataSenhaChange({ senha: '', senhaConfirm: '' })
        setUsernameChange('')
        setErrorMessage('')
        setShowPopSenha(false)
        setIsPasswordVisible(false)
        setIsPasswordVisible2(false)
        setUsername('')
        setPwd('')
    }
    return (
        <div className="body">
            <div className={`loadingPage ${showLogin ? 'loadingSectionSmall' : ''}`}>
                <div className={`logo-img ${showLogin ? 'loadingSectionSmall' : ''}`}></div>
                <div className={`loading ${showLogin ? 'loadingSectionSmall' : ''}`}></div>
            </div>
            {showLogin && (
                <div className="loginSection">
                    <div className="loadingSection">
                        <div className="logo-img"></div>
                    </div>
                    <Card>
                        <Card.Body>
                            <div className="cardLogin">
                                <h1 className='heading-3 text-color-1 text-align-center margin-bottom-10'>Login</h1>
                                <span className='body-normal text-color-5 margin-bottom-10'>Usuário</span>
                                <input placeholder='Matrícula' className='form-1' value={username} onChange={(e) => setUsername(e.target.value)} />
                                <span className='body-normal text-color-5 margin-bottom-10 margin-top-20'>Senha</span>
                                <div className='iconPasswordContainer'>
                                    <input style={{ width: "100%" }} placeholder='Senha' className='form-1' value={pwd} onChange={(e) => setPwd(e.target.value)} type={isPasswordVisible ? 'text' : 'password'} />
                                    <img src={isPasswordVisible ? eyeOn : eyeOff} className="eyePassword" onClick={togglePasswordVisibility} />
                                </div>
                                <div className='errorContainer' style={{ position: 'relative', zIndex: 1 }}>
                                    {error && (
                                        <p className="error-message-login" style={{ position: 'absolute', top: 0, left: 0 }}>
                                            {error}
                                        </p>
                                    )}
                                    <button className='button-1' onClick={handleLogin}>Acessar</button>
                                </div>
                                <button className='buttonEsqueceuSenha' onClick={() => setShowPopSenha(true)}>Esqueceu a senha</button>
                            </div>
                        </Card.Body>
                    </Card>
                    <p className="versionText body-normal">Pasteur v.1.0</p>
                    <div className="logo-uni"></div>
                </div>
            )}
            {showPopSenha && (
                <div className="popUpView">
                    <div className="popUpDeleteCard2" style={{ height: "400px" }}>
                        <div className="popUpDelete">
                            <div className="deleteCardTopChange">
                                <p className='heading-4 text-align-left margin-bottom-20'>Alterar senha</p>
                                <p className='body-small text-align-left margin-bottom-20' style={{ paddingTop: "5px" }}>Preencha os campos abaixo para modificar a sua senha.</p>
                                <span className='body-normal margin-bottom-5'>Usuário</span>
                                <input placeholder='Matrícula' style={{ width: "220px", marginBottom: '20px' }} className='form-1' value={username_change} onChange={(e) => setUsernameChange(e.target.value)} />
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
                            <div className='popUpViewButtons'>
                                <button className='button-8' disabled={false} onClick={closeModalChangeSenha}>
                                    Cancelar
                                </button>
                                <button className='button-9' style={{ margin: '0 20px 0 30px' }} disabled={false} onClick={handlePutSenha}>
                                    Continuar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
}
