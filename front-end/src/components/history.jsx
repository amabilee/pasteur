import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import moment from 'moment';
import Select from 'react-select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './headers/style.css';
import { server } from "../services/server";
import Paginator from '../components/paginator/paginator';

//Import Components
import PopUpSearch from '../components/popSearch';

function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

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
  const [pedidos, setPedidos] = useState([])

  const usersSet = new Set();

  pedidos.forEach(pedido => {
    usersSet.add(pedido.colaborador);
  });

  const users = Array.from(usersSet);


  const HistoryTable = ({ data }) => (
    <table className='table table-sm tableHistory' id="table-history">
      <thead>
        <tr>
          <th scope="col">NOME</th>
          <th scope="col">MATRÍCULA</th>
          <th scope="col">PERÍODO</th>
          <th scope="col">BOX</th>
          <th scope="col">DATA</th>
          <th scope="col">HORA</th>
          <th scope="col">MODALIDADE</th>
          <th scope="col">STATUS</th>
          <th scope="col">COLABORADOR</th>
        </tr>
      </thead>
      <tbody>
        {data && Array.isArray(data) && data.map((movimentacao, index) => (
          <tr key={index}>
            <td>{movimentacao.nomeAluno}</td>
            <td>{movimentacao.matricula}</td>
            <td>{movimentacao.periodoAluno}</td>
            <td>{movimentacao.box}</td>
            <td>{formatarData(movimentacao.createdAt)}</td>
            <td>{formatarHora(movimentacao.createdAt)}</td>
            <td>{movimentacao.tipo}</td>
            <td className={
              movimentacao.status === 'Aprovado' ? 'validado-class' :
                movimentacao.status === 'Reprovado' ? 'invalidado-class' :
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

  useEffect(() => {
    getPedidos(1);
    handleCronologicalResult()
    const addToStaff = () => {
      setStaff(users);
    };
    addToStaff();
  }, []);

  function formatarData(dataMov) {
    const data = new Date(dataMov);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function formatarHora(horaMov) {
    const data = new Date(horaMov);
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  useEffect(() => {
    handleCronologicalResult();
  }, [pedidos]);

  async function getPedidos(pagina) {
    var token = localStorage.getItem("loggedUserToken")
    var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
    var userCargo = infoUsers.cargo
    if (pagina == undefined) {
      pagina == 1
    }
    try {
      const response = await server.get(`/pedido?page=${pagina}`, {
        method: 'GET',
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json",
          "access-level": `${userCargo}`
        }
      })
      setPedidos(response.data.pedidos)
      setTotalPages(response.data.pagination.totalPages)
    } catch (e) {
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

  //Pesquisa Historico

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  };

  function handleSearchCategoryChange(e) {
    setSearchCategory(e.target.value);
  };

  function handleSearchSimple() {
    const normalizedSearchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const resultadosFiltrados = pedidos.filter(movimentacao => {
      if (searchCategory === 'Cronológico' || searchTerm === '') {
        return true;
      }
      switch (searchCategory) {
        case 'Nome':
          console.log('nome')
          return movimentacao.nomeAluno.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
        case 'Matrícula':
          return String(movimentacao.matricula).includes(searchTerm);
        case 'Período':
          return String(movimentacao.periodoAluno).includes(searchTerm);
        case 'Box':
          return String(movimentacao.box).includes(searchTerm);
        case 'Status':
          return movimentacao.status.toLowerCase().includes(searchTerm.toLowerCase());
        case 'Colaborador':
          return movimentacao.colaborador.toLowerCase().includes(searchTerm.toLowerCase());
        case 'Modalidade':
          const modalidadeLowerCase = movimentacao.tipo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const searchTermLowerCase = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return modalidadeLowerCase.includes(searchTermLowerCase);
        default:
          return true;
      }
    });

    handleSearchResult(resultadosFiltrados);
  }

  function handleSearchAdvanced() {
    const base = { nomeAluno: '', matriculaAluno: '', periodoAluno: '', boxAluno: '', colaborador: '', createdAt: '' };

    const filterConditions = [
      { key: 'nomeAluno', value: alunoName_his.toLowerCase(), condition: alunoName_his !== base.nomeAluno },
      { key: 'matricula', value: alunoMatricula_his, condition: alunoMatricula_his !== base.matriculaAluno },
      { key: 'periodoAluno', value: alunoPeriodo_his, condition: alunoPeriodo_his !== base.periodoAluno },
      { key: 'box', value: alunoBox_his, condition: alunoBox_his !== base.boxAluno },
      { key: 'tipo', value: tipo_his, condition: tipo_his?.length >= 3 },
      { key: 'status', value: status_his, condition: status_his?.length >= 3 },
      { key: 'createdAt', value: date_his, condition: date_his !== base.date && date_his?.includes('-') },
    ];

    const filteredConditions = filterConditions.filter(({ condition }) => condition);
    let keys = filteredConditions.map(({ key }) => key);
    let values = filteredConditions.map(({ value }) => String(value).toLowerCase());

    let result = [];
    let search = [];

    if (colabName_his && colabName_his.value !== undefined) {
      keys.push('colaborador');
      values.push(colabName_his.value.toLowerCase());
      setColaboradorName(colabName_his.value);
    }

    if (filteredConditions.some(({ key }) => key === 'createdAt')) {
      const [start, end] = date_his.split('-').map(d => d.trim());
      search = pedidos.filter(e => isDateInRange(e['createdAt'], start, end));
      keys.splice(keys.indexOf('createdAt'), 1);
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

    console.log(keys);
    console.log(values);
    console.log(result);
    handleSearchResult(result);
  }


  function isDateInRange(date, start, end) {
    const data = new Date(date);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    `${dia}/${mes}/${ano}`;
    var dateObj = moment(`${dia}/${mes}/${ano}`, ['DD/MM/YYYY'], true);
    var startDateObj = moment(start, ['DD/MM/YYYY'], true);
    var endDateObj = moment(end, ['DD/MM/YYYY'], true);
    return dateObj.isSameOrAfter(startDateObj) && dateObj.isSameOrBefore(endDateObj);
  }


  const handleCronologicalResult = () => {
    const sortedPedidos = pedidos.slice().sort((a, b) => {
      const dateA = new Date(a.CreatedAt);
      const dateB = new Date(b.CreatedAt);
      return dateB - dateA;
    });
    setResultadosPesquisa(sortedPedidos);
  };

  function handleSearchResult(result) {
    const pedidosCronologicos = result.sort((a, b) => {
      const dateTimeA = `${a.data} ${a.hora}`;
      const dateTimeB = `${b.data} ${b.hora}`;
      const dateObjectA = new Date(dateTimeA.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
      const dateObjectB = new Date(dateTimeB.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
      return dateObjectB - dateObjectA;
    });
    setResultadosPesquisa(pedidosCronologicos);
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
      setDate(newValue);
      console.log(date_his)
    };
    dateFilterInput.on('apply.daterangepicker', function (ev, picker) {
      const newDateValue = `${picker.startDate.format('DD/MM/YYYY')} - ${picker.endDate.format('DD/MM/YYYY')}`;
      updateDateValue(newDateValue);
    });
    dateFilterInput.on('cancel.daterangepicker', function () {
      updateDateValue('');
    });
  });


  const optionsColaborador = staff.map(e => ({
    label: e,
    value: e,
  }));

  //Paginação
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(page)
    getPedidos(page)
  };

  function detectBoxEntry(e) {
    setAlunoBox(e.target.value.replace(/[^0-9]/g, ''));
  }

  function detectMatriculaEntry(e) {
    setAlunoMatricula(e.target.value.replace(/[^0-9]/g, ''));
  }

  useEffect(() => {
    console.log(date_his)
  }, [date_his]);

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
        <div className="paginator-component">
          <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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
                  <input placeholder='Intervalo de tempo' type="text" className='form-1' name="datefilter" value={date_his} onChange={(e) => setDate(e.target.value)} style={{ width: '220px', marginRight: '20px' }} />
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
                    <option>Reprovado</option>
                    <option>Aprovado</option>
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
                  <input placeholder='Matrícula do aluno...' className='form-1' value={alunoMatricula_his} onChange={(e) => detectMatriculaEntry(e)} type='text' style={{ width: '220px', marginRight: '20px' }} />
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
                  <input placeholder='Box do aluno...' className='form-1' value={alunoBox_his} onChange={(e) => detectBoxEntry(e)} type='text' />
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