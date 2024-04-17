import React, { useState, useEffect } from 'react';
import './style.css';
import HeaderPagesAluno from '../../components/headers/alunoPagesIndex';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { server } from "../../services/server";

function ExitAluno() {
    const [request, setRequest] = useState('');
    const [showPop, setShowPop] = useState(false);
    const [addButtonStyle, setAddButtonStyle] = useState('button-6-disable');
    const [addButtonState, setAddButtonState] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [organizedPedidos, setOrganizedPedidos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
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
            const matricula = Number(infoUsers.matricula);
            try {
                const response = await server.get(`/pedido?matricula=${matricula}&assinatura=0&status=Aprovado`, {
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json",
                        "access-level": `${userCargo}`
                    }
                });
                const pedidos = response.data.pedidos;
                // const pedidoFiltrados = pedidos.filter(pedido => pedido.matricula === matricula && !pedido.assinatura && pedido.status === 'Aprovado');
                const pedidosCronologicos = pedidos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrganizedPedidos(pedidosCronologicos);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function postPedidoAssinado(idPedido, pedido) {
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
                const response = await server.put(`/pedido/${idPedido}`, pedido, {
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

    function navigateToConfirmExit() {
        if (tableData.length === 0) {
            setErrorMessage('Todos os campos devem ser preenchidos.');
        } else {
            setErrorMessage('');
            setShowPop(false);
            const pedidosAssinados = tableData.map(pedido => ({ ...pedido, assinatura: true }));
            pedidosAssinados.forEach(pedido => {
                postPedidoAssinado(pedido.id, pedido);
            });
            console.log(pedidosAssinados);
            requestConfirmed();
        }
    }


    function navigateToHomeAluno() {
        navigate('/home-aluno');
    }

    function detectEntryRequest(e) {
        const selectedRequest = e.target.value;
        setRequest(selectedRequest);
        setAddButtonStyle('button-6');
        setAddButtonState(false);
    }

    function addMovement() {
        const selectedPedido = organizedPedidos.find(pedido => {
            const pedidoInfo = `Pedido de ${pedido.tipo} : ${formatarDataHora(pedido.createdAt)}`;
            return pedidoInfo === request;
        });

        if (selectedPedido) {
            const existingIndex = tableData.findIndex(item =>
                item.tipo === selectedPedido.tipo &&
                item.createdAt === selectedPedido.createdAt
            );

            if (existingIndex !== -1) {
                setErrorMessage('Pedido já existe na tabela.');
            } else {
                setTableData(prevData => [...prevData, selectedPedido]);
                setRequest('');
                setAddButtonStyle('button-6-disable');
                setAddButtonState(true);
                setErrorMessage('');
            }
        } else {
            setErrorMessage('Pedido não encontrado.');
        }
    }

    function requestConfirmed() {
        navigate('/home-aluno');
        setTableData([]);
    }

    function formatarDataHora(dataHora) {
        const data = new Date(dataHora);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
    }

    function tableReportContent() {
        return tableData.map((item, index) => (
            <tbody key={index}>
                <tr>
                    <td>
                        <p className='body-normal'>{item.tipo}</p>
                        <p className='body-normal'>{formatarDataHora(item.createdAt)}</p>
                    </td>
                </tr>
            </tbody>
        ));
    }

    function navigateToHome() {
        if (tableData.length !== 0) {
            setShowPop(true);
        } else {
            navigateToHomeAluno();
        }
    }

    return (
        <>
            <HeaderPagesAluno />
            <Container className='containerMobileSign'>
                <div className="inputForms">
                    <h1 className='title-1 margin-bottom-30'>Assinar pedidos</h1>
                    <select className='form-4' value={request} onChange={detectEntryRequest}>
                        <option value='0'>Selecione o pedido</option>
                        {organizedPedidos.map((option, index) => (
                            <option key={index} value={`Pedido de ${option.tipo} : ${formatarDataHora(option.createdAt)}`}>
                                {`Pedido de ${option.tipo} : ${formatarDataHora(option.createdAt)}`}
                            </option>
                        ))}
                    </select>
                    <button className={addButtonStyle} onClick={addMovement} disabled={addButtonState}>
                        Adicionar
                    </button>
                    <div className="tableReport">
                        <table>{tableReportContent()}</table>
                    </div>
                </div>
                {errorMessage && <p className="error-message-mobile">{errorMessage}</p>}
                <div className='sendButtonsEntry'>
                    <button className='button-2' onClick={navigateToHome}>
                        Cancelar
                    </button>
                    <button className='button-3' onClick={navigateToConfirmExit}>
                        Confirmar
                    </button>
                </div>
            </Container>
            {showPop && (
                <div className="popUpCancelOperation">
                    <div className="popUpCancelCard">
                        <p className='heading-3 text-align-center margin-bottom-10'>Tem certeza que<br />deseja voltar?</p>
                        <p className='body-light text-align-center margin-bottom-20'>Se continuar as alterações serão perdidas.</p>
                        <div className='popUpCancelButtons'>
                            <button className='button-2' onClick={() => setShowPop(false)}>
                                Voltar
                            </button>
                            <button className='button-3' onClick={navigateToHomeAluno}>
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="blockerMobile"></div>
        </>
    );
}

export default ExitAluno;
