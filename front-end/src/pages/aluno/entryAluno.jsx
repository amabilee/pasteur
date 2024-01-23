import React, { useState, useEffect } from 'react';
import './style.css';
import HeaderPagesAluno from '../../components/headers/alunoPagesIndex'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import moment from "moment";

function EntryAluno() {
    const [box, setBox] = useState('');
    const [family, setFamily] = useState('0');
    const [quantity, setQuantity] = useState('0');
    const navigate = useNavigate();
    const [showPop, setShowPop] = useState(false);
    const [showConfirmEntry, setShowConfirmEntry] = useState(false);
    const [tableData, setTableData] = useState([]);
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


    const finalDataMoviment = { //matrix do formato que as informações são enviadas
        matricula: '',
        nome: '',
        periodo: '',
        box: '',
        tipo: '',
        status: '',
        colaborador: '',
        assinatura: false,
        hora: '',
        data: '',
        movimentacao: tableData
    };

    var infoUser = { //valor que vem do login (localStorage)
        matricula: '2345678',
    }

    var infoUsers = //valor do GET aluno function getLoggedAluno()
    {
        matricula: '2345678',
        nome: 'Vinícius',
        periodo: '10',
    }

    var familias = [ //banco com os dados das familias
        {
            nome: 'Cirúrgica',
            quantBase: '20',
            quantMax: '20',
            quantMin: '17'
        },
        {
            nome: 'Dentística',
            quantBase: '20',
            quantMax: '20',
            quantMin: '11'
        },
        {
            nome: 'Implante Dentário',
            quantBase: '20',
            quantMax: '20',
            quantMin: '15'
        },
        {
            nome: 'Ortodontia',
            quantBase: '20',
            quantMax: '20',
            quantMin: '18'
        },
        {
            nome: 'Endodontia',
            quantBase: '20',
            quantMax: '20',
            quantMin: '16'
        },
        {
            nome: 'Periodontia',
            quantBase: '20',
            quantMax: '20',
            quantMin: '12'
        },
        {
            nome: 'Prótese Dentária',
            quantBase: '20',
            quantMax: '20',
            quantMin: '14'
        },
        {
            nome: 'Radiologia Odontológica',
            quantBase: '20',
            quantMax: '20',
            quantMin: '10'
        },
        {
            nome: 'Odontopediatria',
            quantBase: '20',
            quantMax: '20',
            quantMin: '13'
        },
        {
            nome: 'Cirurgia Bucomaxilofacial',
            quantBase: '20',
            quantMax: '20',
            quantMin: '16'
        },
        {
            nome: 'Odontologia Estética',
            quantBase: '20',
            quantMax: '20',
            quantMin: '14'
        },
        {
            nome: 'Ortopedia Funcional dos Maxilares',
            quantBase: '20',
            quantMax: '20',
            quantMin: '17'
        },
        {
            nome: 'Oclusão',
            quantBase: '20',
            quantMax: '20',
            quantMin: '15'
        },
        {
            nome: 'Odontologia do Trabalho',
            quantBase: '20',
            quantMax: '20',
            quantMin: '13'
        },
        {
            nome: 'Farmacologia em Odontologia',
            quantBase: '20',
            quantMax: '20',
            quantMin: '11'
        },
        {
            nome: 'Odontologia Legal',
            quantBase: '20',
            quantMax: '20',
            quantMin: '10'
        },
        {
            nome: 'Anatomia Dental',
            quantBase: '20',
            quantMax: '20',
            quantMin: '18'
        },
        {
            nome: 'Microbiologia Oral',
            quantBase: '20',
            quantMax: '20',
            quantMin: '16'
        },
        {
            nome: 'Patologia Oral',
            quantBase: '20',
            quantMax: '20',
            quantMin: '12'
        },
        {
            nome: 'Cariologia',
            quantBase: '20',
            quantMax: '20',
            quantMin: '14'
        },
        {
            nome: 'Materiais Dentários',
            quantBase: '20',
            quantMax: '20',
            quantMin: '11'
        }
    ]

    function navigateToHomeAluno() { //função para navegar para a tela home
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
    function navigateToConfirmEntry() { //função para navegar para tela de confirmação
        if (box.trim() === '' || /^0+$/.test(box) || (box.length > 0 && box[0] === '0') || (tableData.length === 0)) {
            setErrorMessage('Todos os campos devem ser preenchidos.');
        } else {
            setErrorMessage(' ');
            formatMovimentData()
            setShowConfirmEntry(true);
            setShowPop(false)
        }

    }

    function formatMovimentData() { //função para montar matrix do formato que as informações são enviadas
        finalDataMoviment.matricula = infoUser.matricula;
        finalDataMoviment.nome = infoUsers.nome;
        finalDataMoviment.periodo = infoUsers.periodo;
        finalDataMoviment.box = box;
        finalDataMoviment.tipo = 'Entrada';
        finalDataMoviment.status = 'Pendente';
        finalDataMoviment.colaborador = '';
        finalDataMoviment.assinatura = false;
        finalDataMoviment.hora = { date_create: moment().format("hh:mm:ss") };
        finalDataMoviment.data = { date_create: moment().format("DD-MM-YYYY") };
        finalDataMoviment.movimentacao = tableData
    }

    function detectEntryFamily(e) { //função para detectar se uma familia foi selecionada
        const selectedFamily = e.target.value
        setFamily(selectedFamily)
        changeStatusQuantButtons(false)
        changeStatusQuantButtonNegative('button-5')
        changeStatusQuantButtonPositive('button-5')
    }

    function changeSelectorStateNegative() { //função para atualizar styles dos botões de quantidade
        changeStatusQuantSelect(false);
        changeStatusQuantSelectStyle('disable-form margin-bottom-20')
        changeStatusQuantButtonNegative('button-5-enable')
        changeStatusQuantButtonPositive('button-5')
        changeAddButtonStyle('button-6-disable')
        changeAddButtonState(false)
    };

    function changeSelectorStatePositive() { //função para atualizar styles dos botões de quantidade
        changeStatusQuantSelect(true);
        changeStatusQuantSelectStyle('disable-form margin-bottom-20')
        changequantSelectBase(true)
        changeAddButtonStyle('button-6')
        changeAddButtonState(false)
        var quantityBase = loadedFamilyOptions.find(option => option.nome === family)
        setQuantity(quantityBase.quantBase)
        changeStatusQuantButtonNegative('button-5')
        changeStatusQuantButtonPositive('button-5-enable')
    };

    function detectEntryQuant(e) { //função para detectar qual quantidade foi selecionada
        const selectedQuant = e.target.value;
        setQuantity(selectedQuant);
        changeAddButtonStyle('button-6')
        changeAddButtonState(false)
    };

    function renderOptionsQuant() { //função para renderizar as opção de quantidades para cada família
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

    function tableReportContent() { //função para gerar o conteúdo da tabela com as movimentações desejadas
        return tableData.map((item, index) => (
            <tbody key={index}>
                <tr>
                    <td><p className='body-normal'>{item.family}</p><p className='body-normal'>{item.quantity}</p></td>
                </tr>
            </tbody>
        ));
    };

    function addMovement() { //função para adicionar um novo movimento
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
        }
        setFamily("0");
        setQuantity("0");
        stagesReturn()
    };

    function stagesReturn() { //função para retornar os estilos e stages ao padrão
        changeStatusQuantSelect(true)
        changeStatusQuantButtons(true)
        changeStatusQuantSelectStyle('disable-form margin-bottom-20')
        changeStatusQuantButtonNegative('button-5-disable');
        changeStatusQuantButtonPositive('button-5-disable');
        changeAddButtonState(true)
        changeAddButtonStyle('button-6-disable')
    }

    function requestConfirmed() { //função para POST do pedido
        navigate('/home-aluno')
        setShowConfirmEntry(false)
        formatMovimentData()
        console.log(finalDataMoviment);
        setTableData([]);
        stagesReturn();
    }
    // Local Storage Functions

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
            <Container className='containerMobileEntry'>
                <h1 className='title-1 margin-bottom-30'>Registrar pedido de entrada</h1>
                <input
                    placeholder='Box de armazenamento'
                    className='form-4'
                    value={box}
                    onChange={(e) => setBox(e.target.value)}
                    type='number'
                />
                <select
                    className='form-4'
                    value={family}
                    onChange={detectEntryFamily}
                >
                    <option disabled={true} value='0'>Selecione a família</option>
                    {loadedFamilyOptions.map((option, index) => (
                        <option key={index} value={option.nome}>
                            {option.nome}
                        </option>
                    ))}
                </select>
                <span className='body-small text-color-5 margin-bottom-10'>Caixa com todos os itens ?</span>
                <div className='selectQuantStateButtons'>
                    <button
                        className={buttonPositiveQuant}
                        disabled={enableQuantButtons}
                        onClick={changeSelectorStatePositive}
                    > Sim
                    </button>
                    <button
                        className={buttonNegativeQuant}
                        disabled={enableQuantButtons}
                        onClick={changeSelectorStateNegative}
                    > Não
                    </button>
                </div>
                <select
                    className={enableQuantSelectStyle}
                    value={quantity}
                    disabled={enableQuantSelect}
                    onChange={detectEntryQuant}
                >
                    <option disabled={true} value='0'>Selecione a quantidade</option>
                    {renderOptionsQuant()}
                </select>
                <button
                    className={addButtonStyle}
                    onClick={addMovement}
                    disabled={addButtonState}
                >
                    Adicionar
                </button>
                <div className="tableReport">
                    <table>
                        {tableReportContent()}
                    </table>
                </div>
                {errorMessage && <p className="error-message-mobile">{errorMessage}</p>}
                <div className='sendRequestButtons'>
                    <button
                        className='button-2'
                        disabled={false}
                        onClick={() => setShowPop(true)}
                    > Cancelar
                    </button>
                    <button
                        className='button-3'
                        disabled={false}
                        onClick={navigateToConfirmEntry}
                    > Confimar
                    </button>
                </div>
            </Container>
            {showPop && (
                <div className="popUpCancelOperation">
                    <div className="popUpCancelCard">
                        <p className='heading-3 text-align-center margin-bottom-10'>Tem certeza que<br />deseja voltar?</p>
                        <p className='body-light text-align-center margin-bottom-20'>Se continuar as alterações serão perdidas.</p>
                        <div className='popUpCancelButtons'>
                            <button
                                className='button-3'
                                onClick={() => setShowPop(false)}
                            > Voltar
                            </button>
                            <button
                                className='button-2'
                                onClick={navigateToHomeAluno}
                            > Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showConfirmEntry && (
                <div className='popUpConfirmOperation'>
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