import React, { useState } from 'react';
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

  function buttonView(aluno) {
    setShowPopView(true);
    setSelectedAluno(aluno);
  }
  var entryRequests = [
    { matricula: '2345678', nome: 'Vinícius', periodo: '10', box: '181', tipo: 'Saída', status: 'Pendente', colaborador: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', movimentacao: [ { family: 'Cirúrgica', quantity: '20' }, { family: 'Dentística', quantity: '19' } ] },
    { matricula: '2345678', nome: 'Vinícius', periodo: '10', box: '181', tipo: 'Saída', status: 'Pendente', colaborador: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', movimentacao: [ { family: 'Cirúrgica', quantity: '20' }, { family: 'Dentística', quantity: '19' }, { family: 'Dentística', quantity: '19' }, { family: 'Dentística', quantity: '19' }, { family: 'Dentística', quantity: '19' }, { family: 'Dentística', quantity: '19' }, { family: 'Dentística', quantity: '19' } ] }
  ]

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

  function invalidateBox() {
    openSnackBarMessage()
    setSnackBarMessage('Pedido invalidado com sucesso')
    setSnackBarStyle({ sx: { background: "#79B874", color: "white", borderRadius: '15px' } })
    handleReturn()
  }

  function validateBox() {
    openSnackBarMessage()
    setSnackBarMessage('Pedido validado com sucesso')
    setSnackBarStyle({ sx: { background: "#79B874", color: "white", borderRadius: '15px' } })
    handleReturn()
  }

  function handleReturn() {
    setShowPopView(false)
    setErrorMessage(' ');
  }

  return (
    <>
      <HeaderHomeColab />
      <Container className='containerDesktop'>
        <div className='boxContainerDesktop'>
          <div className="headContainerDesktop">
            <h2 className='body-normal text-color-5'>Validação saída de caixas</h2>
            <h1 className='heading-4'>Pedidos de saída pendentes</h1>
          </div>
          <div className="bodyContainerDesktop">
            <div className="tableRequests">
              <table>
                <tbody>
                  {entryRequests.map((aluno, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <p className='body-normal'>{aluno.nome}</p>
                          <p className='body-normal'>
                            <button className='button-7' onClick={() => buttonView(aluno)}>
                              Visualizar
                            </button>
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
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
                      <li><p>Matrícula:</p><p>{selectedAluno.matricula}</p></li>
                      <li><p>Acadêmico:</p><p>{selectedAluno.nome}</p></li>
                      <li><p>Período:</p><p>{selectedAluno.periodo}</p></li>
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
                      {selectedAluno && selectedAluno.movimentacao && (
                        <tbody>
                          {selectedAluno.movimentacao.map((movimentacao, index) => (
                            <tr key={index}>
                              <td>
                                <span>
                                  <p>{movimentacao.family}</p>
                                  <p>{movimentacao.quantity}</p>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
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