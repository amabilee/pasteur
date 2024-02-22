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

const ColaboradorTable = ({ data, onEdit, onDelete }) => (
  <table className='table table-sm tableStaff'>
    <thead>
      <tr>
        <th scope="col">NOME</th>
        <th scope="col">MATRÍCULA</th>
        <th scope="col">EMAIL</th>
        <th scope="col">SENHA</th>
        <th scope="col">AÇÕES</th>
      </tr>
    </thead>
    <tbody>
      {data.map((colaborador, index) => (
        <tr key={index}>
          <td>{colaborador.nome}</td>
          <td>{colaborador.matricula}</td>
          <td>{colaborador.email}</td>
          <td>{colaborador.senha}</td>
          <td>
            <button className='button-13' onClick={() => onEdit(colaborador)}><img src={viewIcon} /></button>
            <button className='button-13' onClick={() => onDelete(colaborador)}><img src={deleteIcon} /></button></td>
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
  const [email_colab, setColabEmail] = useState('');
  const [senha_colab, setColabSenha] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [colaboradorDataEdit, setColaboradorDataEdit] = useState({ nome: '', matricula: '', email: '', senha: '' });
  const [colaboradorDataEditBefore, setColaboradorDataEditBefore] = useState({ nome: '', matricula: '', email: '', senha: '' });
  const [colaboradorDataDelete, setColaboradorDataDelete] = useState({ nome: '', matricula: '', email: '', senha: '' });
  var matrixColab = { nome: '', matricula: '', email: '', senha: '' }
  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: 'white', color: 'black', borderRadius: '10px' }});

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

  useEffect(() => setResultadosPesquisa(staff), []);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  //Pesquisar Colaborador

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const handleSearchCategoryChange = (e) => setSearchCategory(e.target.value);

  function handleSearchSimple() {
    const resultadosFiltrados = staff.filter(colaborador => {
      if (searchCategory === 'Selecione' || searchTerm === '') {
        return true;
      } else {
        const normalizedSearchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        switch (searchCategory) {
          case 'Nome':
            return colaborador.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
          case 'Matrícula':
            return colaborador.matricula.includes(searchTerm);
          case 'Email':
            return colaborador.email.includes(searchTerm);
          default:
            return true;
        }
      }
    });
    setResultadosPesquisa(resultadosFiltrados);
  }

  const returnSearch = () => {
    setShowPopCreate(false);
    setShowPopEdit(false);
    setShowPopDelete(false);
    setSearchTerm('');
    setColabName('');
    setColabMatricula('');
    setColabEmail('');
    setColabSenha('');
    setColaboradorDataEdit({ nome: '', matricula: '', email: '', senha: '' });
    setColaboradorDataDelete({ nome: '', matricula: '', email: '', senha: '' });
    setColaboradorDataEditBefore({ nome: '', matricula: '', email: '', senha: '' });
    setErrorMessage('');
  };

  // Criar Colaborador

  const handleCreateStaff = () => {
    const requiredFields = ['nome', 'matricula', 'email', 'senha']
    const existingColab = staff.find(colab => colab.matricula === matricula_colab);
    if (requiredFields.some(field => !eval(`${field}_colab`))) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
    } else if (existingColab) {
      setErrorMessage('Já existe um colaborador com essa matrícula.');
    } else {
      formatColabData()
      console.log('Informações do colaborador:', matrixColab);
      openSnackBarMessage();
      setSnackBarMessage('Colaborador criada com sucesso');
      setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
      returnSearch();
    }
  };

  function formatColabData() {
    const colabFields = ['nome', 'matricula', 'email', 'senha']
    colabFields.forEach(field => matrixColab[field] = eval(`${field}_colab`))
  }

  // Editar Colaborador

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
    const requiredFields = ['nome', 'matricula', 'email', 'senha']
    if (requiredFields.some(field => !colaboradorDataEdit[field])) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
    } else {
      openSnackBarMessage();
      setSnackBarMessage('Colaborador editado com sucesso');
      setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
      console.log('Informações antigas do colaborador editado:', colaboradorDataEditBefore);
      console.log('Novas informações do colaborador editado:', colaboradorDataEdit);
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

  return (
    <>
      <HeaderHomeAdmin />
      <Container className='containerDesktop'>
        <div className='boxContainerDesktop'>
          <div className="headContainerAdminDesktop">
            <div className="headContainerAdminText">
              <h2 className='body-normal text-color-5'>Funcionários</h2>
              <h1 className='heading-4'>Gerenciamento de Colaboradores</h1>
            </div>
            <button className='button-11' onClick={() => setShowPopCreate(true)}>Cadastrar um funcionário</button>
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
                    <option>Email</option>
                  </select>
                </div>
                <div className="searchBoxButtonsFamily">
                  <button className='button-10' onClick={handleSearchSimple}>Pesquisar</button>
                </div>
              </div>
              <ColaboradorTable data={resultadosPesquisa} onEdit={openEditPop} onDelete={openDeletePopup} />
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
                <span className='body-normal margin-bottom-5'>Nome da colaborador</span>
                <input placeholder='Digite o nome...' type="text" className='form-1' value={nome_colab} onChange={(e) => setColabName(e.target.value)} />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Matrícula</span>
                <input placeholder='Digite a matrícula...' className='form-1' value={matricula_colab} onChange={(e) => setColabMatricula(e.target.value)} type='number' />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Email</span>
                <input placeholder='Digite o email...' className='form-1' value={email_colab} onChange={(e) => setColabEmail(e.target.value)} type='text' />
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
                <input placeholder='Digite a matrícula...' className='form-1' value={colaboradorDataEdit.matricula} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, matricula: e.target.value })} type='number' />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Email</span>
                <input placeholder='Digite o email...' className='form-1' value={colaboradorDataEdit.email} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, email: e.target.value })} type='text' />
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
                <p className='body-large text-align-center margin-bottom-10'>Tem certeza que deseja deletar o cadastro do colaborador: <strong>{colaboradorDataDelete.nome}</strong>?</p>
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