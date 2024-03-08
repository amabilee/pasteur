import React, { useState, useEffect } from 'react';
import HeaderHomeAluno from '../../components/headers/alunoHomeIndex'
import { Container } from 'react-bootstrap'
import entryIcon from '../../assets/aluno/entryIcon.svg'
import exitIcon from '../../assets/aluno/exitIcon.svg'
import arrowIcon from '../../assets/aluno/arrow.svg'
import './style.css';
import { useNavigate } from 'react-router-dom';

function HomeAluno() {
  const navigate = useNavigate();
  const [nomeAluno, setNomeAluno] = useState('');
  const [matriculaAluno, setMatriculaAluno] = useState('');
  var infoUsers = {}
  var pedidos = [
    { id: 1, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
    { id: 2, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
    { id: 3, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: true, hora: '06:19', data: '12/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
    { id: 4, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: true, hora: '06:19', data: '14/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
    { id: 5, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
    { id: 6, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
    { id: 7, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
    { id: 8, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' },
    { id: 9, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: 'Cirúrgica', qnt_itens: '20' }
  ]

  useEffect(() => {
    let newObject = window.localStorage.getItem("loggedUser");
    infoUsers = (JSON.parse(newObject));
    console.log(infoUsers)
    setNomeAluno(infoUsers.nome.split(' ')[0])
    setMatriculaAluno(infoUsers.matricula)
  }, []);

  function navigateToEntryAluno() {
    navigate('/entry-aluno')
  }

  function navigateToExitAluno() {
    navigate('/exit-aluno')
  }

  function navigateToSignatureAluno() {
    navigate('/signature-aluno')
  }

  const matriculaDesejada = matriculaAluno;
  var pedidosFiltrados = pedidos.filter(pedido => pedido.matricula_aluno === matriculaDesejada && !pedido.assinatura);
  var quantidadeAssinaturasPendentes = pedidosFiltrados.length;

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