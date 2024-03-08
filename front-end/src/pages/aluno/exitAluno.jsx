import React, { useState, useEffect } from 'react';
import './style.css';
import HeaderPagesAluno from '../../components/headers/alunoPagesIndex'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function ExitAluno() {
    const [box, setBox] = useState('');
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
        formatMovimentData()
        console.log(finalDataMoviment);
        stagesReturn();
    }

    function formatMovimentData() {
        let newObject = window.localStorage.getItem("loggedUser");
        infoUser = (JSON.parse(newObject));
        finalDataMoviment.matricula_aluno = infoUser.matricula;
        finalDataMoviment.nome_aluno = infoUser.nome;
        finalDataMoviment.periodo_aluno = periodo;
        finalDataMoviment.box_aluno = box;
        finalDataMoviment.modalidade = 'Saída';
        finalDataMoviment.status = 'Pendente';
        finalDataMoviment.nome_colab = '';
        finalDataMoviment.assinatura = false;
        finalDataMoviment.hora = { date_create: moment().format("hh:mm:ss") };
        finalDataMoviment.data = { date_create: moment().format("DD-MM-YYYY") };
        finalDataMoviment.nome_familia = tableData
    }

    const [loadedFamilyOptions, setLoadedFamilyOptions] = useState([]);

    useEffect(() => { getFamilias() }, []);

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
                        {loadedFamilyOptions.map((option, index) => (
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