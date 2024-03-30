import React, { useState, useEffect } from 'react';
import './style.css';
import HeaderPagesAluno from '../../components/headers/alunoPagesIndex'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { server } from "../../services/server";

function ExitAluno() {
    const [box, setBox] = useState('');
    const [nomeAluno, setNomeAluno] = useState('');
    const [matriculaAluno, setMatriculaAluno] = useState('');
    const [family, setFamily] = useState('0');
    const [periodo, setPeriodo] = useState('')
    const [showPop, setShowPop] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const navigate = useNavigate();
    const [addButtonStyle, changeAddButtonStyle] = useState('button-6-disable');
    const [addButtonState, changeAddButtonState] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(' ');
    const newMovement = { family: family };
    const finalDataMoviment = {};
    var infoUsers = {}
    const [familiasMov, setFamiliasMov] = useState([])
    const [familias, setFamilias] = useState([])

    useEffect(() => {
        getFamilias();
        infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
        console.log(infoUsers)
        setNomeAluno(infoUsers.NomeUser.split(' ')[0])
        setMatriculaAluno(infoUsers.matricula)
    }, []);

    function navigateToHomeAluno() {
        if (showPop) {
            setShowPop(false);
            navigate('/home-aluno')
            setTableData([]);
        } else {
            navigate('/home-aluno')
            setTableData([]);
        }
    }

    function navigateToConfirmExit() {
        if (box.trim() === '' || /^0+$/.test(box) || (box.length > 0 && box[0] === '0') || (tableData.length === 0)) {
            setErrorMessage('Todos os campos devem ser preenchidos.');
        } else if (periodo == '') {
            setErrorMessage('Todos os campos devem ser preenchidos.');
        } else {
            setErrorMessage(' ');
            setShowConfirmExit(true);
            formatMovimentData()
            console.log(finalDataMoviment);
            sendPedidoRequest()
        }
    }

    const sendPedidoRequest = async () => {
        var token = localStorage.getItem("loggedUserToken");
        try {
            const response = await server.post("/pedido", finalDataMoviment, {
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }

    function detectEntryFamily(e) {
        const selectedFamily = e.target.value
        setFamily(selectedFamily)
        changeAddButtonStyle('button-6')
        changeAddButtonState(false)
    }

    function tableReportContent() {
        return tableData.map((item, index) => (
            <tbody key={index}>
                <tr>
                    <td><p className='body-normal'>{item.family}</p><p className='body-normal'>{item.quantity}</p></td>
                </tr>
            </tbody>
        ));
    };

    function addMovement() {
        const existingIndex = tableData.findIndex((item) => item.family === family);
        if (existingIndex !== -1) {
            const updatedTableData = [...tableData];
            setTableData(updatedTableData);
        } else {
            setTableData((prevData) => [...prevData, newMovement]);
            setFamiliasMov((prevData) => [...prevData, newMovement.family]);
        }
        stagesReturn()
    };

    function stagesReturn() {
        setFamily('0');
        changeAddButtonStyle('button-6-disable');
        changeAddButtonState(true);
    }

    function requestConfirmed() {
        navigate('/home-aluno')
        setShowConfirmExit(false)
        stagesReturn();
    }

    function formatMovimentData() {
        finalDataMoviment.matricula = Number(matriculaAluno);
        finalDataMoviment.nomeAluno = nomeAluno;
        finalDataMoviment.periodoAluno = Number(periodo);
        finalDataMoviment.box = Number(box);
        finalDataMoviment.tipo = 'Saída';
        finalDataMoviment.status = 'Pendente';
        finalDataMoviment.colaborador = '';
        finalDataMoviment.assinatura = false;
        finalDataMoviment.familias = String(familiasMov)
        finalDataMoviment.quantidadeItens = ''
    }

    async function getFamilias() {
        var token = localStorage.getItem("loggedUserToken")
        try {
            const response = await server.get('/familia', {
                method: 'GET',
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json"
                }
            })
            setFamilias(response.data)
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <HeaderPagesAluno />
            <Container className='containerMobileExit'>
                <div className="inputFormsExit">
                    <h1 className='title-1 margin-bottom-30'>Registrar pedido de saída</h1>
                    <input placeholder='Box de armazenamento' className='form-4' value={box} onChange={(e) => setBox(e.target.value)} type='number' />
                    <select className='form-4' value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                        <option value='' disabled>Selecionar um periodo</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                    <select className='form-4' value={family} onChange={detectEntryFamily} >
                        <option disabled={true} value='0'>Selecione a família</option>
                        {familias.map((option, index) => (
                            <option key={index} value={option.nome}>
                                {option.nome}
                            </option>
                        ))}
                    </select>
                    <button className={addButtonStyle} onClick={addMovement} disabled={addButtonState} >
                        Adicionar
                    </button>
                    <div className="tableReport">
                        <table>
                            {tableReportContent()}
                        </table>
                    </div>
                </div>
                {errorMessage && <p className="error-message-mobile">{errorMessage}</p>}
                <div className='sendButtonsEntry'>
                    <button className='button-2' disabled={false} onClick={() => setShowPop(true)} >
                        Cancelar
                    </button>
                    <button className='button-3' disabled={false} onClick={navigateToConfirmExit} > Confimar
                    </button>
                </div>
            </Container>
            {showPop && (
                <div className="popUpCancelOperation">
                    <div className="popUpCancelCard">
                        <p className='heading-3 text-align-center margin-bottom-10'>Tem certeza que<br />deseja voltar?</p>
                        <p className='body-light text-align-center margin-bottom-20'>Se continuar as alterações serão perdidas.</p>
                        <div className='popUpCancelButtons'>
                            <button className='button-2' disabled={false} onClick={() => setShowPop(false)}>
                                Voltar
                            </button>
                            <button className='button-3' disabled={false} onClick={navigateToHomeAluno}>
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showConfirmExit && (
                <div className='popUpConfirmOperation'>
                    <div className="popUpConfirmCard">
                        <h1 className='body-large text-align-center margin-bottom-10'>Seu pedido de <strong>saída</strong> foi enviado com sucesso !</h1>
                        <h2 className='body-light text-align-center margin-bottom-20'>Assim que um colaborador avaliar o seu pedido, assine.</h2>
                        <button className='button-4' onClick={requestConfirmed}>Voltar a tela inicial</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ExitAluno