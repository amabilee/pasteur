import React, { useEffect, useState } from 'react';
import HeaderHomeAdmin from '../../components/headers/adminHomeindex';
import { Container } from 'react-bootstrap'
import './style.css';
import { server } from "../../services/server";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Paginator from '../../components/paginator/paginator';


function EntryAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

  const [showPopView, setShowPopView] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState({});
  const [errorMessage, setErrorMessage] = useState(' ');
  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: "white", color: "black", borderRadius: '10px' } })
  var pedidosEntrada = []
  const [pedidos, setPedidos] = useState([])
  const [nome, setNome] = useState('')
  var infoUsers = {}
  const [movimentacoesArray, setMovimentacoesArray] = useState([]);


  useEffect(() => {
    getPedidos(1);
    infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
    setNome(infoUsers.NomeUser)
  }, []);

  async function getPedidos(pagina) {
    var token = localStorage.getItem("loggedUserToken")
    var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
    var userCargo = infoUsers.cargo
    if (pagina == undefined) {
      pagina == 1
    }
    try {
      const response = await server.get(`/pedido?page=${pagina}&tipo=Entrada&status=Pendente`, {
        method: 'GET',
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json",
          "access-level": `${userCargo}`
        }
      })
      setPedidos(response.data.pedidos)
      setTotalPages(response.data.pagination.totalPages)
    }
    catch (e) {
      console.error(e)
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

  function buttonView(aluno) {
    setShowPopView(true);
    setSelectedAluno(aluno);
    var familiasArray = aluno.familias.split(',');
    var quantidadesArray = aluno.quantidadeItens.split(',');
    for (let i = 0; i < quantidadesArray.length; i++) {
      const familia = familiasArray[i].trim();
      const quantidade = parseInt(quantidadesArray[i].trim());
      movimentacoesArray.push({ familia, quantidade });
    }
  }

  function invalidateBox() {
    let formatedPedido = selectedAluno
    formatedPedido.status = 'Reprovado'
    formatedPedido.colaborador = nome
    postPedidoAvaliado(formatedPedido.id, formatedPedido)
    openSnackBarMessage()
    setSnackBarMessage('Pedido invalidado com sucesso')
    setSnackBarStyle({ sx: { background: "#79B874", color: "white", borderRadius: '15px' } })
    handleReturn()
  }

  async function postPedidoAvaliado(idPedido, pedido) {
    var token = localStorage.getItem("loggedUserToken");
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
    }
    catch (e) {
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

  function validateBox() {
    let formatedPedido = selectedAluno
    formatedPedido.status = 'Aprovado'
    formatedPedido.colaborador = nome
    postPedidoAvaliado(formatedPedido.id, formatedPedido)
    openSnackBarMessage()
    setSnackBarMessage('Pedido validado com sucesso')
    setSnackBarStyle({ sx: { background: "#79B874", color: "white", borderRadius: '15px' } })
    handleReturn()
  }

  function handleReturn() {
    setShowPopView(false)
    setErrorMessage(' ');
    setSelectedAluno(null);
    setMovimentacoesArray([])
  }

  function tableReportContent() {
    pedidosEntrada = pedidos.filter(pedido => pedido.tipo === 'Entrada' && pedido.status == 'Pendente');
    return pedidosEntrada.map((pedido, index) => (
      <tbody key={index}>
        <tr>
          <td>
            <p className='body-normal'>{pedido.nomeAluno}</p>
            <p className='body-normal'>
              <button className='button-7' onClick={() => buttonView(pedido)}>
                Visualizar
              </button>
            </p>
          </td>
        </tr>
      </tbody>
    ));

  };

  //Paginação;
  const handlePageChange = (page) => {
    setCurrentPage(page);
    getPedidos(page)
  };

  return (
    <>
      <HeaderHomeAdmin />
      <Container className='containerDesktop'>
        <div className='boxContainerDesktop'>
          <div className="headContainerDesktop">
            <h2 className='body-normal text-color-5'>Validação entrada de caixas</h2>
            <h1 className='heading-4'>Pedidos de entrada pendentes</h1>
          </div>
          <div className="bodyContainerDesktop">
            <div className="tableRequests">
              <table>
                {tableReportContent()}
              </table>
            </div>
          </div>
        </div>
        <div className="paginator-component">
          <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
        <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackBarMessage} message={snackBarMessage} action={alertBox} ContentProps={snackBarStyle} />
      </Container>
      {showPopView && (
        <div className="popUpView">
          <div className="popUpViewCard">
            <div className="popUpViewHead">
              <h1 className='heading-4'>Visualizar pedido</h1>
              <button className='button-7' onClick={handleReturn}>Voltar</button>
            </div>
            <div className="popUpViewBody">
              <div className="viewCardLeft">
                <p className='body-medium margin-bottom-20'>Informações do aluno</p>
                <div className="viewCardLeftBox">
                  {selectedAluno && (
                    <ul>
                      <li><p>Matrícula:</p><p>{selectedAluno.matricula}</p></li>
                      <li><p>Acadêmico:</p><p>{selectedAluno.nomeAluno}</p></li>
                      <li><p>Período:</p><p>{selectedAluno.periodoAluno}</p></li>
                      <li><p>Número da box:</p><p>{selectedAluno.box}</p></li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="viewCardRight">
                <p className='body-medium margin-bottom-20'>Caixas no pedido</p>
                <div className="viewCardRightBox">
                  <div className="tableRequestInfo">
                    <table>
                      <tbody>
                        {movimentacoesArray.map((option, index) => (
                          <tr key={index}>
                            <td>
                              <span>
                                <p>{option.familia}</p>
                                <p>{option.quantidade}</p>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='errorContainer' style={{ position: 'relative', zIndex: 1 }}>
              {errorMessage && (
                <p className="error-message-colab" style={{ position: 'absolute', top: 0, left: 0 }}>
                  {errorMessage}
                </p>
              )}
              <div className='popUpViewButtons'>
                <button className='button-8' disabled={false} onClick={invalidateBox} variant="outlined" >
                  Reprovar
                </button>
                <button className='button-9' disabled={false} onClick={validateBox} variant="outlined" >
                  Aprovar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="blocker"></div>
    </>
  )
}

export default EntryAdmin
