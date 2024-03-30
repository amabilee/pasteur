import React, { useState, useEffect } from 'react';
import HeaderHomeAluno from '../../components/headers/alunoHomeIndex'
import { Container } from 'react-bootstrap'
import entryIcon from '../../assets/aluno/entryIcon.svg'
import exitIcon from '../../assets/aluno/exitIcon.svg'
import arrowIcon from '../../assets/aluno/arrow.svg'
import { server } from "../../services/server";
import './style.css';
import { useNavigate } from 'react-router-dom';

function HomeAluno() {
  const navigate = useNavigate();
  const [nomeAluno, setNomeAluno] = useState('');
  const [matriculaAluno, setMatriculaAluno] = useState('');
  const [quantidadeAssinaturasPendentes, setQuantidadeAssinaturasPendentes] = useState(0);
  var infoUsers = {}
  var pedidos = []

  useEffect(() => {
    infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
    console.log(infoUsers)
    setNomeAluno(infoUsers.NomeUser.split(' ')[0])
    getPedidos()
  }, []);

  async function getPedidos() {
    var token = localStorage.getItem("loggedUserToken")
    try {
      const response = await server.get('/pedido', {
        method: 'GET',
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json"
        }
      })
      pedidos = response.data
      let matricula = Number(infoUsers.matricula)
      let pedidoFiltrados = response.data.filter(pedido => pedido.matricula === matricula && !pedido.assinatura)
      setQuantidadeAssinaturasPendentes(pedidoFiltrados.length)
    } catch (e) {
      console.error(e)
    }
  }

  function navigateToEntryAluno() {
    navigate('/entry-aluno')
  }

  function navigateToExitAluno() {
    navigate('/exit-aluno')
  }

  function navigateToSignatureAluno() {
    navigate('/signature-aluno')
  }

  return (
    <>
      <HeaderHomeAluno />
      <Container className='containerMobileHome'>
        <h1 className='heading-1'>Olá, {nomeAluno} !</h1>
        <h3 className='body-light'>Seja bem-vindo.</h3>
        <div className="cardsSelect">
          <h2 className='body-medium'>Registrar pedidos</h2>
          <div className="cardsPedidos">
            <div className="entryCardBox" onClick={navigateToEntryAluno}>
              <div className="entryCardBoxIcon">
                <img src={entryIcon} />
              </div>
              <p className='text-color-6 body-normal'>Pedido <br />de entrada</p>
            </div>
            <div className="exitCardBox" onClick={navigateToExitAluno}>
              <div className="exitCardBoxIcon">
                <img src={exitIcon} />
              </div>
              <p className='text-color-6 body-normal'>Pedido <br />de saída</p>
            </div>
          </div>
          <h2 className='body-medium'>Assinaturas</h2>
          <div className="cardAssinatura" onClick={navigateToSignatureAluno}>
            <div className="cardAssinaturaContent">
              <p className='heading-1 text-color-7'>{quantidadeAssinaturasPendentes}</p>
              <div className="cardAssinaturaLine"></div>
              <p className='body-normal'>Assinaturas pendentes</p>
            </div>
            <button onClick={navigateToSignatureAluno}><img src={arrowIcon}></img></button>
          </div>
        </div>
      </Container>
    </>
  )
}

export default HomeAluno
