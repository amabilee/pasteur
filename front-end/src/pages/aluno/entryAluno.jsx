import React, { useState, useEffect } from 'react';
import './style.css';
import HeaderPagesAluno from '../../components/headers/alunoPagesIndex'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import moment from "moment";

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
    const [loadedFamilyOptions, setLoadedFamilyOptions] = useState([]);
    const finalDataMoviment = { matricula_aluno: '', nome_aluno: '', periodo_aluno: '', box_aluno: '', modalidade: '', status: '', nome_colab: '', assinatura: false, hora: '', data: '', nome_familia: '', qnt_itens: '' };
    var infoUser = {}
    var familias = [
        { id: 1, nome: 'Cirúrgica', quantMax: '20', quantMin: '17' },
        { id: 2, nome: 'Dentística', quantMax: '20', quantMin: '11' },
        { id: 3, nome: 'Implante Dentário', quantMax: '20', quantMin: '15' },
        { id: 4, nome: 'Ortodontia', quantMax: '20', quantMin: '18' },
        { id: 5, nome: 'Endodontia', quantMax: '20', quantMin: '16' },
        { id: 6, nome: 'Periodontia', quantMax: '20', quantMin: '12' },
        { id: 7, nome: 'Prótese Dentária', quantMax: '20', quantMin: '14' },
        { id: 8, nome: 'Radiologia Odontológica', quantMax: '20', quantMin: '10' },
        { id: 9, nome: 'Odontopediatria', quantMax: '20', quantMin: '13' },
        { id: 10, nome: 'Cirurgia Bucomaxilofacial', quantMax: '20', quantMin: '16' },
        { id: 11, nome: 'Odontologia Estética', quantMax: '20', quantMin: '14' },
        { id: 12, nome: 'Ortopedia Funcional dos Maxilares', quantMax: '20', quantMin: '17' },
        { id: 13, nome: 'Oclusão', quantMax: '20', quantMin: '15' },
        { id: 14, nome: 'Odontologia do Trabalho', quantMax: '20', quantMin: '13' },
        { id: 15, nome: 'Farmacologia em Odontologia', quantMax: '20', quantMin: '11' },
        { id: 16, nome: 'Odontologia Legal', quantMax: '20', quantMin: '10' },
        { id: 17, nome: 'Anatomia Dental', quantMax: '20', quantMin: '18' },
        { id: 18, nome: 'Microbiologia Oral', quantMax: '20', quantMin: '16' },
        { id: 19, nome: 'Patologia Oral', quantMax: '20', quantMin: '12' },
        { id: 20, nome: 'Cariologia', quantMax: '20', quantMin: '14' },
        { id: 21, nome: 'Materiais Dentários', quantMax: '20', quantMin: '11' }
    ]

    // async function getInfoAluno(matricula) {
    //     try {
    //         const response = server.post('/pedido', {matricula})
    //         if (response.status === 200) {
    //             // entryRequests = response
    //             console.log('get info aluno right')
    //         }
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

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
            setErrorMessage('Todos os campos devem ser preenchidos.');
        } else if (periodo == '') {
            setErrorMessage('Todos os campos devem ser preenchidos.');
        } else {
            setErrorMessage(' ');
            formatMovimentData()
            setShowConfirmEntry(true);
            setShowPop(false)
        }
    }

    function formatMovimentData() {
        let newObject = window.localStorage.getItem("loggedUser");
        infoUser = (JSON.parse(newObject));
        setNomeAluno(infoUser.nome)
        setMatriculaAluno(infoUser.matricula)
        finalDataMoviment.matricula_aluno = matriculaAluno;
        finalDataMoviment.nome_aluno = nomeAluno;
        finalDataMoviment.periodo_aluno = periodo;
        finalDataMoviment.box_aluno = box;
        finalDataMoviment.modalidade = 'Entrada';
        finalDataMoviment.status = 'Pendente';
        finalDataMoviment.nome_colab = '';
        finalDataMoviment.assinatura = false;
        finalDataMoviment.hora = { date_create: moment().format("hh:mm:ss") };
        finalDataMoviment.data = { date_create: moment().format("DD-MM-YYYY") };
        finalDataMoviment.nome_familia = familiasMov
        finalDataMoviment.qnt_itens = qntMov
    }

    function detectEntryFamily(e) {
        setFamily(e.target.value)
        changeStatusQuantButtons(false)
        changeStatusQuantButtonNegative('button-5')
        changeStatusQuantButtonPositive('button-5')
    }

    function changeSelectorStateNegative() {
        changeStatusQuantSelect(false);
        changeStatusQuantSelectStyle('disable-form margin-bottom-20')
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
        var quantityBase = loadedFamilyOptions.find(option => option.nome === family)
        setQuantity(quantityBase.quantMax)
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
        useEffect(() => {
            getFamilias();
        }, []);
        const selectedFamilyOption = loadedFamilyOptions.find(option => option.nome === family);

        if (selectedFamilyOption) {
            return (
                <>
                    {[...Array(Number(selectedFamilyOption.quantMax) - Number(selectedFamilyOption.quantMin) + 1).keys()].map(value => (
                        <option key={value + parseInt(selectedFamilyOption.quantMin)} value={value + parseInt(selectedFamilyOption.quantMin)}>
                            {value + parseInt(selectedFamilyOption.quantMin)}
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

    function requestConfirmed() {
        navigate('/home-aluno')
        setShowConfirmEntry(false)
        formatMovimentData()
        console.log(finalDataMoviment);
        setTableData([]);
        stagesReturn();
    }

    function getFamilias() {
        try {
            const storedData = familias
            if (storedData) {
                setLoadedFamilyOptions(storedData)//(JSON.parse(storedData));
            } else {
                throw new Error('Nenhum dado encontrado no localStorage para famílias');
            }
        } catch (error) {
            console.error(error);
        }
    }

    function navigateToConfirmHome() {
        if (box !== '' || periodo !== '' || (tableData.length !== 0)) {
            setShowPop(true)
        } else {
            navigateToHomeAluno()
        }

    }

    return (
        <>
            <HeaderPagesAluno />
            <Container className='containerMobileEntry'>
                <h1 className='title-1 margin-bottom-30'>Registrar pedido de entrada</h1>
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
                    {loadedFamilyOptions.map((option, index) => (
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
        </>
    )
}

export default EntryAluno