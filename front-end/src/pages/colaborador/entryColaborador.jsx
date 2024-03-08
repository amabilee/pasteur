import React, { useEffect, useState } from 'react';
import HeaderHomeColab from '../../components/headers/colabHomeindex'
import { Container } from 'react-bootstrap'
import './style.css';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


function HomeColaborador() {
  const [showPopView, setShowPopView] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [errorMessage, setErrorMessage] = useState(' ');
  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: "white", color: "black", borderRadius: '10px' } })
  var pedidosEntrada = []

  var pedidos = [
    { id: 1, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 2, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 3, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: true, hora: '06:19', data: '12/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 4, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Entrada', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: true, hora: '06:19', data: '14/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 5, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Entrada', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 6, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Entrada', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 7, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 8, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 9, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] }
  ]


  // async function getPedidos() {
  //   try {
  //     const response = server.post('/pedido')
  //     if (response.status === 200) {
  //       // entryRequests = response
  //       console.log('get pedido right')
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

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
  }

  function invalidateBox() {
    let formatedPedido = selectedAluno
    formatedPedido.status = 'Invalidado'
    console.log(formatedPedido) //post do pedido pós invalidação
    openSnackBarMessage()
    setSnackBarMessage('Pedido invalidado com sucesso')
    setSnackBarStyle({ sx: { background: "#79B874", color: "white", borderRadius: '15px' } })
    handleReturn()
  }

  function validateBox() {
    let formatedPedido = selectedAluno
    formatedPedido.status = 'Validado'
    console.log(formatedPedido) //post do pedido pós validação
    openSnackBarMessage()
    setSnackBarMessage('Pedido validado com sucesso')
    setSnackBarStyle({ sx: { background: "#79B874", color: "white", borderRadius: '15px' } })
    handleReturn()
  }

  function handleReturn() {
    setShowPopView(false)
    setErrorMessage(' ');
    setSelectedAluno(null);
  }

  function tableReportContent() {
    pedidosEntrada = pedidos.filter(pedido => pedido.modalidade === 'Entrada' && pedido.status == 'Pendente');
    return pedidosEntrada.map((pedido, index) => (
      <tbody key={index}>
        <tr>
          <td>
            <p className='body-normal'>{pedido.nome_aluno}</p>
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

  useEffect(() => {
    pedidosEntrada = pedidos.filter(pedido => pedido.modalidade === 'Entrada' && pedido.status == 'Pendente');
    console.log(pedidosEntrada)
  }, [])


  return (
    <>
      <HeaderHomeColab />
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
                      <li><p>Matrícula:</p><p>{selectedAluno.matricula_aluno}</p></li>
                      <li><p>Acadêmico:</p><p>{selectedAluno.nome_aluno}</p></li>
                      <li><p>Período:</p><p>{selectedAluno.periodo_aluno}</p></li>
                      <li><p>Número da box:</p><p>{selectedAluno.box_aluno}</p></li>
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
                        {selectedAluno.nome_familia.map((nomeFamilia, index) => (
                          <tr key={index}>
                            <td>
                              <span>
                                <p>{nomeFamilia}</p>
                                <p>{selectedAluno.qnt_itens[index]}</p>
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
                  Invalidar
                </button>
                <button className='button-9' disabled={false} onClick={validateBox} variant="outlined" >
                  Validar
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

export default HomeColaborador