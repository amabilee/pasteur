import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HeaderHomeAdmin from '../../components/headers/adminHomeindex';
import viewIcon from '../../assets/viewIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import './style.css';

//Component
import PopupCreate from '../../components/popCreate'
import PopUpEdit from '../../components/popEdit'

const UsuarioTable = ({ data, onEdit, onDelete }) => (
  <table className='table table-sm tableStaff'>
    <thead>
      <tr>
        <th scope="col">NOME</th>
        <th scope="col">MATRÍCULA</th>
        <th scope="col">CARGO</th>
        <th scope="col">SENHA</th>
        <th scope="col">AÇÕES</th>
      </tr>
    </thead>
    <tbody>
      {data.map((usuario, index) => (
        <tr key={index}>
          <td>{usuario.nome}</td>
          <td>{usuario.matricula}</td>
          <td>
            {usuario.cargo == 'aluno' ? 'Aluno' :
              usuario.cargo == 'colaborador' ? 'Colaborador' :
                usuario.cargo == 'administrador' ? 'Administrador' :
                  ''}
          </td>
          <td>{usuario.senha}</td>
          <td>
            <button className='button-13' onClick={() => onEdit(usuario)}><img src={viewIcon} /></button>
            <button className='button-13' onClick={() => onDelete(usuario)}><img src={deleteIcon} /></button></td>
        </tr>
      ))}
    </tbody>
  </table>
)

function StaffAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('Selecione');
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopCreate, setShowPopCreate] = useState(false);
  const [showPopEdit, setShowPopEdit] = useState(false);
  const [showPopDelete, setShowPopDelete] = useState(false);
  const [nome_colab, setColabName] = useState('');
  const [matricula_colab, setColabMatricula] = useState('');
  const [cargo_colab, setColabCargo] = useState('');
  const [senha_colab, setColabSenha] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [colaboradorDataEdit, setColaboradorDataEdit] = useState({ nome: '', matricula: '', cargo: '', senha: '' });
  const [colaboradorDataEditBefore, setColaboradorDataEditBefore] = useState({ nome: '', matricula: '', cargo: '', senha: '' });
  const [colaboradorDataDelete, setColaboradorDataDelete] = useState({ nome: '', matricula: '', cargo: '', senha: '' });
  var matrixColab = { nome: '', matricula: '', cargo: '', senha: '' }
  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: 'white', color: 'black', borderRadius: '10px' } });

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

  useEffect(() => setResultadosPesquisa(users), []);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  //Pesquisar Usuário

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const handleSearchCategoryChange = (e) => setSearchCategory(e.target.value);

  function handleSearchSimple() {
    const resultadosFiltrados = users.filter(usuario => {
      if (searchCategory === 'Selecione' || searchTerm === '') {
        return true;
      } else {
        const normalizedSearchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        switch (searchCategory) {
          case 'Nome':
            return usuario.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
          case 'Matrícula':
            return usuario.matricula.includes(searchTerm);
          case 'Cargo':
            return usuario.cargo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
          default:
            return true;
        }
      }
    });
    setSearchTerm('');
    setSearchCategory('Selecione')
    setResultadosPesquisa(resultadosFiltrados);
  }

  const returnSearch = () => {
    setShowPopCreate(false);
    setShowPopEdit(false);
    setShowPopDelete(false);
    setSearchTerm('');
    setColabName('');
    setColabMatricula('');
    setColabCargo('');
    setColabSenha('');
    setColaboradorDataEdit({ nome: '', matricula: '', cargo: '', senha: '' });
    setColaboradorDataDelete({ nome: '', matricula: '', cargo: '', senha: '' });
    setColaboradorDataEditBefore({ nome: '', matricula: '', cargo: '', senha: '' });
    setErrorMessage('');
  };

  // Criar Usuário

  const handleCreateStaff = () => {
    const requiredFields = ['nome', 'matricula', 'cargo', 'senha']
    const existingColab = users.find(usuario => usuario.matricula === matricula_colab);
    if (requiredFields.some(field => !eval(`${field}_colab`))) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
    } else if (existingColab) {
      setErrorMessage('Já existe um colaborador com essa matrícula.');
    } else {
      formatColabData()
      console.log('Informações do colaborador:', matrixColab); //Envio para a API do usuario criado
      openSnackBarMessage();
      setSnackBarMessage('Colaborador criada com sucesso');
      setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
      returnSearch();
    }
  };

  function formatColabData() {
    const colabFields = ['nome', 'matricula', 'cargo', 'senha']
    colabFields.forEach(field => matrixColab[field] = eval(`${field}_colab`))
  }

  // Editar Usuário

  const openEditPop = (originalData) => {
    setColaboradorDataEdit((prevData) => {
      setColaboradorDataEditBefore(prevData);
      return { ...originalData };
    });
    setShowPopEdit(true);
    setShowPopCreate(false);
    setColaboradorDataEditBefore(colaboradorDataEdit);
  };

  const handleEditColaborador = () => {
    const requiredFields = ['nome', 'matricula', 'cargo', 'senha']
    if (requiredFields.some(field => !colaboradorDataEdit[field])) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
    } else {
      openSnackBarMessage();
      setSnackBarMessage('Colaborador editado com sucesso');
      setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
      // console.log('Informações antigas do colaborador editado:', colaboradorDataEditBefore);
      console.log('Novas informações do colaborador editado:', colaboradorDataEdit); //Envio para a API do usuario editado
      returnSearch();
    }
  };

  // Deletar Colaborador

  const openDeletePopup = (originalData) => {
    setColaboradorDataDelete({ ...originalData });
    setShowPopEdit(false);
    setShowPopCreate(false);
    setShowPopDelete(true);
  };

  const handleDeleteStaff = () => {
    openSnackBarMessage();
    setSnackBarMessage('Colaborador deletado com sucesso');
    setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
    console.log('Informações do colaborador deletado:', colaboradorDataDelete);
    returnSearch();
  };

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
                  <input
                    type='text'
                    placeholder="Pesquisar por nome, matrícula ..."
                    className='form-3'
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                  />
                  <select value={searchCategory} onChange={handleSearchCategoryChange} className='searchBoxSelect'>
                    <option value='Selecione'>Selecione uma categoria</option>
                    <option>Nome</option>
                    <option>Matrícula</option>
                    <option>Cargo</option>
                  </select>
                </div>
                <div className="searchBoxButtonsFamily">
                  <button className='button-10' onClick={handleSearchSimple}>Pesquisar</button>
                </div>
              </div>
              <UsuarioTable data={resultadosPesquisa} onEdit={openEditPop} onDelete={openDeletePopup} />
            </div>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackBarMessage} message={snackBarMessage} action={alertBox} ContentProps={snackBarStyle} />
      </Container>
      <PopupCreate
        showPopCreate={showPopCreate}
        onClose={returnSearch}
        headerText="Adicionar colaborador"
        sectionOneContent={
          <>
            <p className='body-medium margin-bottom-20'>Informações do colaborador</p>
            <div className="createCardTopBox">
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Nome do usuário</span>
                <input placeholder='Digite o nome...' type="text" className='form-1' value={nome_colab} onChange={(e) => setColabName(e.target.value)} />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Matrícula</span>
                <input placeholder='Digite a matrícula...' className='form-1' value={matricula_colab} onChange={(e) => setColabMatricula(e.target.value)} type='number' />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Cargo</span>
                <select className='form-1' value={cargo_colab} onChange={(e) => setColabCargo(e.target.value)}>
                  <option value='' disabled>Selecionar um cargo</option>
                  <option value='aluno'>Aluno</option>
                  <option value='colaborador'>Colaborador</option>
                  <option value='administrador'>Administrador</option>
                </select>
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Senha</span>
                <input placeholder='Digite a senha...' className='form-1' value={senha_colab} onChange={(e) => setColabSenha(e.target.value)} type='text' />
              </div>
            </div>
          </>
        }
        onSubmit={handleCreateStaff}
        errorMessage={errorMessage}
      />
      <PopUpEdit
        showPopEdit={showPopEdit}
        headerText="Editar colaborador"
        onClose={returnSearch}
        sectionOneContent={
          <>
            <p className='body-medium margin-bottom-20'>Informações do colaborador</p>
            <div className="editCardTopBox">
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Nome do colaborador</span>
                <input placeholder='Digite o nome...' type="text" className='form-1' value={colaboradorDataEdit.nome} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, nome: e.target.value })} />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Matrícula</span>
                <input placeholder='Digite a matrícula...' className='form-1' value={colaboradorDataEdit.matricula} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, matricula: e.target.value })}/>
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Cargo</span>
                <select className='form-1' value={colaboradorDataEdit.cargo} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, cargo: e.target.value })}>
                  <option value='' disabled>Selecionar um cargo</option>
                  <option value='aluno'>Aluno</option>
                  <option value='colaborador'>Colaborador</option>
                  <option value='administrador'>Administrador</option>
                </select>
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Senha</span>
                <div className="iconPasswordContainer">
                  <input placeholder='Digite a senha...' className='form-1' value={colaboradorDataEdit.senha} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, senha: e.target.value })} type={isPasswordVisible ? 'text' : 'password'} />
                  <span className="lnr lnr-eye" onClick={togglePasswordVisibility} />
                </div>
              </div>
            </div>
          </>
        }
        onSubmit={handleEditColaborador}
        errorMessage={errorMessage}
      />
      {showPopDelete && (
        <div className="popUpView">
          <div className="popUpDeleteCard">
            <div className="popUpSearchBody">
              <div className="viewFamilyCardTop">
                <p className='body-large text-align-center margin-bottom-10'>Tem certeza que deseja deletar o cadastro do usuário: <strong>{colaboradorDataDelete.nome}</strong>?</p>
                <p className='body-light text-align-center margin-bottom-20'>Esta ação não pode ser desfeita.</p>
              </div>
            </div >
            <div className='popUpDeleteButtons'>
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