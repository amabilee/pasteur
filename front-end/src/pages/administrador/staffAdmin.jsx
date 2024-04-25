import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HeaderHomeAdmin from '../../components/headers/adminHomeindex';
import viewIcon from '../../assets/viewIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import eyeOn from '../../assets/eyeOn.svg'
import eyeOff from '../../assets/eyeOff.svg'
import ordenarIcon from '../../assets/ordenarIcon.svg/'
import { server } from "../../services/server";
import './style.css';
import PopupCreate from '../../components/popCreate'
import PopUpEdit from '../../components/popEdit'

import Paginator from '../../components/paginator/paginator';

const UsuarioTable = ({ data, onEdit, onDelete, onOrdenar }) => (
  <table className='table table-sm tableStaff'>
    <thead>
      <tr>
        <th scope="col">NOME</th>
        <th scope="col">MATRÍCULA</th>
        <th scope="col">CARGO</th>
        <th scope="col" onClick={() => onOrdenar()}>STATUS<img className='ordenarIcon' src={ordenarIcon} /></th>
        <th scope="col">AÇÕES</th>
      </tr>
    </thead>
    <tbody>
      {data && Array.isArray(data) && data.map((usuario, index) => (
        <tr key={index}>
          <td>{usuario.nomeUser}</td>
          <td>{usuario.matricula}</td>
          <td>
            {usuario.cargo == '3' ? 'Aluno' :
              usuario.cargo == '2' ? 'Colaborador' :
                usuario.cargo == '1' ? 'Administrador' :
                  ''}
          </td>
          <td>
            <div className={
              usuario.status === true ? 'ativo-class' :
                usuario.status === false ? 'invativo-class' :
                  ''
            }></div>
            {usuario.status === true ? 'Ativo' :
              usuario.status === false ? 'Inativo' :
                ''}
          </td>
          <td>
            {
              usuario.cargo == '3'
                ?
                <button className='button-14' onClick={() => onEdit(usuario)} style={{ marginRight: '50px' }}><img src={viewIcon} /></button>
                :
                <>
                  <button className='button-14' onClick={() => onEdit(usuario)}><img src={viewIcon} /></button>
                  <button className='button-13' onClick={() => onDelete(usuario)} ><img src={deleteIcon} /></button>
                </>
            }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);



function StaffAdmin() {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [paginatorStatus, setPaginatorStatus] = useState(false)
  const [orderUsers, setOrderUsers] = useState(1)


  const [searchData, setSearchData] = useState({ term: '', category: 'Selecione' })
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [showPopCreate, setShowPopCreate] = useState(false);
  const [showPopEdit, setShowPopEdit] = useState(false);
  const [showPopDelete, setShowPopDelete] = useState(false);

  const [nomeUser_colab, setColabName] = useState('');
  const [matricula_colab, setColabMatricula] = useState('');
  const [cargo_colab, setColabCargo] = useState('');
  const [senha_colab, setColabSenha] = useState('');
  const [senhaConfirm_colab, setColabSenhaConfirm] = useState('');

  const [colaboradorDataEdit, setColaboradorDataEdit] = useState({ nomeUser: '', matricula: '', cargo: '', senha: '', status: true });
  const [colaboradorDataDelete, setColaboradorDataDelete] = useState({ nomeUser: '', matricula: '', cargo: '', senha: '', status: true });
  const [colaboradorDataDeleteOption, setColaboradorDataDeleteOption] = useState(false);

  var matrixColab = { nomeUser: '', matricula: '', cargo: '', senha: '', status: true }

  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: 'white', color: 'black', borderRadius: '10px' } });

  const [users, setUsers] = useState([])


  //Alterar Visibilidade de senha
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const togglePasswordVisibility2 = () => {
    setIsPasswordVisible2((prev) => !prev);
  };

  //Requisição GET usuarios

  useEffect(() => {
    getUsers(1, '')
    setCurrentPage(1);
  }, []);

  //Snackbar settings
  const openSnackBarMessage = () => setOpen(true);

  const closeSnackBarMessage = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };
  const alertBox = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackBarMessage}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  //Reset campos
  const returnSearch = () => {
    setShowPopCreate(false);
    setShowPopEdit(false);
    setShowPopDelete(false);
    setSearchData(({ term: '', category: 'Selecione' }))
    setColabName('');
    setColabMatricula('');
    setColabCargo('');
    setColabSenha('');
    setColabSenhaConfirm('');
    setColaboradorDataEdit({ nomeUser: '', matricula: '', cargo: '', senha: '', status: true });
    setColaboradorDataDelete({ nomeUser: '', matricula: '', cargo: '', senha: '', status: true });
    setErrorMessage('');
  };

  // Criar Usuário
  const handleCreateStaff = async () => {
    const requiredFields = ['nomeUser', 'matricula', 'cargo', 'senha', 'senhaConfirm']
    const existingColab = users.find(usuario => {
      const userExist = usuario.matricula
      if (Number(userExist) === Number(matricula_colab)) {
        return true;
      }
    })
    if (requiredFields.some(field => !eval(`${field}_colab`))) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
    } else if (existingColab) {
      setErrorMessage('Já existe um usuário com essa matrícula.');
    } else if (senha_colab !== senhaConfirm_colab) {
      setErrorMessage(`A senha deve ser igual nos campos 'Senha' e 'Confirmar senha'.`);
    } else if (parseInt(matricula_colab <= 0)) {
      setErrorMessage('A matrícula deve ser maior que zero.');
    } else {
      formatColabData()
      openSnackBarMessage();
      setSnackBarMessage('Usuário criado com sucesso');
      setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
      var token = localStorage.getItem("loggedUserToken");
      var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
      var userCargo = infoUsers.cargo
      try {
        const response = await server.post("/usuario", matrixColab, {
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
            "access-level": `${userCargo}`
          }
        });
        returnSearch();
        getUsers(1)
      } catch (e) {
        console.error(e);
        if (e.response.status == 401) {
          localStorage.removeItem('loggedUserToken');
          localStorage.removeItem('loggedUserData');
          localStorage.removeItem('auth1');
          localStorage.removeItem('auth2');
          localStorage.removeItem('auth3');
          window.location.reload();
        }
      }
      returnSearch();

    }
  };

  function formatColabData() {
    const colabFields = ['nomeUser', 'matricula', 'cargo', 'senha']
    colabFields.forEach(field => matrixColab[field] = eval(`${field}_colab`))
  }

  // Editar Usuário
  const openEditPop = (originalData) => {
    setColaboradorDataEdit((prevData) => {
      return { ...originalData };
    });
    setShowPopEdit(true);
    setShowPopCreate(false);
  };

  const handleEditColaborador = async () => {
    const requiredFields = ['nomeUser', 'cargo', 'senha']
    if (requiredFields.some(field => !colaboradorDataEdit[field])) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
    } else if (parseInt(matricula_colab <= 0)) {
      setErrorMessage('A matrícula deve ser maior que zero.');
    } else {
      openSnackBarMessage();
      setSnackBarMessage('Usuário editado com sucesso');
      setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });

      var token = localStorage.getItem("loggedUserToken");
      var matriculaID = Number(colaboradorDataEdit.matricula)
      var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
      var userCargo = infoUsers.cargo
      try {
        const response = await server.put(`/usuario/${matriculaID}`, colaboradorDataEdit, {
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
            "access-level": `${userCargo}`
          }
        });
        returnSearch();
        getUsers(1)
      } catch (e) {
        console.error(e);
        localStorage.removeItem('loggedUserToken');
        localStorage.removeItem('loggedUserData');
        localStorage.removeItem('auth1');
        localStorage.removeItem('auth2');
        localStorage.removeItem('auth3');
        window.location.reload();
      }
    }
  };

  // Deletar Colaborador
  const openDeletePopup = (originalData) => {
    setColaboradorDataDelete({ ...originalData });
    setShowPopEdit(false);
    setShowPopCreate(false);
    setShowPopDelete(true);
  };
  const handleDeleteStaff = async () => {
    var token = localStorage.getItem("loggedUserToken");
    var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
    var userCargo = infoUsers.cargo
    if (colaboradorDataDeleteOption === true) {
      try {
        const response = await server.delete(`/usuario/${colaboradorDataDelete.matricula}`, {
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
            "access-level": `${userCargo}`
          }
        });
        openSnackBarMessage();
        setSnackBarMessage(response.data.message);
        setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
        getUsers(1)
      } catch (e) {
        openSnackBarMessage();
        setSnackBarMessage(e);
        setSnackBarStyle({ sx: { background: '#BE5353', color: 'white', borderRadius: '15px' } });
        if (e.resposnte.status == 401) {
          localStorage.removeItem('loggedUserToken');
          localStorage.removeItem('loggedUserData');
          localStorage.removeItem('auth1');
          localStorage.removeItem('auth2');
          localStorage.removeItem('auth3');
          window.location.reload();
        }
      }
      returnSearch();
    }
  };

  //Paginação
  const handlePageChange = (page) => {
    setCurrentPage(page);
    let filtro = ''
    switch (searchData.category) {
      case 'Nome':
        filtro = `&nomeUser=${searchData.term}`
        getUsers(page, filtro);
        console.log('nome')
        break
      case 'Matrícula':
        filtro = `&matricula=${searchData.term}`
        getUsers(page, filtro);
        break
      default:
        if (orderUsers === 1 || orderUsers === 2 || orderUsers === 3) {
          switch (orderUsers) {
            case 1:
              filtro = ``
              getUsers(page, filtro);
              break
            case 3:
              filtro = `&status=0`
              getUsers(page, filtro);
              break
            case 2:
              filtro = `&status=1`
              getUsers(page, filtro);
              return
          }
        }
    }
  };

  async function getUsers(pagina, filtro = '') {
    var token = localStorage.getItem("loggedUserToken");
    var infoUsers = JSON.parse(localStorage.getItem("loggedUserData"));
    var userCargo = infoUsers.cargo
    if (pagina == undefined) {
      pagina == 1
    }
    try {
      const response = await server.get(`/usuario?page=${pagina}${filtro}`, {
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json",
          "access-level": `${userCargo}`

        }
      });
      setUsers(response.data.users);
      let pagesTotal = response.data.pagination.totalPages
      if (pagesTotal <= 0) {
        setTotalPages(1);
      } else {
        setTotalPages(pagesTotal);
      }
      if (pagesTotal <= currentPage - 1) {
        setCurrentPage(1)
      }
      // setSearchData({ ...searchData, term: '', category: '' })
      setResultadosPesquisa(response.data.users);
    } catch (e) {
      console.error(e);
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

  const ordenarUsers = () => {
    if (orderUsers === 1) {
      setOrderUsers(2)
      setCurrentPage(1)
      console.log(1)
    } else if (orderUsers === 2) {
      setOrderUsers(3)
      setCurrentPage(1)
      console.log(2)
    } else if (orderUsers === 3) {
      setOrderUsers(1)
      setCurrentPage(1)
      console.log(3)
    }
    console.log(orderUsers)
    setSearchData(({ term: '', category: 'Selecione' }))
    handleSearchSimple(true)
  }

  //Pesquisar Usuário

  const handleSearchSimple = (ordenar) => {
    let filtro = ''
    if (ordenar) {
      if (orderUsers === 1) {
        filtro = `&status=1`
      } else if (orderUsers === 2) {
        filtro = `&status=0`
      } else if (orderUsers === 3) {
        filtro = ``
      }
      getUsers(1, filtro);
      console.log(true)
    } else {
      console.log(false)
      switch (searchData.category) {
        case 'Nome':
          filtro = `&nomeUser=${searchData.term}`
          getUsers(1, filtro);
          console.log(1)
          break
        case 'Matrícula':
          filtro = `&matricula=${searchData.term}`
          getUsers(1, filtro);
          console.log(2)
          break
        default:
          filtro = ''
          getUsers(1, filtro);
          console.log(3)
          break
      }
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchData({ ...searchData, term: e.target.value })
  }

  function detectMatriculaEntry(e) {
    setColabMatricula(e.target.value.replace(/[^0-9]/g, ''));
  }

  // useEffect(() => {
  //   if (searchData.term.length >= 1) {
  //     setPaginatorStatus(true)
  //   } else {
  //     setPaginatorStatus(false)
  //   }
  // }, [searchData.term]);

  return (
    <>
      <HeaderHomeAdmin />
      <Container className='containerDesktop'>
        <div className='boxContainerDesktop'>
          <div className="headContainerAdminDesktop">
            <div className="headContainerAdminText">
              <h2 className='body-normal text-color-5'>Usuários</h2>
              <h1 className='heading-4'>Gerenciamento de Pessoas</h1>
            </div>
            <button className='button-11' onClick={() => setShowPopCreate(true)}>Cadastrar um usuário</button>
          </div>
          <div className="bodyContainerDesktop">
            <div className="staffContainer">
              <div className="searchBoxFamily">
                <div className="searchBoxInputs">
                  <input type='text' placeholder="Pesquisar por nome..." className='form-3' value={searchData.term} onChange={handleSearchTermChange} />
                  <select value={searchData.category} onChange={(e) => setSearchData({ ...searchData, category: e.target.value })} className='searchBoxSelect'>
                    <option value='Selecione'>Selecione uma categoria</option>
                    <option>Nome</option>
                    <option>Matrícula</option>
                  </select>
                </div>
                <div className="searchBoxButtonsFamily">
                  <button className='button-10' onClick={(e) => handleSearchSimple(false)}>Pesquisar</button>
                </div>
              </div>
              <UsuarioTable data={resultadosPesquisa} onEdit={openEditPop} onDelete={openDeletePopup} onOrdenar={ordenarUsers} />
            </div>
          </div>
        </div>
        <div className="paginator-component">
          <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} disabledStatus={paginatorStatus} />
        </div>
        <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackBarMessage} message={snackBarMessage} action={alertBox} ContentProps={snackBarStyle} />
      </Container>
      <PopupCreate
        showPopCreate={showPopCreate}
        onClose={returnSearch}
        headerText="Adicionar Usuário"
        sectionOneContent={
          <>
            <p className='body-medium margin-bottom-20'>Informações do usuário</p>
            <div className="createCardTopBox">
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Nome do usuário</span>
                <input placeholder='Digite o nome...' type="text" className='form-1' value={nomeUser_colab} onChange={(e) => setColabName(e.target.value)} />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Matrícula</span>
                <input placeholder='Digite a matrícula...' className='form-1' value={matricula_colab} onChange={(e) => detectMatriculaEntry(e)} type='text' />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Cargo</span>
                <select className='form-1' value={cargo_colab} onChange={(e) => setColabCargo(e.target.value)}>
                  <option value='' disabled>Selecionar um cargo</option>
                  <option value='3'>Aluno</option>
                  <option value='2'>Colaborador</option>
                  <option value='1'>Administrador</option>
                </select>
              </div>
            </div>
            <div className="createCardBottom" style={{ display: 'flex', marginTop: '20px' }}>
              <div className='searchForms' style={{ marginRight: '20px' }}>
                <span className='body-normal margin-bottom-5'>Senha</span>
                <div className='iconPasswordContainer'>
                  <input style={{ width: "200px" }} maxLength="10" placeholder='Senha' className='form-1' value={senha_colab} onChange={(e) => setColabSenha(e.target.value)} type={isPasswordVisible ? 'text' : 'password'} />
                  <img src={isPasswordVisible ? eyeOn : eyeOff} className="eyePassword" onClick={togglePasswordVisibility} />
                </div>
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Confirmar senha</span>
                <div className='iconPasswordContainer'>
                  <input style={{ width: "200px" }} maxLength="10" placeholder='Senha' className='form-1' value={senhaConfirm_colab} onChange={(e) => setColabSenhaConfirm(e.target.value)} type={isPasswordVisible2 ? 'text' : 'password'} />
                  <img src={isPasswordVisible2 ? eyeOn : eyeOff} className="eyePassword" onClick={togglePasswordVisibility2} />
                </div>
              </div>
            </div>
          </>
        }
        onSubmit={handleCreateStaff}
        errorMessage={errorMessage}
      />
      <PopUpEdit
        showPopEdit={showPopEdit}
        headerText="Editar Usuário"
        onClose={returnSearch}
        sectionOneContent={
          <>
            <p className='body-medium margin-bottom-20'>Informações do usuário</p>
            {colaboradorDataEdit.cargo == '3' ?
              <div className="editCardTopBox">
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Status</span>
                  <select className='form-1' value={colaboradorDataEdit.status} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, status: e.target.value })}>
                    <option value='' disabled>Selecionar um status</option>
                    <option value={true}>Ativo</option>
                    <option value={false}>Inativo</option>
                  </select>
                </div>
              </div>
              :
              <div className="editCardTopBox">
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Nome do usuário</span>
                  <input placeholder='Digite o nome...' type="text" className='form-1' value={colaboradorDataEdit.nomeUser} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, nomeUser: e.target.value })} />
                </div>
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Cargo</span>
                  <select className='form-1' value={colaboradorDataEdit.cargo} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, cargo: e.target.value })}>
                    <option value='' disabled>Selecionar um cargo</option>
                    <option value='3'>Aluno</option>
                    <option value='2'>Colaborador</option>
                    <option value='1'>Administrador</option>
                  </select>
                </div>
                <div className='searchForms'>
                  <span className='body-normal margin-bottom-5'>Status</span>
                  <select className='form-1' value={colaboradorDataEdit.status} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, status: e.target.value })}>
                    <option value='' disabled>Selecionar um status</option>
                    <option value={true}>Ativo</option>
                    <option value={false}>Inativo</option>
                  </select>
                </div>
              </div>
            }
          </>
        }
        onSubmit={handleEditColaborador}
        errorMessage={errorMessage}
      />
      {showPopDelete && (
        <div className="popUpView">
          <div className="popUpDeleteCard2" style={{ height: "350px" }}>
            <div className="popUpDelete">
              <div className="deleteCardTop">
                <p className='heading-4 text-align-left margin-bottom-10'>Deletar {colaboradorDataDelete.nomeUser} - Confirmação necessária<br></br><br></br><span className='body-normal'>Selecione a opção:</span></p>
                <div>
                  <input
                    type='checkbox' id='deletar-checkbox' onChange={(e) => {
                      if (e.target.checked) {
                        setColaboradorDataDeleteOption(true);
                      } else {
                        setColaboradorDataDeleteOption(false);
                      }
                    }} checked={colaboradorDataDeleteOption}
                  />
                  <label htmlFor='deletar-checkbox'>
                    <p>Deletar usuário</p>
                  </label>
                </div>
                <p className='body-small text-align-left margin-bottom-20' style={{ paddingTop: "5px" }}>Nota importante: Se este usuário for deletado este processo não pode ser desfeito.</p>
              </div>
            </div >
            <div className='popUpDeleteButtons' style={{ height: "30px", margin: "0px 0px" }}>
              <button className='button-8' disabled={false} onClick={returnSearch}>
                Cancelar
              </button>
              <button className='button-9' disabled={false} variant='outlined' onClick={handleDeleteStaff} >
                Continuar
              </button>
            </div>
          </div >
        </div >
      )
      }
      <div className="blocker"></div>
    </>
  )
}

export default StaffAdmin