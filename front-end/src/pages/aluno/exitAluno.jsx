import React, { useState, useEffect } from 'react';
import './style.css';
import HeaderPagesAluno from '../../components/headers/alunoPagesIndex'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function ExitAluno() {
    const [box, setBox] = useState('');
    const [family, setFamily] = useState('0');
    const [showPop, setShowPop] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const navigate = useNavigate();
    const [addButtonStyle, changeAddButtonStyle] = useState('button-6-disable');
    const [addButtonState, changeAddButtonState] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(' ');
    const newMovement = { family: family };
    const finalDataMoviment = { matricula: '', nome: '', periodo: '', box: '', tipo: '', status: '', colaborador: '', assinatura: false, hora: '', data: '', movimentacao: tableData };
    var infoUser = { matricula: '2345678' }
    var infoUsers = { matricula: '2345678', nome: 'Vinícius Freitas', periodo: '10' }
    var familias = [
        { nome: 'Cirúrgica', quantBase: '20', quantMax: '20', quantMin: '17' },
        { nome: 'Dentística', quantBase: '20', quantMax: '20', quantMin: '11' },
        { nome: 'Implante Dentário', quantBase: '20', quantMax: '20', quantMin: '15' },
        { nome: 'Ortodontia', quantBase: '20', quantMax: '20', quantMin: '18' },
        { nome: 'Endodontia', quantBase: '20', quantMax: '20', quantMin: '16' },
        { nome: 'Periodontia', quantBase: '20', quantMax: '20', quantMin: '12' },
        { nome: 'Prótese Dentária', quantBase: '20', quantMax: '20', quantMin: '14' },
        { nome: 'Radiologia Odontológica', quantBase: '20', quantMax: '20', quantMin: '10' },
        { nome: 'Odontopediatria', quantBase: '20', quantMax: '20', quantMin: '13' },
        { nome: 'Cirurgia Bucomaxilofacial', quantBase: '20', quantMax: '20', quantMin: '16' },
        { nome: 'Odontologia Estética', quantBase: '20', quantMax: '20', quantMin: '14' },
        { nome: 'Ortopedia Funcional dos Maxilares', quantBase: '20', quantMax: '20', quantMin: '17' },
        { nome: 'Oclusão', quantBase: '20', quantMax: '20', quantMin: '15' },
        { nome: 'Odontologia do Trabalho', quantBase: '20', quantMax: '20', quantMin: '13' },
        { nome: 'Farmacologia em Odontologia', quantBase: '20', quantMax: '20', quantMin: '11' },
        { nome: 'Odontologia Legal', quantBase: '20', quantMax: '20', quantMin: '10' },
        { nome: 'Anatomia Dental', quantBase: '20', quantMax: '20', quantMin: '18' },
        { nome: 'Microbiologia Oral', quantBase: '20', quantMax: '20', quantMin: '16' },
        { nome: 'Patologia Oral', quantBase: '20', quantMax: '20', quantMin: '12' },
        { nome: 'Cariologia', quantBase: '20', quantMax: '20', quantMin: '14' },
        { nome: 'Materiais Dentários', quantBase: '20', quantMax: '20', quantMin: '11' }
    ]

    function navigateToHomeAluno() {
        if (showPop) {
            setShowPop(false);
            navigate('/home-aluno')
        } else {
            navigate('/home-aluno')
        }
    }

    function navigateToConfirmExit() {
        if (box.trim() === '' || /^0+$/.test(box) || (box.length > 0 && box[0] === '0') || (tableData.length === 0)) {
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
        const existingIndex = tableData.findIndex((item) => item.nome === family);
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
        setTableData([]);
    }

    function requestConfirmed() {
        navigate('/home-aluno')
        setShowConfirmExit(false)
        formatMovimentData()
        console.log(finalDataMoviment);
        stagesReturn();
    }

    function formatMovimentData() {
        finalDataMoviment.matricula = infoUser.matricula;
        finalDataMoviment.nome = infoUsers.nome;
        finalDataMoviment.periodo = infoUsers.periodo;
        finalDataMoviment.box = box;
        finalDataMoviment.tipo = 'Saída';
        finalDataMoviment.status = 'Pendente';
        finalDataMoviment.colaborador = '';
        finalDataMoviment.assinatura = false;
        finalDataMoviment.hora = { date_create: moment().format("hh:mm:ss") };
        finalDataMoviment.data = { date_create: moment().format("DD-MM-YYYY") };
        finalDataMoviment.movimentacao = tableData
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
                            <button className='button-3' disabled={false} onClick={() => setShowPop(false)}>
                                Voltar
                            </button>
                            <button className='button-2' disabled={false} onClick={navigateToHomeAluno}>
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