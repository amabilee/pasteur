import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import moment from 'moment';
import Select from 'react-select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './headers/style.css';

//Import Components
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
        <th scope="col">MODALIDADE</th>
        <th scope="col">STATUS</th>
        <th scope="col">COLABORADOR</th>
      </tr>
    </thead>
    <tbody>
      {data.map((movimentacao, index) => (
        <tr key={index}>
          <td>{movimentacao.nome_aluno}</td>
          <td>{movimentacao.matricula_aluno}</td>
          <td>{movimentacao.periodo_aluno}</td>
          <td>{movimentacao.box_aluno}</td>
          <td>{movimentacao.hora}</td>
          <td>{movimentacao.data}</td>
          <td>{movimentacao.modalidade}</td>
          <td className={
            movimentacao.status === 'Validado' ? 'validado-class' :
              movimentacao.status === 'Inválido' ? 'invalidado-class' :
                movimentacao.status === 'Pendente' ? 'pendente-class' :
                  ''
          }>
            {movimentacao.status}
          </td>
          <td>{movimentacao.nome_colab}</td>
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
  const [staff, setStaff] = useState([]);


  const [alunoName_his, setAlunoName] = useState('');
  const [alunoMatricula_his, setAlunoMatricula] = useState('');
  const [alunoPeriodo_his, setAlunoPeriodo] = useState('');
  const [periodo_his, setPeriodo] = useState('');
  const [alunoBox_his, setAlunoBox] = useState('');
  const [colabName_his, setColabName] = useState();
  const [colaborador_his, setColaboradorName] = useState();
  const [tipo_his, setTipo] = useState('');
  const [date_his, setDate] = useState('');
  const [status_his, setStatus] = useState('');


  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: "white", color: "black", borderRadius: '10px' } })

  var pedidos = [
    { id: 1, matricula_aluno: 'aluno', nome_aluno: 'Ana', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Inválido', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 2, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Validado', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '11/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 3, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: true, hora: '12:19', data: '12/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 4, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Entrada', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: true, hora: '06:19', data: '14/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 5, matricula_aluno: 'aluno', nome_aluno: 'Marcela', periodo_aluno: '10', box_aluno: '181', modalidade: 'Entrada', status: 'Inválido', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '19:19', data: '11/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 6, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Entrada', status: 'Validado', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 7, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Inválido', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '23:19', data: '11/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 8, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Pendente', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '06:19', data: '14/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] },
    { id: 9, matricula_aluno: 'aluno', nome_aluno: 'Vinícius', periodo_aluno: '10', box_aluno: '181', modalidade: 'Saída', status: 'Validado', nome_colab: 'Lucas Rodrigues', assinatura: false, hora: '08:19', data: '11/02/2023', nome_familia: ['Cirúrgica', 'Dentística'], qnt_itens: ['20', '18'] }
  ]

  const users = [
    {
      id: 1,
      matricula: 'aluno',
      senha: '123',
      nome: 'Marcos Santos',
      cargo: 'aluno'
    },
    {
      id: 2,
      matricula: 'colab',
      senha: '123',
      nome: 'Ana Souza',
      cargo: 'colaborador',
    },
    {
      id: 3,
      matricula: 'admin',
      senha: '123',
      nome: 'João Marques',
      cargo: 'administrador'
    }
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
    const addToStaff = () => {
      const selectedUsers = users.filter(user => user.cargo === 'colaborador');
      setStaff(selectedUsers);
    };
    addToStaff();
  }, []);

  function handleSearchSimple() {
    const normalizedSearchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const resultadosFiltrados = pedidos.filter(movimentacao => {
      if (searchCategory === 'Cronológico' || searchTerm === '') {
        return true;
      }
      switch (searchCategory) {
        case 'Nome':
          return movimentacao.nome_aluno.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
        case 'Matrícula':
          return movimentacao.matricula_aluno.includes(searchTerm);
        case 'Período':
          return movimentacao.periodo_aluno.includes(searchTerm);
        case 'Box':
          return movimentacao.box_aluno.includes(searchTerm);
        case 'Status':
          return movimentacao.status.toLowerCase().includes(searchTerm.toLowerCase());
        case 'Colaborador':
          return movimentacao.nome_colab.toLowerCase().includes(searchTerm.toLowerCase());
        case 'Modalidade':
          return movimentacao.modalidade.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchTerm.toLowerCase());
        default:
          return true;
      }
    });

    handleSearchResult(resultadosFiltrados);
  }

  function handleSearchAdvanced() {
    const base = { nomeAluno: '', matriculaAluno: '', periodoAluno: '', boxAluno: '', nomeColab: '', data: '' };

    const filterConditions = [
      { key: 'nome_aluno', value: alunoName_his.toLowerCase(), condition: alunoName_his !== base.nomeAluno },
      { key: 'matricula_aluno', value: alunoMatricula_his, condition: alunoMatricula_his !== base.matriculaAluno },
      { key: 'periodo_aluno', value: alunoPeriodo_his, condition: alunoPeriodo_his !== base.periodoAluno },
      { key: 'box_aluno', value: alunoBox_his, condition: alunoBox_his !== base.boxAluno },
      { key: 'modalidade', value: tipo_his, condition: tipo_his?.length >= 3 },
      { key: 'status', value: status_his, condition: status_his?.length >= 3 },
      { key: 'data', value: date_his, condition: date_his !== base.date && date_his?.includes('-') },
    ];

    const filteredConditions = filterConditions.filter(({ condition }) => condition);
    let keys = filteredConditions.map(({ key }) => key);
    let values = filteredConditions.map(({ value }) => String(value).toLowerCase());

    let result = [];
    let search = [];

    if (colabName_his && colabName_his.value !== undefined) {
      keys.push('nome_colab')
      values.push(colabName_his.value)
      setColaboradorName(colabName_his.value)
    }

    // if (alunoPeriodo_his !== '') {
    //   keys.push('periodo_aluno')
    //   values.push(alunoPeriodo_his)
    //   setPeriodo(alunoPeriodo_his)
    // }

    if (filteredConditions.some(({ key }) => key === 'data')) {
      const [start, end] = date_his.split('-').map(d => d.trim());
      search = pedidos.filter(e => isDateInRange(e['data'], start, end));
      keys.splice(keys.indexOf('data'), 1);
      result = search.filter(e => keys.every(key => {
        const value = String(e[key]).toLowerCase();
        return values.some(val => value.includes(val));
      }));
    } else {
      result = pedidos.filter(e => keys.every(key => {
        const value = String(e[key]).toLowerCase();
        return values.some(val => value.includes(val));
      }));
    }

    // console.log(keys)
    // // console.log(colaborador_his)
    // console.log(colabName_his)
    // console.log(values)
    // console.log(result)

    handleSearchResult(result);
  }

  function isDateInRange(date, start, end) {
    var dateObj = moment(date, ['DD/MM/YYYY'], true);
    var startDateObj = moment(start, ['DD/MM/YYYY'], true);
    var endDateObj = moment(end, ['DD/MM/YYYY'], true);
    return dateObj.isSameOrAfter(startDateObj) && dateObj.isSameOrBefore(endDateObj);
  }

  function handleCronologicalResult() {
    const sortedResultados = pedidos.sort((a, b) => {
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

  const optionsColaborador = staff.map(e => ({
    label: e.nome,
    value: e.nome,
  }));

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
                  <input type='text' placeholder="Pesquisar por nome, matrícula ..." className='form-3' value={searchTerm} onChange={handleSearchTermChange} />
                  <select value={searchCategory} onChange={handleSearchCategoryChange} className='searchBoxSelect'>
                    <option value='Cronológico'>Cronológico</option>
                    <option>Nome</option>
                    <option>Matrícula</option>
                    <option>Período</option>
                    <option>Box</option>
                    <option>Status</option>
                    <option>Colaborador</option>
                    <option>Modalidade</option>
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
                  <span className='body-normal margin-bottom-5'>Modalidade</span>
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
                    <option>Inválido</option>
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