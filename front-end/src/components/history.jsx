import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import moment from 'moment';
import Select from 'react-select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './headers/style.css';

//Import Components
import Title from '../components/Title';
import PopUpSearch from '../components/popSearch';
const HistoryTable = ({ data }) => (
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
      {data.map((movimentacao, index) => (
        <tr key={index}>
          <td>{movimentacao.nome}</td>
          <td>{movimentacao.matricula}</td>
          <td>{movimentacao.periodo}</td>
          <td>{movimentacao.box}</td>
          <td>{movimentacao.hora}</td>
          <td>{movimentacao.data}</td>
          <td>{movimentacao.tipo}</td>
          <td className={
            movimentacao.status === 'Validado' ? 'validado-class' :
              movimentacao.status === 'Invalidado' ? 'invalidado-class' :
                movimentacao.status === 'Pendente' ? 'pendente-class' :
                  ''
          }>
            {movimentacao.status}
          </td>
          <td>{movimentacao.colaborador}</td>
        </tr>
      ))}

    </tbody>
  </table>
);

function History() {
  const [showPopSearch, setShowPopSearch] = useState(false);
  const [searchCategory, setSearchCategory] = useState('Cronológico');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
  const [resultadosPesquisaCronologico, setResultadosPesquisaCronologico] = useState([]);
  const [alunoName_his, setAlunoName] = useState('');
  const [alunoMatricula_his, setAlunoMatricula] = useState('');
  const [alunoPeriodo_his, setAlunoPeriodo] = useState('');
  const [alunoBox_his, setAlunoBox] = useState('');
  const [colabName_his, setColabName] = useState(null);
  const [tipo_his, setTipo] = useState('');
  const [date_his, setDate] = useState('');
  const [status_his, setStatus] = useState('');
  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: "white", color: "black", borderRadius: '10px' } })

  var history = [
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

  var staff = [
    { nome: 'Ana Silva', matricula: '14803291', email: 'example@website.com', senha: '123' },
    { nome: 'Paulo Oliveira', matricula: '21506783', email: 'ana.silva@email.com', senha: '456' },
    { nome: 'Rodrigo Santos', matricula: '18954374', email: 'carlos.cost@gmail.com', senha: '789' },
    { nome: 'Camila Lima', matricula: '30567856', email: 'fernanda.lima@hotmail.com', senha: 'abc' },
    { nome: 'Renato Alves', matricula: '12675429', email: 'rafaela.santos@gmail.com', senha: 'xyz' },
    { nome: 'Juliana Costa', matricula: '43219837', email: 'gabriel.souza@yahoo.com', senha: '987' },
    { nome: 'Carlos Oliveira', matricula: '56789045', email: 'patricia.oliveira@mail.com', senha: '654' },
    { nome: 'Mariana Santos', matricula: '30987612', email: 'vinicius.pereira@gmail.com', senha: '321' },
    { nome: 'Pedro Almeida', matricula: '16543298', email: 'larissa.alves@hotmail.com', senha: 'aaa' },
    { nome: 'Lucas Rodrigues', matricula: '54321678', email: 'roberto.lima@mail.com', senha: 'bbb' },
    { nome: 'Fernanda Silva', matricula: '87654321', email: 'juliana.pereira@yahoo.com', senha: 'ccc' },
    { nome: 'Márcia Oliveira', matricula: '98765432', email: 'pedro.santos@gmail.com', senha: 'ddd' },
    { nome: 'Ricardo Almeida', matricula: '23456789', email: 'camila.costa@mail.com', senha: 'eee' },
    { nome: 'Fernanda Costa', matricula: '67890123', email: 'lucas.santos@hotmail.com', senha: 'fff' },
    { nome: 'Renato Santos', matricula: '12345678', email: 'isabela.lima@gmail.com', senha: 'ggg' },
    { nome: 'Camila Lima', matricula: '89012345', email: 'andre.pereira@mail.com', senha: 'hhh' },
    { nome: 'Lucas Oliveira', matricula: '45678901', email: 'aline.oliveira@yahoo.com', senha: 'iii' },
    { nome: 'Mariana Costa', matricula: '23456789', email: 'thiago.alves@mail.com', senha: 'jjj' },
    { nome: 'Pedro Almeida', matricula: '90123456', email: 'marina.costa@hotmail.com', senha: 'kkk' }
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

  //Pesquisa Historico

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  };

  function handleSearchCategoryChange(e) {
    setSearchCategory(e.target.value);
  };

  useEffect(() => {
    handleCronologicalResult()
    setComponentData()
  }, []);

  function handleSearchSimple() {
    const normalizedSearchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const resultadosFiltrados = history.filter(aluno => {
      if (searchCategory === 'Cronológico' || searchTerm === '') {
        return true;
      }
      switch (searchCategory) {
        case 'Nome':
          return aluno.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
        case 'Matrícula':
          return aluno.matricula.includes(searchTerm);
        case 'Período':
          return aluno.periodo.includes(searchTerm);
        case 'Box':
          return aluno.box.includes(searchTerm);
        case 'Hora':
          return aluno.hora.includes(searchTerm);
        case 'Data':
          return aluno.data.includes(searchTerm);
        case 'Status':
          return aluno.status.toLowerCase().includes(searchTerm.toLowerCase());
        case 'Colaborador':
          return aluno.colaborador.toLowerCase().includes(searchTerm.toLowerCase());
        case 'Tipo':
          return aluno.tipo.toLowerCase().includes(searchTerm.toLowerCase());
        default:
          return true;
      }
    });

    handleSearchResult(resultadosFiltrados);
  }

  function handleSearchAdvanced() {
    const base = { alunoName: '', alunoMatricula: '', alunoPeriodo: '', alunoBox: '', date: '' };

    const filterConditions = [
      { key: 'nome', value: alunoName_his.toLowerCase(), condition: alunoName_his !== base.alunoName },
      { key: 'matricula', value: alunoMatricula_his, condition: alunoMatricula_his !== base.alunoMatricula },
      { key: 'periodo', value: alunoPeriodo_his, condition: alunoPeriodo_his !== base.alunoPeriodo },
      { key: 'box', value: alunoBox_his, condition: alunoBox_his !== base.alunoBox },
      { key: 'colaborador', value: colabName_his, condition: colabName_his?.length >= 2 },
      { key: 'tipo', value: tipo_his, condition: tipo_his?.length >= 3 },
      { key: 'status', value: status_his, condition: status_his?.length >= 3 },
      { key: 'data', value: date_his, condition: date_his !== base.date && date_his?.includes('-') },
    ];

    const filteredConditions = filterConditions.filter(({ condition }) => condition);
    const keys = filteredConditions.map(({ key }) => key);
    const values = filteredConditions.map(({ value }) => String(value).toLowerCase());

    let result = [];
    let search = [];

    if (filteredConditions.some(({ key }) => key === 'data')) {
      const [start, end] = date_his.split('-').map(d => d.trim());
      search = history.filter(e => isDateInRange(e['data'], start, end));
      keys.splice(keys.indexOf('data'), 1);
      result = search.filter(e => keys.every(key => {
        const value = String(e[key]).toLowerCase();
        return values.some(val => value.includes(val));
      }));
    }
    else {
      result = history.filter(e => keys.every(key => {
        const value = String(e[key]).toLowerCase();
        return values.some(val => value.includes(val));
      }));
    }

    handleSearchResult(result);
  }
  
  function isDateInRange(date, start, end) {
    console.log('Input Date:', date);
    console.log('Start Date:', start);
    console.log('End Date:', end);
    var dateObj = moment(date, ['DD/MM/YYYY'], true);
    var startDateObj = moment(start, ['DD/MM/YYYY'], true);
    var endDateObj = moment(end, ['DD/MM/YYYY'], true);
    return dateObj.isSameOrAfter(startDateObj) && dateObj.isSameOrBefore(endDateObj);
  }

  function handleCronologicalResult() {
    const sortedResultados = history.sort((a, b) => {
      const dateTimeA = `${a.data} ${a.hora}`;
      const dateTimeB = `${b.data} ${b.hora}`;
      const dateObjectA = new Date(dateTimeA.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
      const dateObjectB = new Date(dateTimeB.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
      return dateObjectB - dateObjectA;
    });

    setResultadosPesquisa(sortedResultados);
  }

  function handleSearchResult(result) {
    const sortedResultados = result.sort((a, b) => {
      const dateTimeA = `${a.data} ${a.hora}`;
      const dateTimeB = `${b.data} ${b.hora}`;
      const dateObjectA = new Date(dateTimeA.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')); // Convert to 'YYYY-MM-DD'
      const dateObjectB = new Date(dateTimeB.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
      return dateObjectB - dateObjectA;
    });
    setResultadosPesquisa(sortedResultados);
    openSnackBarMessage()
    if (result.length === 0) {
      setSnackBarMessage('Não foram encontrados resultados')
      setSnackBarStyle({ sx: { background: "#BE5353", color: "white", borderRadius: '15px' } })
    } else {
      setSnackBarMessage('Pesquisa realizada com sucesso')
      setSnackBarStyle({ sx: { background: "#79B874", color: "white", borderRadius: '15px' } })
    }
    returnSearch()
  }

  function returnSearch() {
    setShowPopSearch(false)
    setAlunoName('');
    setAlunoMatricula('');
    setAlunoPeriodo('');
    setAlunoBox('');
    setColabName();
    setTipo('');
    setStatus('');
    setDate('');
    setSearchCategory('Cronológico');
    setSearchTerm('');
  }

  // Components

  $(function () {
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

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const [titleComponent, setTitleComponent] = useState('')

  function setComponentData() {
    setTitleComponent(['Histórico de Fluxo de Caixas', 'Movimentações'])
  }

  const optionsColaborador = staff.map(e => ({
    label: e.nome,
    value: e.nome,
  }));

  return (
    <>
      <Container className='containerDesktop'>
        <div className='boxContainerDesktop'>
          <div className="headContainerDesktop">
            <Title parentToChild={titleComponent} />
          </div>
          <div className="bodyContainerDesktop">
            <div className="historyContainer">
              <div className="searchBoxHistory">
                <div className="searchBoxInputs">
                  <input type='text' placeholder="Pesquisar por nome, matrícula ..." className='form-3' value={searchTerm} onChange={handleSearchTermChange} />
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
                  <button className='button-11' onClick={() => setShowPopSearch(true)}>Pesquisa avançada</button>
                </div>
              </div>
              <HistoryTable data={resultadosPesquisa} />
            </div>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackBarMessage} message={snackBarMessage} action={alertBox} ContentProps={snackBarStyle}
        />
      </Container>
      <PopUpSearch
        showPopSearch={showPopSearch}
        onClose={returnSearch}
        headerText="Pesquisa avançada"
        sectionOneContent={
          <>
            <div className="searchCardTop">
              <p className='body-medium margin-bottom-20'>Informações da movimentação</p>
              <div className="searchCardTopBox">
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Intervalo temporal</span>
                  <input placeholder='Intervalo de tempo' type="text" className='form-1' name="datefilter" value={date_his} onChange={handleDateChange} style={{ width: '220px', marginRight: '20px' }} />
                </div>
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Colaborador</span>
                  <Select value={colabName_his} onChange={setColabName} options={optionsColaborador} placeholder='Selecione uma opção' className='select1' />
                </div>
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Tipo</span>
                  <select className='form-1' value={tipo_his} onChange={(e) => setTipo(e.target.value)} style={{ width: '220px', marginRight: '20px' }}>
                    <option value='' disabled>Selecionar</option>
                    <option>Entrada</option>
                    <option>Saída</option>
                  </select>
                </div>
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Status</span>
                  <select className='form-1' value={status_his} onChange={(e) => setStatus(e.target.value)} style={{ width: '220px', marginRight: '20px' }}>
                    <option value='' disabled>Selecionar</option>
                    <option>Pendente</option>
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
                  <input placeholder='Nome do aluno...' className='form-1' value={alunoName_his} onChange={(e) => setAlunoName(e.target.value)} type='text' style={{ width: '220px', marginRight: '20px' }} />
                </div>
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Matrícula</span>
                  <input placeholder='Matrícula do aluno...' className='form-1' value={alunoMatricula_his} onChange={(e) => setAlunoMatricula(e.target.value)} type='number' style={{ width: '220px', marginRight: '20px' }} />
                </div>
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Período</span>
                  <select className='form-1' value={alunoPeriodo_his} onChange={(e) => setAlunoPeriodo(e.target.value)} style={{ width: '160px', marginRight: '20px' }}>
                    <option value='' disabled>Selecionar</option>
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
                  <input placeholder='Box do aluno...' className='form-1' value={alunoBox_his} onChange={(e) => setAlunoBox(e.target.value)} type='number' />
                </div>
              </div>
            </div>
          </>
        }
        onSubmit={handleSearchAdvanced}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default History