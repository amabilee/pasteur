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
    const [showPop, setShowPop] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const navigate = useNavigate();
    const [addButtonStyle, changeAddButtonStyle] = useState('button-6-disable');
    const [addButtonState, changeAddButtonState] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [pedidoPossivelMovimentar, setPedidoPossivelMovimentar] = useState([])
    const finalDataMoviment = {};
    var infoUsers = {}
    const [pedidos, setPedidos] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
        console.log(infoUsers)
        setNomeAluno(infoUsers.NomeUser.split(' ')[0])
        setMatriculaAluno(infoUsers.matricula)
        getPedidos();
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

    function navigateToConfirmExit() {
        if ((selectedItems.length === 0)) {
            setErrorMessage('Pelo menos uma caixa deve ser selecionada.');
        } else {
            setErrorMessage('');
            setShowConfirmExit(true);
            formatMovimentData()
            console.log(finalDataMoviment);
            sendPedidoRequest()
        }
    }

    const sendPedidoRequest = async () => {
        var token = localStorage.getItem("loggedUserToken");
        if (token.length <= 1) {
            localStorage.removeItem('loggedUserToken');
            localStorage.removeItem('loggedUserData');
            localStorage.removeItem('auth1');
            localStorage.removeItem('auth2');
            localStorage.removeItem('auth3');
        } else {
            var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
            var userCargo = infoUsers.cargo
            try {
                const response = await server.post("/pedido", finalDataMoviment, {
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json",
                        "access-level": `${userCargo}`
                    }
                });
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        }
    }

    const handleCardClick = (item) => {
        const isItemSelected = selectedItems.includes(item);
        if (isItemSelected) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
        console.log(selectedItems)
    };

    function tableReportContent() {
        if (pedidoPossivelMovimentar.length > 0) {
            return (
                <table>
                    <tbody>
                        {pedidoPossivelMovimentar.map((item, index) => (
                            <tr key={index}>
                                <td
                                    onClick={() => handleCardClick(item)}
                                    style={{
                                        border: selectedItems.includes(item) ? '2px solid #5BC9F4' : '2px solid #E1E1E1',
                                    }}
                                    className="pedido"
                                >
                                    <p className='body-normal'>{item.familias}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            return null;
        }
    };



    function searchPedidosBasedBox() {
        let boxDesejado = box;
        let matriculaDesejada = matriculaAluno;
        let pedidosEncontrados = pedidos.filter(pedido =>
            Number(pedido.box) === Number(boxDesejado) &&
            Number(pedido.matricula) === Number(matriculaDesejada)
        );
        changeAddButtonStyle('button-6-disable');
        changeAddButtonState(true);
        if (pedidosEncontrados.length > 0) {
            setPedidoPossivelMovimentar(pedidosEncontrados);
            setErrorMessage('');
        } else {
            setPedidoPossivelMovimentar([]);
            setErrorMessage('Não foram encontradas caixas neste box.');
        }
        setBox('');
    }


    function stagesReturn() {
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
        finalDataMoviment.periodoAluno = Number(selectedItems[0].periodoAluno);
        finalDataMoviment.box = Number(selectedItems[0].box);
        finalDataMoviment.tipo = 'Saída';
        finalDataMoviment.status = 'Pendente';
        finalDataMoviment.colaborador = '';
        finalDataMoviment.assinatura = false;
        finalDataMoviment.familias = String(selectedItems.map(item => item.familias));
        finalDataMoviment.quantidadeItens = ''
    }

    async function getPedidos() {
        var token = localStorage.getItem("loggedUserToken")
        if (token.length <= 1) {
            localStorage.removeItem('loggedUserToken');
            localStorage.removeItem('loggedUserData');
            localStorage.removeItem('auth1');
            localStorage.removeItem('auth2');
            localStorage.removeItem('auth3');
        } else {
            var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
            var userCargo = infoUsers.cargo
            let formatedMatricula = Number(infoUsers.matricula)
            try {
                const response = await server.get(`/pedido?matricula=${formatedMatricula}&status=Aprovado`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json",
                        "access-level": `${userCargo}`
                    }
                })
                console.log(response.data.pedidos);
                const pedidosDisponiveisSaida = searchPedidosBasedMatricula(formatedMatricula, response.data.pedidos);
                console.log("Pedidos disponíveis para saída:", pedidosDisponiveisSaida);
                console.log("Pedidos no sistema:", pedidos);
            } catch (e) {
                console.error(e)
            }
        }
    }

    function searchPedidosBasedMatricula(matriculaDesejada, pedidos) {
        const pedidosDisponiveisSaida = [];
        const pedidosFiltrados = pedidos
        console.log("Pedidos geral filtrados:", pedidosFiltrados);
        const familiasQuantidadeEntrada = [];
        const familiasQuantidadeSaida = [];
        pedidosFiltrados.forEach(pedido => {
            if (pedido.tipo === "Entrada") {
                const familias = pedido.familias.split(',');
                const quantidades = pedido.quantidadeItens.split(',');
                for (let i = 0; i < familias.length; i++) {
                    const novoPedido = {
                        ...pedido,
                        familias: familias[i].trim(),
                        quantidadeItens: quantidades[i].trim()
                    };
                    familiasQuantidadeEntrada.push(novoPedido);
                }
                console.log("Pedidos para de entrada 1:", familiasQuantidadeEntrada);
            } else if (pedido.tipo === "Saída") {
                const familias = pedido.familias.split(',');
                for (let i = 0; i < familias.length; i++) {
                    const novoPedido = {
                        ...pedido,
                        familias: familias[i].trim(),
                    };
                    familiasQuantidadeSaida.push(novoPedido);
                }
                console.log("Pedidos para de saída 1:", familiasQuantidadeSaida);
            }
        });

        familiasQuantidadeEntrada.forEach(quantidadeEntrada => {
            const familia = quantidadeEntrada.familias;
            const quantidadeSaida = familiasQuantidadeSaida.filter(pedido => pedido.familias === familia)
                .reduce((total, pedido) => total + parseInt(pedido.quantidadeItens), 0);
            if (parseInt(quantidadeEntrada.quantidadeItens) > parseInt(quantidadeSaida)) {
                familiasQuantidadeEntrada.forEach(pedido => {
                    if (pedido.familias.includes(familia)) {
                        pedidosDisponiveisSaida.push(pedido);
                    }
                });
            }
        });

        console.log("Pedidos para de entrada:", familiasQuantidadeEntrada);
        console.log("Pedidos para de saída:", familiasQuantidadeSaida);
        console.log("Pedidos disponíveis para saída:", pedidosDisponiveisSaida);
        setPedidos(pedidosDisponiveisSaida)
        return pedidosDisponiveisSaida;
    }

    function navigateToConfirmHome() {
        if (tableData.length !== 0) {
            setShowPop(true)
        } else {
            navigateToHomeAluno()
        }
    }

    function detectBoxEntry(e) {
        setBox(e.target.value.replace(/[^0-9]/g, ''));
        if (box.length <= 2) {
            setPedidoPossivelMovimentar([]);
            setSelectedItems([])
        }
    }

    return (
        <>
            <HeaderPagesAluno />
            <Container className='containerMobileExit'>
                <div className="inputFormsExit">
                    <h1 className='title-1 margin-bottom-30'>Registrar pedido de saída</h1>
                    <input placeholder='Box de armazenamento' className='form-4' value={box} onChange={(e) => detectBoxEntry(e)} type='text' maxLength="3" />
                    <button className={addButtonStyle} onClick={searchPedidosBasedBox} disabled={addButtonState} style={{marginBottom: '25px'}}>
                        Pesquisar caixas
                    </button>
                    {errorMessage && <p className="error-message-mobile">{errorMessage}</p>}
                    <div className="tableReport">
                        {tableReportContent()}
                    </div>
                </div>
                <div className='sendButtonsEntry'>
                    <button className='button-2' disabled={false} onClick={navigateToConfirmHome} >
                        Cancelar
                    </button>
                    <button className='button-3' disabled={false} onClick={navigateToConfirmExit} >Confimar
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
            <div className="blockerMobile"></div>
        </>
    )
}

export default ExitAluno