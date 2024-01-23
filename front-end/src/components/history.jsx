import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import './headers/style.css';

function History() {
  const [showPopView, setShowPopView] = useState(false);
  const [searchCategory, setSearchCategory] = useState('Cronológico');
  const [searchTerm, setSearchTerm] = useState('');
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
  const [alunoName, setAlunoName] = useState('');
  const [alunoMatricula, setAlunoMatricula] = useState('');
  const [alunoPeriodo, setAlunoPeriodo] = useState(0);
  const [alunoBox, setAlunoBox] = useState('');
  const [colabName, setColabName] = useState('');
  const [tipo, setTipo] = useState('0');
  const [date, setDate] = useState("");
  const [status, setStatus] = useState('0');
  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: "white", color: "black", borderRadius: '10px' } })

  var history = [ //banco com os dados do historico function getHistorico()
    {
      matricula: '3456789',
      nome: 'Isabela',
      periodo: '8',
      box: '201',
      tipo: 'Saída',
      status: 'Validado',
      colaborador: 'Ana Silva',
      assinatura: true,
      hora: '14:30',
      data: '15/03/2023',
      movimentacao: [
        {
          nome: 'Restauração',
          quant: '15',
        }
      ]
    },
    {
      matricula: '4567890',
      nome: 'Mariana',
      periodo: '12',
      box: '150',
      tipo: 'Entrada',
      status: 'Validado',
      colaborador: 'Paulo Oliveira',
      assinatura: true,
      hora: '09:45',
      data: '22/04/2023',
      movimentacao: [
        {
          nome: 'Limpeza',
          quant: '10',
        }
      ]
    },
    {
      matricula: '5678901',
      nome: 'Carolina',
      periodo: '9',
      box: '195',
      tipo: 'Saída',
      status: 'Pendente',
      colaborador: 'Rodrigo Santos',
      assinatura: false,
      hora: '11:00',
      data: '05/05/2023',
      movimentacao: [
        {
          nome: 'Ortodontia',
          quant: '18',
        }
      ]
    },
    {
      matricula: '6789012',
      nome: 'Fernando',
      periodo: '11',
      box: '162',
      tipo: 'Entrada',
      status: 'Invalidado',
      colaborador: 'Camila Lima',
      assinatura: false,
      hora: '08:15',
      data: '17/06/2023',
      movimentacao: [
        {
          nome: 'Profilaxia',
          quant: '25',
        }
      ]
    },
    {
      matricula: '7890123',
      nome: 'Gabriela',
      periodo: '7',
      box: '175',
      tipo: 'Saída',
      status: 'Validado',
      colaborador: 'Renato Alves',
      assinatura: true,
      hora: '16:30',
      data: '30/07/2023',
      movimentacao: [
        {
          nome: 'Endodontia',
          quant: '12',
        }
      ]
    },
    {
      matricula: '8901234',
      nome: 'Roberto',
      periodo: '10',
      box: '188',
      tipo: 'Entrada',
      status: 'Validado',
      colaborador: 'Juliana Costa',
      assinatura: true,
      hora: '10:45',
      data: '14/08/2023',
      movimentacao: [
        {
          nome: 'Odontopediatria',
          quant: '8',
        }
      ]
    },
    {
      matricula: '9012345',
      nome: 'Amanda',
      periodo: '8',
      box: '203',
      tipo: 'Saída',
      status: 'Pendente',
      colaborador: 'Carlos Oliveira',
      assinatura: false,
      hora: '13:20',
      data: '02/09/2023',
      movimentacao: [
        {
          nome: 'Periodontia',
          quant: '15',
        }
      ]
    },
    {
      matricula: '0123456',
      nome: 'Lucas',
      periodo: '12',
      box: '154',
      tipo: 'Entrada',
      status: 'Pendente',
      colaborador: 'Mariana Santos',
      assinatura: false,
      hora: '09:00',
      data: '18/10/2023',
      movimentacao: [
        {
          nome: 'Cirurgia Oral',
          quant: '22',
        }
      ]
    },
    {
      matricula: '1234567',
      nome: 'Tatiane',
      periodo: '9',
      box: '167',
      tipo: 'Saída',
      status: 'Invalidado',
      colaborador: 'Pedro Almeida',
      assinatura: false,
      hora: '14:10',
      data: '25/11/2023',
      movimentacao: [
        {
          nome: 'Radiologia Odontológica',
          quant: '10',
        }
      ]
    },
    {
      matricula: '2345678',
      nome: 'Vinícius',
      periodo: '10',
      box: '181',
      tipo: 'Entrada',
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
      matricula: '3456789',
      nome: 'Rafaela',
      periodo: '11',
      box: '190',
      tipo: 'Saída',
      status: 'Validado',
      colaborador: 'Fernanda Silva',
      assinatura: true,
      hora: '12:45',
      data: '09/12/2023',
      movimentacao: [
        {
          nome: 'Estética Dental',
          quant: '15',
        }
      ]
    },
    {
      matricula: '4567890',
      nome: 'Leandro',
      periodo: '8',
      box: '168',
      tipo: 'Entrada',
      status: 'Pendente',
      colaborador: 'Márcia Oliveira',
      assinatura: false,
      hora: '07:30',
      data: '22/01/2024',
      movimentacao: [
        {
          nome: 'Implantodontia',
          quant: '18',
        }
      ]
    },
    {
      matricula: '5678901',
      nome: 'Patrícia',
      periodo: '9',
      box: '178',
      tipo: 'Saída',
      status: 'Invalidado',
      colaborador: 'Ricardo Almeida',
      assinatura: false,
      hora: '15:20',
      data: '05/02/2024',
      movimentacao: [
        {
          nome: 'Oclusão',
          quant: '10',
        }
      ]
    },
    {
      matricula: '6789012',
      nome: 'Gustavo',
      periodo: '12',
      box: '195',
      tipo: 'Entrada',
      status: 'Pendente',
      colaborador: 'Fernanda Costa',
      assinatura: false,
      hora: '09:15',
      data: '18/03/2024',
      movimentacao: [
        {
          nome: 'Prótese Dentária',
          quant: '22',
        }
      ]
    },
    {
      matricula: '7890123',
      nome: 'Mariana',
      periodo: '10',
      box: '183',
      tipo: 'Saída',
      status: 'Validado',
      colaborador: 'Renato Santos',
      assinatura: true,
      hora: '17:00',
      data: '30/04/2024',
      movimentacao: [
        {
          nome: 'Odontogeriatria',
          quant: '12',
        }
      ]
    },
    {
      matricula: '8901234',
      nome: 'Rodrigo',
      periodo: '7',
      box: '202',
      tipo: 'Entrada',
      status: 'Validado',
      colaborador: 'Camila Lima',
      assinatura: true,
      hora: '10:30',
      data: '14/05/2024',
      movimentacao: [
        {
          nome: 'Odontologia do Esporte',
          quant: '8',
        }
      ]
    },
    {
      matricula: '9012345',
      nome: 'Isabel',
      periodo: '11',
      box: '157',
      tipo: 'Saída',
      status: 'Pendente',
      colaborador: 'Lucas Oliveira',
      assinatura: false,
      hora: '13:45',
      data: '02/06/2024',
      movimentacao: [
        {
          nome: 'Radiologia Odontológica',
          quant: '15',
        }
      ]
    },
    {
      matricula: '0123456',
      nome: 'Fábio',
      periodo: '9',
      box: '170',
      tipo: 'Entrada',
      status: 'Invalidado',
      colaborador: 'Mariana Costa',
      assinatura: false,
      hora: '09:45',
      data: '18/07/2024',
      movimentacao: [
        {
          nome: 'Odontologia Legal',
          quant: '20',
        }
      ]
    },
    {
      matricula: '1234567',
      nome: 'Renata',
      periodo: '12',
      box: '187',
      tipo: 'Saída',
      status: 'Pendente',
      colaborador: 'Pedro Almeida',
      assinatura: false,
      hora: '14:00',
      data: '25/08/2024',
      movimentacao: [
        {
          nome: 'Endodontia',
          quant: '10',
        }
      ]
    },
    {
      matricula: '2345678',
      nome: 'Vinícius',
      periodo: '10',
      box: '181',
      tipo: 'Entrada',
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
  ];

  var staff = [ //banco com o GET dados dos colaboradores function getStaff()
    {
      nome: 'Ana Silva',
      matricula: '14803291',
      email: 'example@website.com',
      senha: '123'
    },
    {
      nome: 'Paulo Oliveira',
      matricula: '21506783',
      email: 'ana.silva@email.com',
      senha: '456'
    },
    {
      nome: 'Rodrigo Santos',
      matricula: '18954374',
      email: 'carlos.cost@gmail.com',
      senha: '789'
    },
    {
      nome: 'Camila Lima',
      matricula: '30567856',
      email: 'fernanda.lima@hotmail.com',
      senha: 'abc'
    },
    {
      nome: 'Renato Alves',
      matricula: '12675429',
      email: 'rafaela.santos@gmail.com',
      senha: 'xyz'
    },
    {
      nome: 'Juliana Costa',
      matricula: '43219837',
      email: 'gabriel.souza@yahoo.com',
      senha: '987'
    },
    {
      nome: 'Carlos Oliveira',
      matricula: '56789045',
      email: 'patricia.oliveira@mail.com',
      senha: '654'
    },
    {
      nome: 'Mariana Santos',
      matricula: '30987612',
      email: 'vinicius.pereira@gmail.com',
      senha: '321'
    },
    {
      nome: 'Pedro Almeida',
      matricula: '16543298',
      email: 'larissa.alves@hotmail.com',
      senha: 'aaa'
    },
    {
      nome: 'Lucas Rodrigues',
      matricula: '54321678',
      email: 'roberto.lima@mail.com',
      senha: 'bbb'
    },
    {
      nome: 'Fernanda Silva',
      matricula: '87654321',
      email: 'juliana.pereira@yahoo.com',
      senha: 'ccc'
    },
    {
      nome: 'Márcia Oliveira',
      matricula: '98765432',
      email: 'pedro.santos@gmail.com',
      senha: 'ddd'
    },
    {
      nome: 'Ricardo Almeida',
      matricula: '23456789',
      email: 'camila.costa@mail.com',
      senha: 'eee'
    },
    {
      nome: 'Fernanda Costa',
      matricula: '67890123',
      email: 'lucas.santos@hotmail.com',
      senha: 'fff'
    },
    {
      nome: 'Renato Santos',
      matricula: '12345678',
      email: 'isabela.lima@gmail.com',
      senha: 'ggg'
    },
    {
      nome: 'Camila Lima',
      matricula: '89012345',
      email: 'andre.pereira@mail.com',
      senha: 'hhh'
    },
    {
      nome: 'Lucas Oliveira',
      matricula: '45678901',
      email: 'aline.oliveira@yahoo.com',
      senha: 'iii'
    },
    {
      nome: 'Mariana Costa',
      matricula: '23456789',
      email: 'thiago.alves@mail.com',
      senha: 'jjj'
    },
    {
      nome: 'Pedro Almeida',
      matricula: '90123456',
      email: 'marina.costa@hotmail.com',
      senha: 'kkk'
    }
  ]

  const openSnackBarMessage = () => { //funcão para abrir o alerta
    setOpen(true);
  };

  const closeSnackBarMessage = (event, reason) => { //funcão para fechar o alerta
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const alertBox = ( //alertBox do componente de snackBar
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

  function handleSearchTermChange(e) { //função para atualizar o termo de pesquisa
    setSearchTerm(e.target.value);
  };

  function handleSearchCategoryChange(e) { //função para atualizar a categoria de pesquisa selecionada
    setSearchCategory(e.target.value);
  };

  useEffect(() => { //exibir inicialmente os resultados ja em ordem cronologica
    const sortedResultados = history.sort((a, b) => {
      const dateTimeA = `${a.data} ${a.hora}`;
      const dateTimeB = `${b.data} ${b.hora}`;
      return -dateTimeA.localeCompare(dateTimeB);
    });
    setResultadosPesquisa(sortedResultados);
  }, []);

  function handleSearchSimple() { //função para retornar resultados da pesquisa simples
    const resultadosFiltrados = history.filter(aluno => {
      if (searchCategory === 'Cronológico' || searchTerm === '') {
        history.sort((a, b) => {
          const dateTimeA = `${a.data} ${a.hora}`;
          const dateTimeB = `${b.data} ${b.hora}`;
          return -dateTimeA.localeCompare(dateTimeB);
        });
      } else if (searchCategory === 'Nome') {
        return aluno.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      } else if (searchCategory === 'Matrícula') {
        return aluno.matricula.includes(searchTerm);
      } else if (searchCategory === 'Período') {
        return aluno.periodo.includes(searchTerm);
      } else if (searchCategory === 'Box') {
        return aluno.box.includes(searchTerm);
      } else if (searchCategory === 'Hora') {
        return aluno.hora.includes(searchTerm);
      } else if (searchCategory === 'Data') {
        return aluno.data.includes(searchTerm);
      } else if (searchCategory === 'Status') {
        return aluno.status.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchCategory === 'Colaborador') {
        return aluno.colaborador.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchCategory === 'Tipo') {
        return aluno.tipo.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    });
    const sortedResultados = resultadosFiltrados.sort((a, b) => {
      const dateTimeA = `${a.data} ${a.hora}`;
      const dateTimeB = `${b.data} ${b.hora}`;
      return -dateTimeA.localeCompare(dateTimeB);
    });
    setResultadosPesquisa(sortedResultados);
  }

  function handleSearchAdvanced() { //função para retornar resultados da pesquisa
    const base = {
      alunoName: '',
      alunoMatricula: '',
      alunoPeriodo: 0,
      alunoBox: '',
      date: "",
    };

    const keys = [];
    const values = [];
    let result = [];
    let search = [];

    if (alunoName !== base.alunoName) {
      keys.push('nome');
      values.push(alunoName.toLowerCase());
    }
    if (alunoMatricula !== base.alunoMatricula) {
      keys.push('matricula');
      values.push(alunoMatricula);
    }
    if (alunoPeriodo !== base.alunoPeriodo) {
      keys.push('periodo');
      values.push(alunoPeriodo);
    }
    if (alunoBox !== base.alunoBox) {
      keys.push('box');
      values.push(alunoBox);
    }
    if (colabName.length >= 2) {
      keys.push('colaborador');
      values.push(colabName);
    }
    if (tipo.length >= 3) {
      keys.push('tipo');
      values.push(tipo);
    }
    if (status.length >= 3) {
      keys.push('status');
      values.push(status);
    }
    if (date !== base.date) {
      if (date.includes('-')) {
        const [start, end] = date.split('-').map(d => d.trim());
        console.log('Intervalo de datas:', start, end);
        search = history.filter(
          e => isDateInRange(e['data'], start, end)
        );
        result = search.filter(e =>
          keys.every(a => values.map(v => v.toLowerCase()).includes(e[a].toLowerCase()))
        );
      } else {
        result = history.filter(e =>
          keys.every(a => values.map(v => v.toLowerCase()).includes(e[a].toLowerCase()))
        );
      }
    } else {
      result = history.filter(e =>
        keys.every(a => {
          const value = String(e[a]).toLowerCase(); // Converte o valor para string antes de chamar toLowerCase()
          return values.map(v => String(v).toLowerCase()).includes(value);
        })
      );
    }
    console.log(result);
    console.log(keys);
    console.log(values);

    setShowPopView(false);

    const sortedResultados = result.sort((a, b) => {
      const dateTimeA = `${a.data} ${a.hora}`;
      const dateTimeB = `${b.data} ${b.hora}`;
      return -dateTimeA.localeCompare(dateTimeB);
    });

    setResultadosPesquisa(sortedResultados);
    openSnackBarMessage()
    if (sortedResultados.length === 0) {
      setSnackBarMessage('Não foram encontrados resultados')
      setSnackBarStyle({ sx: { background: "#BE5353", color: "white", borderRadius: '15px' } })
    } else {
      setSnackBarMessage('Pesquisa realizada com sucesso')
      setSnackBarStyle({ sx: { background: "#79B874", color: "white", borderRadius: '15px' } })
    }
    returnSearch();
  }

  function isDateInRange(date, start, end) { //funcão para calcular range de datas
    var dateObj = moment(date, ['DD/MM/YYYY'], true);
    var startDateObj = moment(start, ['DD/MM/YYYY'], true);
    var endDateObj = moment(end, ['DD/MM/YYYY'], true);
    return dateObj.isSameOrAfter(startDateObj) && dateObj.isSameOrBefore(endDateObj);
  }

  function returnSearch() { //função para limpar pop up
    setShowPopView(false)
    setAlunoName('');
    setAlunoMatricula('');
    setAlunoPeriodo(0);
    setAlunoBox('');
    setColabName('');
    setTipo(0);
    setStatus('0');
    setDate('');
    setSearchCategory('Cronológico');
    setSearchTerm('');
  }


  $(function () { //componente do seletor de datas
    const dateFilterInput = $('input[name="datefilter"]');

    dateFilterInput.daterangepicker({
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    });

    const updateDateValue = (newValue) => {
      dateFilterInput.val(newValue);
      handleDateChange({ target: { value: newValue } });
    };

    dateFilterInput.on('apply.daterangepicker', function (ev, picker) {
      const newDateValue = `${picker.startDate.format('DD/MM/YYYY')} - ${picker.endDate.format('DD/MM/YYYY')}`;
      updateDateValue(newDateValue);
    });

    dateFilterInput.on('cancel.daterangepicker', function () {
      updateDateValue('');
    });
  });

  const handleDateChange = (e) => { //função para onChange da data
    setDate(e.target.value);
  };

  return (
    <>
      <Container className='containerDesktop'>
        <div className='boxContainerDesktop'>
          <div className="headContainerDesktop">
            <h2 className='body-normal text-color-5'>Movimentações</h2>
            <h1 className='heading-4'>Histórico de Fluxo de Caixas</h1>
          </div>
          <div className="bodyContainerDesktop">
            <div className="historyContainer">
              <div className="searchBoxHistory">
                <div className="searchBoxInputs">
                  <input
                    type='text'
                    placeholder="Pesquisar por nome, matrícula ..."
                    className='form-3'
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                  />
                  <select value={searchCategory} onChange={handleSearchCategoryChange} className='searchBoxSelect'>
                    <option value='Cronológico'>Cronológico</option>
                    <option>Nome</option>
                    <option>Matrícula</option>
                    <option>Período</option>
                    <option>Box</option>
                    <option>Hora</option>
                    <option>Data</option>
                    <option>Status</option>
                    <option>Colaborador</option>
                    <option>Tipo</option>
                  </select>
                </div>
                <div className="searchBoxButtons">
                  <button className='button-10' onClick={handleSearchSimple}>Pesquisar</button>
                  <button className='button-11' onClick={() => setShowPopView(true)}>Pesquisa avançada</button>
                </div>
              </div>
              <table className='table table-sm tableHistory' id="table-history">
                <thead>
                  <tr>
                    <th scope="col">NOME</th>
                    <th scope="col">MATRÍCULA</th>
                    <th scope="col">PERÍODO</th>
                    <th scope="col">BOX</th>
                    <th scope="col">HORA</th>
                    <th scope="col">DATA</th>
                    <th scope="col">TIPO</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">COLABORADOR</th>
                  </tr>
                </thead>
                <tbody>
                  {resultadosPesquisa.map((aluno, index) => (
                    <tr key={index}>
                      <td>{aluno.nome}</td>
                      <td>{aluno.matricula}</td>
                      <td>{aluno.periodo}</td>
                      <td>{aluno.box}</td>
                      <td>{aluno.hora}</td>
                      <td>{aluno.data}</td>
                      <td>{aluno.tipo}</td>
                      <td className={
                        aluno.status === 'Validado' ? 'validado-class' :
                          aluno.status === 'Invalidado' ? 'invalidado-class' :
                            aluno.status === 'Pendente' ? 'pendente-class' :
                              ''
                      }>
                        {aluno.status}
                      </td>
                      <td>{aluno.colaborador}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={closeSnackBarMessage}
          message={snackBarMessage}
          action={alertBox}
          ContentProps={snackBarStyle}
        />
      </Container>
      {showPopView && (
        <div className="popUpSearch">
          <div className="popUpSearchCard">
            <div className="popUpSearchHead">
              <h1 className='heading-4'>Pesquisa avançada<br /><span className='body-normal text-color-5'>Nem todos os campos requerem preenchimento.</span></h1>
              <button className='button-7' onClick={returnSearch}>Voltar</button>
            </div>
            <div className="popUpSearchBody">
              <div className="searchCardTop">
                <p className='body-medium margin-bottom-20'>Informações da movimentação</p>
                <div className="searchCardTopBox">
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Intervalo temporal</span>
                    <input
                      placeholder='Intervalo de tempo'
                      type="text"
                      className='form-1'
                      name="datefilter"
                      value={date}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Colaborador</span>
                    <select
                      className='form-1'
                      value={colabName}
                      onChange={(e) => setColabName(e.target.value)}
                    >
                      <option value='0'>Selecione a família</option>
                      {staff.map((option, index) => (
                        <option key={index} value={option.nome}>
                          {option.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Tipo</span>
                    <select
                      className='form-1'
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                    >
                      <option value="0" disabled>Selecionar</option>
                      <option>Entrada</option>
                      <option>Saída</option>
                    </select>
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Status</span>
                    <select
                      className='form-1'
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="0" disabled>Selecionar</option>
                      <option value='Pendente'>Pendente</option>
                      <option>Invalidado</option>
                      <option>Validado</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="searchCardBottom">
                <p className='body-medium margin-bottom-10'>Informações do aluno</p>
                <div className="searchCardBottomBox">
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Nome</span>
                    <input
                      placeholder='Nome do aluno...'
                      className='form-1'
                      value={alunoName}
                      onChange={(e) => setAlunoName(e.target.value)}
                      type='text'
                    />
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Matrícula</span>
                    <input
                      placeholder='Matrícula do aluno...'
                      className='form-1'
                      value={alunoMatricula}
                      onChange={(e) => setAlunoMatricula(e.target.value)}
                      type='number'
                    />
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Período</span>
                    <select
                      className='form-1'
                      value={alunoPeriodo}
                      onChange={(e) => setAlunoPeriodo(e.target.value)}
                    >
                      <option value='0' disabled>Selecionar</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Box de armazenamento</span>
                    <input
                      placeholder='Box do aluno...'
                      className='form-1'
                      value={alunoBox}
                      onChange={(e) => setAlunoBox(e.target.value)}
                      type='number'
                    />
                  </div>
                </div>
              </div >
            </div >
            <div className='popUpViewButtons'>
              <button
                className='button-10 margin-right-30'
                disabled={false}
                onClick={handleSearchAdvanced}
                variant="outlined"
              > Pesquisar
              </button>
            </div>
          </div >
        </div >
      )
      }
    </>
  )
}

export default History