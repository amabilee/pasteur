import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import HeaderPagesAluno from '../../components/headers/alunoPagesIndex'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { server } from "../../services/server";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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

    const [pedidoPossivelMovimentar, setPedidoPossivelMovimentar] = useState([])
    const finalDataMoviment = {};
    const infoUsers = useRef({});
    const [pedidos, setPedidos] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: "white", color: "black", borderRadius: '10px' } })

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
            openSnackBarMessage()
            setSnackBarMessage('Pelo menos uma caixa deve ser selecionada.');
            setSnackBarStyle({ sx: { background: '#BE5353', color: 'white', borderRadius: '15px' } });
        } else {
            setShowConfirmExit(true);
            formatMovimentData()
            sendPedidoRequest()
            setTimeout(() => {
                navigate('/home-aluno')
                setShowConfirmExit(false)
                stagesReturn();
            }, 3000);
        }
    }

    const sendPedidoRequest = async () => {
        var token = localStorage.getItem("loggedUserToken");
        var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
        var userCargo = infoUsers.cargo
        try {
            await server.post("/pedido", finalDataMoviment, {
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                    "access-level": `${userCargo}`
                }
            });
        } catch (e) {
            console.error(e);
            if (e.response.status == 401) {
                localStorage.removeItem('loggedUserToken');
                localStorage.removeItem('loggedUserData');
                localStorage.removeItem('auth1');
                localStorage.removeItem('auth2');
                localStorage.removeItem('auth3');
                window.location.reload();
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
    }



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
        } else {
            setPedidoPossivelMovimentar([]);
            openSnackBarMessage()
            setSnackBarMessage('Não foram encontradas caixas neste box.')
            setSnackBarStyle({ sx: { background: '#BE5353', color: 'white', borderRadius: '15px' } });
        }
        setBox('');
    }


    function stagesReturn() {
        changeAddButtonStyle('button-6-disable');
        changeAddButtonState(true);
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

    const getPedidos = async () => {
        var token = localStorage.getItem("loggedUserToken");
        var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
        var userCargo = infoUsers.cargo;
        let formatedMatricula = Number(infoUsers.matricula);

        try {
            const response = await server.get(`/pedido?matricula=${formatedMatricula}&status=Aprovado`, {
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                    "access-level": `${userCargo}`,
                },
            });
            searchPedidosBasedMatricula(response.data.pedidos);
        } catch (e) {
            console.error(e);
            if (e.response && e.response.status === 401) {
                localStorage.clear(); // Clear all user-related data
                window.location.reload();
            }
        }
    };

    useEffect(() => {
        infoUsers.current = JSON.parse(localStorage.getItem("loggedUserData"));
        setNomeAluno(infoUsers.current.NomeUser.split(' ')[0]);
        setMatriculaAluno(infoUsers.current.matricula);
        getPedidos();
    }, []);

    function searchPedidosBasedMatricula(pedidos) {
        const pedidosDisponiveisSaida = [];
        const pedidosFiltrados = pedidos
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
            } else if (pedido.tipo === "Saída") {
                const familias = pedido.familias.split(',');
                for (let i = 0; i < familias.length; i++) {
                    const novoPedido = {
                        ...pedido,
                        familias: familias[i].trim(),
                    };
                    familiasQuantidadeSaida.push(novoPedido);
                }
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
        let tempBox = e.target.value
        if (tempBox.length <= 2) {
            setPedidoPossivelMovimentar([]);
            setSelectedItems([])
            changeAddButtonStyle('button-6-disable');
            changeAddButtonState(true);
        } else {
            changeAddButtonStyle('button-6');
            changeAddButtonState(false);
        }
    }

    //Snackbar settings
    const openSnackBarMessage = () => {
        setOpen(true);
    };

    const closeSnackBarMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const alertBox = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeSnackBarMessage}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <HeaderPagesAluno />
            <Container className='containerMobileExit'>
                <div className="inputFormsExit">
                    <h1 className='title-1 margin-bottom-30'>Registrar pedido de saída</h1>
                    <p className='body-small text-color-5 margin-bottom-10'>Box de armazenamento</p>
                    <input placeholder='Box de armazenamento' className='form-4' value={box} onChange={(e) => detectBoxEntry(e)} type='text' maxLength="3" />
                    <button className={addButtonStyle} onClick={searchPedidosBasedBox} disabled={addButtonState} style={{ marginBottom: '25px' }}>
                        Pesquisar caixas
                    </button>
                    <p className='body-small text-color-5 margin-bottom-10'>Movimentações</p>
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
                    </div>
                </div>
            )}
            <div className="blockerMobile"></div>
            <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackBarMessage} message={snackBarMessage} action={alertBox} ContentProps={snackBarStyle} />
        </>
    )
}

export default ExitAluno