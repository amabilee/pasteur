import React, { useState, useEffect } from 'react';
import './style.css';
import HeaderPagesAluno from '../../components/headers/alunoPagesIndex'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { server } from "../../services/server";

function EntryAluno() {
    const [box, setBox] = useState('');
    const [periodo, setPeriodo] = useState('')
    const [family, setFamily] = useState('0');
    const [nomeAluno, setNomeAluno] = useState('');
    const [matriculaAluno, setMatriculaAluno] = useState('');
    const [quantity, setQuantity] = useState('0');
    const navigate = useNavigate();
    const [showPop, setShowPop] = useState(false);
    const [showConfirmEntry, setShowConfirmEntry] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [familiasMov, setFamiliasMov] = useState([])
    const [qntMov, setQntMov] = useState([])
    const newMovement = { family: family, quantity: Number(quantity) };
    const [quantSelectBase, changequantSelectBase] = useState(false);
    const [enableQuantSelect, changeStatusQuantSelect] = useState(true);
    const [enableQuantSelectStyle, changeStatusQuantSelectStyle] = useState('disable-form margin-bottom-20');
    const [enableQuantButtons, changeStatusQuantButtons] = useState(true);
    const [addButtonState, changeAddButtonState] = useState(true);
    const [addButtonStyle, changeAddButtonStyle] = useState('button-6-disable');
    const [buttonNegativeQuant, changeStatusQuantButtonNegative] = useState('button-5-disable');
    const [buttonPositiveQuant, changeStatusQuantButtonPositive] = useState('button-5-disable');
    const [errorMessage, setErrorMessage] = useState(' ');
    const finalDataMoviment = {};
    var infoUsers = {}
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
            stagesReturn()
        } else {
            navigate('/home-aluno')
            setTableData([]);
            stagesReturn()
        }
    }

    function navigateToConfirmEntry() {
        if (box.trim() === '' || /^0+$/.test(box) || (box.length > 0 && box[0] === '0') || (tableData.length === 0)) {
            setErrorMessage('Todos os campos devem ser preenchidos corretamente.');
        } else if (periodo == '') {
            setErrorMessage('Todos os campos devem ser preenchidos.');
        } else {
            setErrorMessage(' ');
            formatMovimentData()
            console.log(finalDataMoviment);
            setShowConfirmEntry(true);
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


    function formatMovimentData() {
        finalDataMoviment.matricula = matriculaAluno;
        finalDataMoviment.nomeAluno = nomeAluno;
        finalDataMoviment.periodoAluno = Number(periodo);
        finalDataMoviment.box = Number(box);
        finalDataMoviment.tipo = 'Entrada';
        finalDataMoviment.status = 'Pendente';
        finalDataMoviment.colaborador = '';
        finalDataMoviment.assinatura = false;
        finalDataMoviment.familias = String(familiasMov);
        finalDataMoviment.quantidadeItens = String(qntMov)
    }

    function detectEntryFamily(e) {
        setFamily(e.target.value)
        changeStatusQuantButtons(false)
        changeStatusQuantButtonNegative('button-5')
        changeStatusQuantButtonPositive('button-5')
    }

    function changeSelectorStateNegative() {
        changeStatusQuantSelect(false);
        changeStatusQuantSelectStyle('form-4 margin-bottom-20')
        changeStatusQuantButtonNegative('button-5-enable')
        changeStatusQuantButtonPositive('button-5')
        changeAddButtonStyle('button-6-disable')
        changeAddButtonState(false)
    };

    function changeSelectorStatePositive() {
        changeStatusQuantSelect(true);
        changeStatusQuantSelectStyle('disable-form margin-bottom-20')
        changequantSelectBase(true)
        changeAddButtonStyle('button-6')
        changeAddButtonState(false)
        var quantityBase = familias.find(option => option.nome === family)
        setQuantity(quantityBase.quantidadeMAX)
        changeStatusQuantButtonNegative('button-5')
        changeStatusQuantButtonPositive('button-5-enable')
    };

    function detectEntryQuant(e) {
        const selectedQuant = e.target.value;
        setQuantity(selectedQuant);
        changeAddButtonStyle('button-6')
        changeAddButtonState(false)
    };

    function renderOptionsQuant() {
        const selectedFamilyOption = familias.find(option => option.nome === family);
        if (selectedFamilyOption) {
            return (
                <>
                    {[...Array(Number(selectedFamilyOption.quantidadeMAX) - Number(selectedFamilyOption.quantidadeMIN) + 1).keys()].map(value => (
                        <option key={value + parseInt(selectedFamilyOption.quantidadeMIN)} value={value + parseInt(selectedFamilyOption.quantidadeMIN)}>
                            {value + parseInt(selectedFamilyOption.quantidadeMIN)}
                        </option>
                    ))}
                </>
            );
        } else {
            return (
                <option value="0" disabled>
                    Selecionar
                </option>
            );
        }
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
            if (quantSelectBase) {
                const updatedTableData = [...tableData];
                updatedTableData[existingIndex].quantity = parseInt(quantity, 10);
                setTableData(updatedTableData);
            } else {
                const updatedTableData = [...tableData];
                updatedTableData[existingIndex].quantity = parseInt(quantity, 10);
                setTableData(updatedTableData);
            }
        } else {
            setTableData((prevData) => [...prevData, newMovement]);
            setFamiliasMov((prevData) => [...prevData, newMovement.family]);
            setQntMov((prevData) => [...prevData, newMovement.quantity]);
        }
        setFamily('0');
        setQuantity('0');
        stagesReturn()
        console.log(tableData)
    };

    function stagesReturn() {
        changeStatusQuantSelect(true)
        changeStatusQuantButtons(true)
        changeStatusQuantSelectStyle('disable-form margin-bottom-20')
        changeStatusQuantButtonNegative('button-5-disable');
        changeStatusQuantButtonPositive('button-5-disable');
        changeAddButtonState(true)
        changeAddButtonStyle('button-6-disable')
    }

    async function requestConfirmed() {
        navigate('/home-aluno')
        setShowConfirmEntry(false)
        stagesReturn();
        setTableData([]);
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

    function navigateToConfirmHome() {
        if (box !== '' || periodo !== '' || (tableData.length !== 0)) {
            setShowPop(true)
        } else {
            navigateToHomeAluno()
        }

    }

    function onChangeTagInput(e) {
        setBox(e.target.value.replace(/[^0-9]/g, ""));
    }

    return (
        <>
            <HeaderPagesAluno />
            <Container className='containerMobileEntry'>
                <h1 className='title-1 margin-bottom-30'>Registrar pedido de entrada</h1>
                <input placeholder='Box de armazenamento' className='form-4' value={box} onChange={(e) => onChangeTagInput(e)} type='text' maxLength="3" />
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
                <span className='body-small text-color-5 margin-bottom-10'>Caixa com todos os itens ?</span>
                <div className='selectQuantStateButtons'>
                    <button className={buttonPositiveQuant} disabled={enableQuantButtons} onClick={changeSelectorStatePositive} >
                        Sim
                    </button>
                    <button className={buttonNegativeQuant} disabled={enableQuantButtons} onClick={changeSelectorStateNegative} >
                        Não
                    </button>
                </div>
                <select className={enableQuantSelectStyle} value={quantity} disabled={enableQuantSelect} onChange={detectEntryQuant} >
                    <option disabled={true} value='0'>Selecione a quantidade</option>
                    {renderOptionsQuant()}
                </select>
                <button className={addButtonStyle} onClick={addMovement} disabled={addButtonState} >
                    Adicionar
                </button>
                <div className="tableReport">
                    <table>
                        {tableReportContent()}
                    </table>
                </div>
                {errorMessage && <p className="error-message-mobile">{errorMessage}</p>}
                <div className='sendRequestButtons'>
                    <button className='button-2' disabled={false} onClick={navigateToConfirmHome} >
                        Cancelar
                    </button>
                    <button className='button-3' disabled={false} onClick={navigateToConfirmEntry} >
                        Confimar
                    </button>
                </div>
            </Container>
            {showPop && (
                <div className="popUpCancelOperationEntry">
                    <div className="popUpCancelCard">
                        <p className='heading-3 text-align-center margin-bottom-10'>Tem certeza que<br />deseja voltar?</p>
                        <p className='body-light text-align-center margin-bottom-20'>Se continuar as alterações serão perdidas.</p>
                        <div className='popUpCancelButtons'>
                            <button className='button-2' onClick={() => setShowPop(false)} >
                                Voltar
                            </button>
                            <button className='button-3' onClick={navigateToHomeAluno} >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showConfirmEntry && (
                <div className='popUpConfirmOperationEntry'>
                    <div className="popUpConfirmCard">
                        <h1 className='body-large text-align-center margin-bottom-10'>Seu pedido de <strong>entrada</strong> foi enviado com sucesso !</h1>
                        <h2 className='body-light text-align-center margin-bottom-20'>Assim que um colaborador avaliar o seu pedido, assine.</h2>
                        <button className='button-4' onClick={requestConfirmed}>Voltar a tela inicial</button>
                    </div>
                </div>
            )}
            <div className="blockerMobile"></div>
        </>
    )
}

export default EntryAluno