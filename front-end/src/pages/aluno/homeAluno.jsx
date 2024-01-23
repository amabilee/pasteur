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
  const [showPopAssinatura, setShowPop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  var infoUserLocal = { //valor que vem do login (localStorage)
    matricula: '2345678'
  };

  var infoUsers = //valor do GET aluno
    {
      matricula: '2345678',
      nome: 'Vinícius Freitas',
      periodo: '10',
    }

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
    }
  ]

  function navigateToEntryAluno() { //função para navegar para a tela de pedido de entrada
    navigate('/entry-aluno')
  }
  function navigateToExitAluno() { //função para navegar para a tela de pedido de saída
    navigate('/exit-aluno')
  }

  function navigateToSignatureAluno() { //função para navegar para a tela de pedido de saída
    navigate('/signature-aluno')
  }

  const matriculaDesejada = infoUsers.matricula; // filtragem do pedidos
  var pedidosFiltrados = pedidos.filter(pedido => pedido.matricula === matriculaDesejada && !pedido.assinatura); // filtragem do pedidos
  var quantidadeAssinaturasPendentes = pedidosFiltrados.length; // filtragem do pedidos

  function handleAssinarClick() { //função para detectar quais pedidos foram selecionados para assinar
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    const pedidosSelecionados = [];

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        const pedido = pedidos.find((pedido, pedidoIndex) => pedidoIndex === index);
        if (pedido) {
          pedidosSelecionados.push(pedido);
        }
      }
    });

    if (pedidosSelecionados.length === 0) {
      setErrorMessage('Selecione pelo menos uma checkbox antes de assinar.');
    } else {
      setErrorMessage('');
      console.log('Pedidos selecionados:', pedidosSelecionados); //logica para enviar os pedidos que foram assinados
      setShowPop(false);
    }
  }

  // function showPopAssintaura(){
  //   setErrorMessage('');
  //   setShowPop(true)
  // }

  return (
    <>
      <HeaderHomeAluno />
      <Container className='containerMobileHome'>
        <h1 className='heading-1'>Olá, {infoUsers.nome.split(' ')[0]} !</h1>
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
      {showPopAssinatura && (
        <div className="popUpCancelOperation">
          <div className="popUpAssinaturaCard">
            <p className='heading-4 text-align-center margin-bottom-10'>Pedido com assinaturas<br />pendentes</p>
            <table className='table table-sm tableAssinatura'>
              <thead>
                <tr>
                  <th scope="col">AÇÃO</th>
                  <th scope="col">TIPO</th>
                  <th scope="col">DATA</th>
                </tr>
              </thead>
              <tbody>
                {pedidos
                  .filter((pedido) => !pedido.assinatura)
                  .map((pedido, index) => (
                    <tr key={index}>
                      <td><input type='checkbox' /></td>
                      <td>{pedido.tipo}</td>
                      <td>{pedido.data}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {errorMessage && <p className="error-message-mobile-assinatura">{errorMessage}</p>}
            <div className='popUpAssinaturaButtons'>
              <button
                className='button-2'
                onClick={() => setShowPop(false)}
              > Voltar
              </button>
              <button
                className='button-3'
                onClick={handleAssinarClick}
              > Assinar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HomeAluno