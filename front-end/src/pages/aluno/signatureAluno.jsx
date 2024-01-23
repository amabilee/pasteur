import React, { useState, useEffect, useDeferredValue } from 'react';
import './style.css';
import HeaderPagesAluno from '../../components/headers/alunoPagesIndex'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function ExitAluno() {

    const [request, setRequest] = useState('');

    const [showPop, setShowPop] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const navigate = useNavigate();
    const [addButtonStyle, changeAddButtonStyle] = useState('button-6-disable');
    const [addButtonState, changeAddButtonState] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(' ');

    const [organizedPedidos, setOrganizedPedidos] = useState([])


    var pedidos = [ //valor do GET pedidos filtrados pela matricula(de preferencia) function getPedidos()
        {
            matricula: '2345678',
            nome: 'Vinícius',
            periodo: '10',
            box: '181',
            tipo: 'Saída',
            status: 'Pendente',
            colaborador: 'Lucas Rodrigues',
            assinatura: false,
            hora: '06:19',
            data: '14/02/2023',
            movimentacao: [
                {
                    nome: 'Cirúrgica',
                    quant: '20',
                }
            ]
        },
        {
            matricula: '2345678',
            nome: 'Vinícius',
            periodo: '10',
            box: '181',
            tipo: 'Saída',
            status: 'Pendente',
            colaborador: 'Lucas Rodrigues',
            assinatura: false,
            hora: '06:19',
            data: '11/02/2023',
            movimentacao: [
                {
                    nome: 'Cirúrgica',
                    quant: '20',
                }
            ]
        },
        {
            matricula: '2345678',
            nome: 'Vinícius',
            periodo: '10',
            box: '181',
            tipo: 'Saída',
            status: 'Pendente',
            colaborador: 'Lucas Rodrigues',
            assinatura: true,
            hora: '06:19',
            data: '12/02/2023',
            movimentacao: [
                {
                    nome: 'Cirúrgica',
                    quant: '20',
                }
            ]
        }
    ]

    function navigateToHomeAluno() { //função para retornar a home aluno
        if (showPop) {
            setShowPop(false);
            navigate('/home-aluno')
        } else {
            navigate('/home-aluno')
        }
    }

    function navigateToConfirmExit() { //função para mostrar pop up de confirmação
        if ((tableData.length === 0)) {
            setErrorMessage('Todos os campos devem ser preenchidos.');
        } else {
            setErrorMessage(' ');
            setShowPop(false);
            requestConfirmed()
            navigate('/home-aluno')
        }
    }

    function detectEntryRequest(e) { //função para detectar se um pedido foi selecionada
        var selectedRequest = e.target.value
        setRequest(selectedRequest)
        changeAddButtonStyle('button-6')
        changeAddButtonState(false)
    }

    function stagesReturn() { //função para retornar os estilos e stages ao padrão
        changeAddButtonStyle('button-6-disable');
        changeAddButtonState(true);
    }

    function requestConfirmed() { //função para POST do pedido
        navigate('/home-aluno')
        setShowConfirmExit(false)
        console.log(tableData);
        setTableData([]);
        stagesReturn();
    }

    useEffect(() => { //exibir inicialmente os resultados ja em ordem cronologica
        var pedidosCronologicos = pedidos.sort((a, b) => {
            var [dia, mes, ano] = a.data.split("/");
            var dateTimeA = new Date(`${ano}-${mes}-${dia}T${a.hora}`);
            [dia, mes, ano] = b.data.split("/");
            var dateTimeB = new Date(`${ano}-${mes}-${dia}T${b.hora}`);
            return dateTimeB - dateTimeA;
        });
        setOrganizedPedidos(pedidosCronologicos);
    }, []);

    function addMovement() {
        const selectedPedido = pedidos.find(pedido => {
            const pedidoInfo = `Pedido de ${pedido.tipo} : ${pedido.data} às ${pedido.hora}`;
            return pedidoInfo === request;
        });

        if (selectedPedido) {
            const existingIndex = tableData.findIndex(item =>
                item.tipo === selectedPedido.tipo &&
                item.data === selectedPedido.data &&
                item.hora === selectedPedido.hora
            );

            if (existingIndex === -1) {
                setTableData(prevData => [...prevData, selectedPedido]);
                setRequest('0');
                stagesReturn();
            } else {
                setErrorMessage('Movimento já existe na tabela.');
            }
        } else {
            setErrorMessage('Pedido não encontrado.');
        }

    }

    function tableReportContent() {
        return tableData.map((item, index) => (
            <tbody key={index}>
                <tr>
                    <td>
                        <p className='body-normal'>{item.tipo}</p><p className='body-normal'>{item.hora}</p><p className='body-normal'>{item.data}</p>
                    </td>
                </tr>
            </tbody>
        ));
    }

    
    return (
        <>
            <HeaderPagesAluno />
            <Container className='containerMobileEntry'>
                <div className="inputForms">
                    <h1 className='title-1 margin-bottom-30'>Assinar pedidos</h1>
                    <select
                        className='form-4'
                        value={request}
                        onChange={detectEntryRequest}
                    >
                        <option value='0'>Selecione o pedido</option>
                        {organizedPedidos.map((option, index) => (
                            <option key={index} value={'Pedido de ' + option.tipo + ' : ' + option.data + ' às ' + option.hora}>
                                {'Pedido de ' + option.tipo + ' : ' + option.data + ' às ' + option.hora}
                            </option>
                        ))}
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
                </div>
                {errorMessage && <p className="error-message-mobile">{errorMessage}</p>}
                <div className='sendButtonsEntry'>
                    <button
                        className='button-2'
                        disabled={false}
                        onClick={() => setShowPop(true)}
                    > Cancelar
                    </button>
                    <button
                        className='button-3'
                        disabled={false}
                        onClick={navigateToConfirmExit}
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
                                disabled={false}
                                onClick={() => setShowPop(false)}
                            > Voltar
                            </button>
                            <button
                                className='button-2'
                                disabled={false}
                                onClick={navigateToHomeAluno}
                            > Continuar
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