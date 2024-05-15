import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './headers/style.css';
import { server } from "../services/server";
import Paginator from '../components/paginator/paginator';
import ordenarIcon from '../assets/ordenarIcon.svg'
import PropTypes from 'prop-types';

//Import Components
import PopUpSearch from '../components/popSearch';

function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [paginatorStatus, setPaginatorStatus] = useState(false)
  const [orderModalidadeUsers, setOrderModalidadePedido] = useState(1)
  const [orderStatusUsers, setOrderStatusUsers] = useState(3)
  const [searchData, setSearchData] = useState({ term: '', category: 'Selecione' })

  const [showPopSearch, setShowPopSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);

  const [nomeAluno_his, setAlunoName] = useState('');
  const [matricula_his, setAlunoMatricula] = useState('');
  const [periodoAluno_his, setAlunoPeriodo] = useState('');
  const [box_his, setAlunoBox] = useState('');
  const [colaborador_his, setColabName] = useState('');
  const [tipo_his, setTipo] = useState('');
  const [createdAt_his, setDate] = useState('');
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


  const HistoryTable = ({ data, onOrdenarModalidade, onOrdenarStatus }) => (
    <table className='table table-sm tableHistory' id="table-history">
      <thead>
        <tr>
          <th scope="col">NOME</th>
          <th scope="col">MATRÍCULA</th>
          <th scope="col">PERÍODO</th>
          <th scope="col">BOX</th>
          <th scope="col">DATA</th>
          <th scope="col">HORA</th>
          <th scope="col" onClick={() => onOrdenarModalidade()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>MODALIDADE<img className='ordenarIcon' src={ordenarIcon} /></th>
          <th scope="col" onClick={() => onOrdenarStatus()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>STATUS<img className='ordenarIcon' src={ordenarIcon} /></th>
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
            <td className={getStatusClass(movimentacao.status)}>
              {movimentacao.status}
            </td>
            <td>{movimentacao.colaborador}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const getStatusClass = (status) => {
    switch (status) {
      case 'Aprovado':
        return 'validado-class';
      case 'Reprovado':
        return 'invalidado-class';
      case 'Pendente':
        return 'pendente-class';
      default:
        return '';
    }
  };

  HistoryTable.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        nomeAluno: PropTypes.string,
        matricula: PropTypes.number,
        periodoAluno: PropTypes.number,
        box: PropTypes.string,
        createdAt: PropTypes.string,
        tipo: PropTypes.string,
        status: PropTypes.string,
        colaborador: PropTypes.string,
      })
    ).isRequired,
    onOrdenarModalidade: PropTypes.func.isRequired,
    onOrdenarStatus: PropTypes.func.isRequired,
  };

  useEffect(() => {
    getPedidos(1);
    handleCronologicalResult()
    setOrderStatusUsers(2)
    setOrderModalidadePedido(2)
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

  async function getPedidos(pagina, filtro = '') {
    var token = localStorage.getItem("loggedUserToken")
    var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
    var userCargo = infoUsers.cargo
    if (pagina == undefined) {
      pagina == 1
    }
    try {
      const response = await server.get(`/pedido?page=${pagina}${filtro}`, {
        method: 'GET',
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json",
          "access-level": `${userCargo}`
        }
      })
      setPedidos(response.data.pedidos)
      let pagesTotal = response.data.pagination.totalPages
      if (pagesTotal <= 0) {
        setTotalPages(1);
      } else {
        setTotalPages(pagesTotal);
      }
      if (pagesTotal <= currentPage - 1) {
        setCurrentPage(1)
      }
      if (pagesTotal === 1) {
        try {
          const responseOnePage = await server.get(`/pedido?page=1${filtro}`, {
            method: 'GET',
            headers: {
              "Authorization": `${token}`,
              "Content-Type": "application/json",
              "access-level": `${userCargo}`
            }
          })
          setPedidos(responseOnePage.data.pedidos)
          setCurrentPage(1)
        } catch (e) {
          console.error(e)
        }
      }
      if (pagesTotal != 0 && currentPage == 1) {
        openSnackBarMessage()
        setSnackBarMessage('Correspondências encontradas')
        setSnackBarStyle({ sx: { background: "#79B874", color: "white", borderRadius: '15px' } })
      } else if (pagesTotal == 0) {
        openSnackBarMessage()
        setSnackBarMessage('Não foram encontradas correspondências')
        setSnackBarStyle({ sx: { background: '#BE5353', color: 'white', borderRadius: '15px' } });
      }
      setResultadosPesquisa(response.data.users);
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

  //Snackbar settings
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

  //Pesquisa

  function handleSearchTermChange(e) {
    setSearchData({ ...searchData, term: e.target.value })
  }

  function handleSearchCategoryChange(e) {
    setSearchData({ ...searchData, category: e.target.value })
  }

  function handleSearchSimple(ordenar) {
    let filtro = ''
    switch (searchData.category) {
      case 'Nome':
        filtro = `&nomeAluno=${searchData.term}`
        getPedidos(1, filtro)
        return
      case 'Matrícula':
        filtro = `&matricula=${searchData.term}`
        getPedidos(1, filtro)
        return
      case 'Período':
        filtro = `&periodoAluno=${searchData.term}`
        getPedidos(1, filtro)
        return
      case 'Box':
        filtro = `&box=${searchData.term}`
        getPedidos(1, filtro)
        return
      case 'Colaborador':
        filtro = `&colaborador=${searchData.term}`
        getPedidos(1, filtro)
        return
      default:
        if (ordenar === 1 || ordenar === 2) {
          if (ordenar === 1) {
            switch (orderModalidadeUsers) {
              case 2:
                filtro = `&tipo=Entrada`
                getPedidos(1, filtro)
                return
              case 3:
                filtro = `&tipo=Saída`
                getPedidos(1, filtro)
                return
            }
          } else if (ordenar === 2) {
            switch (orderStatusUsers) {
              case 2:
                filtro = `&status=Pendente`
                getPedidos(1, filtro)
                return
              case 3:
                filtro = `&status=Aprovado`
                getPedidos(1, filtro)
                return
              case 4:
                filtro = `&status=Reprovado`
                getPedidos(1, filtro)
                return
            }
          }
        } else {
          searchData.category = 'Selecione'
        }
        getPedidos(1, filtro)
    }
  }

  function handleSearchAdvanced() {
    const base = { nomeAluno: '', matriculaAluno: '', periodoAluno: '', boxAluno: '', colaborador: '', createdAt: '' };
    const filterConditions = [
      { key: 'nomeAluno', value: nomeAluno_his, condition: nomeAluno_his !== base.nomeAluno },
      { key: 'matricula', value: matricula_his, condition: matricula_his !== base.matriculaAluno },
      { key: 'periodoAluno', value: periodoAluno_his, condition: periodoAluno_his !== base.periodoAluno },
      { key: 'box', value: box_his, condition: box_his !== base.boxAluno },
      { key: 'tipo', value: tipo_his, condition: tipo_his?.length >= 3 },
      { key: 'status', value: status_his, condition: status_his?.length >= 3 },
      { key: 'createdAt', value: createdAt_his, condition: createdAt_his?.length >= 1 },
    ];

    const filteredConditions = filterConditions.filter(({ condition }) => condition);
    let keys = filteredConditions.map(({ key }) => key);
    if (colaborador_his && colaborador_his !== '') {
      keys.push('colaborador');
    }

    if (keys.find(chave => chave === 'createdAt')) {
      if (createdAt_his.includes('-') && createdAt_his.length === 23) {
        let filtro = ''
        if (keys.length >= 1) {
          for (let i = 0; i <= keys.length - 1; i++) {
            var currentKeyDatas = eval(`${keys[i]}_his`)
            filtro += `&${keys[i]}=${currentKeyDatas}`
            setSearchData({ ...searchData, category: filtro })
          }
        }
        getPedidos(1, filtro)
        returnSearch()
      } else {
        setErrorMessage('Insira uma data válida')
      }
    } else {
      let filtro = ''
      if (keys.length >= 1) {
        for (let i = 0; i <= keys.length - 1; i++) {
          var currentKeyData = eval(`${keys[i]}_his`)
          filtro += `&${keys[i]}=${currentKeyData}`
          setSearchData({ ...searchData, category: filtro })
        }
      }
      getPedidos(1, filtro)
      returnSearch()
    }
  }

  const handleCronologicalResult = () => {
    const sortedPedidos = pedidos.slice().sort((a, b) => {
      const dateA = new Date(a.CreatedAt);
      const dateB = new Date(b.CreatedAt);
      return dateB - dateA;
    });
    setResultadosPesquisa(sortedPedidos);
  };


  function returnSearch() {
    setShowPopSearch(false)
    setAlunoName('');
    setAlunoMatricula('');
    setAlunoPeriodo('');
    setAlunoBox('');
    setColabName('');
    setTipo('');
    setStatus('');
    setDate('');
    setErrorMessage('')
  }

  // Components
  $(function () {
    const dateFilterInput = $('input[name="datefilter"]');

    dateFilterInput.daterangepicker({
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear',
        format: 'DD/MM/YYYY',
      },
    });

    const updateDateValue = (newValue) => {
      dateFilterInput.val(newValue);
      setDate(newValue);
      console.log(`Date filter updated: ${newValue}`);
    };

    dateFilterInput.on('click', function () {
      console.log("Date filter input clicked.");
    });

    dateFilterInput.on('apply.daterangepicker', function (ev, picker) {
      const newDateValue = `${picker.startDate.format('DD/MM/YYYY')} - ${picker.endDate.format('DD/MM/YYYY')}`;
      updateDateValue(newDateValue);
    });

    dateFilterInput.on('cancel.daterangepicker', function () {
      updateDateValue('');
    });
  });


  //Paginação

  const handlePageChange = (page) => {
    setCurrentPage(page);
    let filtro = ''
    switch (searchData.category[0]) {
      case 'N':
        filtro = `&nomeAluno=${searchData.term}`
        getPedidos(page, filtro)
        break
      case 'M':
        filtro = `&matricula=${searchData.term}`
        getPedidos(page, filtro)
        break
      case 'P':
        filtro = `&periodoAluno=${searchData.term}`
        getPedidos(page, filtro)
        break
      case 'B':
        filtro = `&box=${searchData.term}`
        getPedidos(page, filtro)
        break
      case 'C':
        filtro = `&colaborador=${searchData.term}`
        getPedidos(page, filtro)
        break
      case '&':
        filtro = searchData.category
        getPedidos(page, filtro)
        break
      default:
        if (orderModalidadeUsers !== 2) {
          switch (orderModalidadeUsers) {
            case 3:
              setOrderStatusUsers(2)
              filtro = `&tipo=Entrada`
              getPedidos(page, filtro)
              break
            case 1:
              filtro = `&tipo=Saída`
              setOrderStatusUsers(2)
              getPedidos(page, filtro)
              break
          }
        } else if (orderStatusUsers !== 2) {
          switch (orderStatusUsers) {
            case 3:
              filtro = `&status=Pendente`
              setOrderModalidadePedido(2)
              getPedidos(page, filtro)
              break
            case 4:
              filtro = `&status=Aprovado`
              setOrderModalidadePedido(2)
              getPedidos(page, filtro)
              break
            case 1:
              filtro = `&status=Reprovado`
              setOrderModalidadePedido(2)
              getPedidos(page, filtro)
              break
          }
        } else {
          setOrderModalidadePedido(2)
          setOrderStatusUsers(2)
          getPedidos(page, filtro)
        }
    }
  };

  //Pesquisa

  function detectBoxEntry(e) {
    setAlunoBox(e.target.value.replace(/[^0-9]/g, ''));
  }

  function detectMatriculaEntry(e) {
    setAlunoMatricula(e.target.value.replace(/[^0-9]/g, ''));
  }

  const handleOrderModalidadePedido = async () => {
    if (orderModalidadeUsers === 1) {
      setOrderModalidadePedido(2)
      setOrderStatusUsers(2)
    } else if (orderModalidadeUsers === 2) {
      setOrderModalidadePedido(3)
      setOrderStatusUsers(2)
    } else if (orderModalidadeUsers === 3) {
      setOrderModalidadePedido(1)
      setOrderStatusUsers(2)
    }
    setSearchData(({ term: '', category: 'Selecione' }))
    handleSearchSimple(1)
  }

  const handleOrderStatusPedido = async () => {
    if (orderStatusUsers === 1) {
      setOrderStatusUsers(2)
      setOrderModalidadePedido(2)
    } else if (orderStatusUsers === 2) {
      setOrderStatusUsers(3)
      setOrderModalidadePedido(2)
    } else if (orderStatusUsers === 3) {
      setOrderStatusUsers(4)
      setOrderModalidadePedido(2)
    } else if (orderStatusUsers === 4) {
      setOrderStatusUsers(1)
      setOrderModalidadePedido(2)
    }
    setSearchData(({ term: '', category: 'Selecione' }))
    handleSearchSimple(2)
  }

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
                  <input type='text' placeholder="Pesquisar por nome, matrícula ..." className='form-3' value={searchData.term} onChange={handleSearchTermChange} />
                  <select value={searchData.category} onChange={handleSearchCategoryChange} className='searchBoxSelect'>
                    <option value='Cronológico'>Cronológico</option>
                    <option>Nome</option>
                    <option>Matrícula</option>
                    <option>Período</option>
                    <option>Box</option>
                    <option>Colaborador</option>
                  </select>
                </div>
                <div className="searchBoxButtons">
                  <button className='button-10' onClick={handleSearchSimple}>Pesquisar</button>
                  <button className='button-11' onClick={() => setShowPopSearch(true)}>Pesquisa avançada</button>
                </div>
              </div>
              <HistoryTable data={resultadosPesquisa} onOrdenarModalidade={handleOrderModalidadePedido} onOrdenarStatus={handleOrderStatusPedido} />
            </div>
          </div>
        </div>
        <div className="paginator-component">
          <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} disabledStatus={paginatorStatus} />
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
                  <input placeholder='Intervalo de tempo' type="text" className='form-1' name="datefilter" value={createdAt_his} onChange={(e) => setDate(e.target.value)} style={{ width: '220px', marginRight: '20px' }} />
                </div>
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Colaborador</span>
                  <input placeholder='Nome do colaborador...' className='form-1' value={colaborador_his} onChange={(e) => setColabName(e.target.value)} type='text' style={{ width: '220px', marginRight: '20px' }} />
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
                  <input placeholder='Nome do aluno...' className='form-1' value={nomeAluno_his} onChange={(e) => setAlunoName(e.target.value)} type='text' style={{ width: '220px', marginRight: '20px' }} />
                </div>
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Matrícula</span>
                  <input placeholder='Matrícula do aluno...' className='form-1' value={matricula_his} onChange={(e) => detectMatriculaEntry(e)} type='text' style={{ width: '220px', marginRight: '20px' }} />
                </div>
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Período</span>
                  <select className='form-1' value={periodoAluno_his} onChange={(e) => setAlunoPeriodo(e.target.value)} style={{ width: '160px', marginRight: '20px' }}>
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
                  <input placeholder='Box do aluno...' className='form-1' value={box_his} onChange={(e) => detectBoxEntry(e)} type='text' />
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