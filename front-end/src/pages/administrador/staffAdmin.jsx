// Importações necessárias
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HeaderHomeAdmin from '../../components/headers/adminHomeindex';
import addIcon from '../../assets/addIcon.svg';
import viewIcon from '../../assets/viewIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import './style.css';

function StaffAdmin() {
  // Definição dos estados
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('Categoria');
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
  const [linhaDestacada, setLinhaDestacada] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopCreate, setShowPopCreate] = useState(false);
  const [showPopEdit, setShowPopEdit] = useState(false);
  const [showPopDelete, setShowPopDelete] = useState(false);
  const [colabName, setColabName] = useState('');
  const [colabMatricula, setColabMatricula] = useState('');
  const [colabEmail, setColabEmail] = useState('');
  const [colabPwd, setColabPwd] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [colaboradorDataEdit, setColaboradorDataEdit] = useState({
    nome: '',
    matricula: '',
    email: '',
    senha: ''
  });
  const [colaboradorDataEditBefore, setColaboradorDataEditBefore] = useState({
    nome: '',
    matricula: '',
    email: '',
    senha: ''
  });
  const [colaboradorDataDelete, setColaboradorDataDelete] = useState({
    nome: '',
    matricula: '',
    email: '',
    senha: ''
  });

  // Configuração do Snackbar
  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarStyle, setSnackBarStyle] = useState({
    sx: { background: 'white', color: 'black', borderRadius: '10px' }
  });

  // Funções do Snackbar
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

  // Funções
  const handleHover = (index) => setLinhaDestacada(index);

  const handleLeave = () => setLinhaDestacada(null);

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSimple = () => {
    // Filtrar os resultados da pesquisa
    const resultadosFiltrados = staff.filter(colab => {
      if (searchCategory === 'Categoria' || searchTerm === '') return staff;

      if (searchCategory === 'Nome') {
        return colab.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      } else if (searchCategory === 'Matrícula') {
        return colab.matricula.includes(searchTerm);
      } else if (searchCategory === 'Email') {
        return colab.email.includes(searchTerm);
      }
      return true;
    });

    setResultadosPesquisa(resultadosFiltrados);
  };

  useEffect(() => setResultadosPesquisa(staff), []);

  const returnSearch = () => {
    // Limpar os estados e fechar popups
    setShowPopCreate(false);
    setShowPopEdit(false);
    setShowPopDelete(false);
    setSearchTerm('');
    setColaboradorDataEdit({ nome: '', matricula: '', email: '', senha: '' });
    setColaboradorDataDelete({ nome: '', matricula: '', email: '', senha: '' });
    setColaboradorDataEditBefore({ nome: '', matricula: '', email: '', senha: '' });
    setErrorMessage('');
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const openEditPopup = (originalData) => {
    // Abrir o popup de edição com dados originais
    setColaboradorDataEdit({ ...originalData });
    setColaboradorDataEditBefore((prevData) => {
      const newData = { ...originalData };
      setColaboradorDataEditBefore(prevData);
      return newData;
    });
    setShowPopEdit(true);
    setShowPopCreate(false);
    setColaboradorDataEditBefore(colaboradorDataEdit);
  };

  const openDeletePopup = (originalData) => {
    // Abrir o popup de exclusão
    setColaboradorDataDelete({ ...originalData });
    setShowPopEdit(false);
    setShowPopCreate(false);
    setShowPopDelete(true);
  };

  const handleSearchCategoryChange = (e) => setSearchCategory(e.target.value);

  const handleCreateStaff = () => {
    // Criar novo colaborador
    if (!colabName || !colabMatricula || !colabEmail || !colabPwd) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
      return;
    }

    const existingColab = staff.find(colab => colab.matricula === colabMatricula);
    if (existingColab) {
      setErrorMessage('Já existe um colaborador com essa matrícula.');
      return;
    }

    const colabInfo = {
      nome: colabName,
      matricula: colabMatricula,
      email: colabEmail,
      senha: colabPwd
    };

    setStaff(prevStaff => [...prevStaff, colabInfo]);

    setErrorMessage('');
    console.log('Informações da colab:', colabInfo);
    openSnackBarMessage();
    setSnackBarMessage('Colaborador criado com sucesso');
    setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
    returnSearch();
  };

  const handleEditStaff = () => {
    // Editar colaborador existente
    if (!colaboradorDataEdit.nome || !colaboradorDataEdit.matricula || !colaboradorDataEdit.email || !colaboradorDataEdit.senha) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
      return;
    }

    openSnackBarMessage();
    setSnackBarMessage('Colaborador editado com sucesso');
    setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });

    console.log('Informações antigas do colaborador editado:', colaboradorDataEditBefore);
    console.log('Novas informações do colaborador editado:', colaboradorDataEdit);

    returnSearch();
  };

  const handleDeleteStaff = () => {
    // Deletar colaborador
    openSnackBarMessage();
    setSnackBarMessage('Colaborador deletado com sucesso');
    setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
    console.log('Informações do colaborador deletado:', colaboradorDataDelete);
    returnSearch();
  };


  var staff = [ //banco com o GET dados dos colaboradores
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
            <button className='button-14' onClick={() => setShowPopCreate(true)}><img src={addIcon} />Cadastrar um funcionário</button>
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
                    <option value='Categoria'>Selecione uma categoria</option>
                    <option>Nome</option>
                    <option>Matrícula</option>
                    <option>Email</option>
                  </select>
                </div>
                <div className="searchBoxButtonsFamily">
                  <button className='button-10' onClick={handleSearchSimple}>Pesquisar</button>
                </div>
              </div>
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
                  {resultadosPesquisa.map((objetos, index) => (
                    <tr key={index}>
                      <td>{objetos.nome}</td>
                      <td>{objetos.matricula}</td>
                      <td>{objetos.email}</td>
                      <td
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={handleLeave}
                      >
                        {linhaDestacada === index ? objetos.senha : '*****'}
                      </td>
                      <td>
                        <button className='button-13' onClick={() => openEditPopup(objetos)}><img src={viewIcon} /></button>
                        <button className='button-13' onClick={() => openDeletePopup(objetos)}><img src={deleteIcon} /></button></td>
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
      {showPopCreate && (
        <div className="popUpView">
          <div className="popUpViewCard">
            <div className="popUpViewHead">
              <h1 className='heading-4'>Adicionar colaborador<br /><span className='body-normal text-color-5'>Todos os campos requerem preenchimento.</span></h1>
              <button className='button-7' onClick={returnSearch}>Voltar</button>
            </div>
            <div className="popUpViewBody">
              <div className="viewFamilyCardTop">
                <p className='body-medium margin-bottom-20'>Informações do colaborador</p>
                <div className="createCardTopBox">
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Nome da colaborador</span>
                    <input
                      placeholder='Digite o nome...'
                      type="text"
                      className='form-1'
                      value={colabName}
                      onChange={(e) => setColabName(e.target.value)}
                    />
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Matrícula</span>
                    <input
                      placeholder='Digite a matrícula...'
                      className='form-1'
                      value={colabMatricula}
                      onChange={(e) => setColabMatricula(e.target.value)}
                      type='number'
                    />
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Email</span>
                    <input
                      placeholder='Digite o email...'
                      className='form-1'
                      value={colabEmail}
                      onChange={(e) => setColabEmail(e.target.value)}
                      type='text'
                    />
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Senha</span>
                    <input
                      placeholder='Digite a senha...'
                      className='form-1'
                      value={colabPwd}
                      onChange={(e) => setColabPwd(e.target.value)}
                      type='text'
                    />
                  </div>
                </div>
              </div>
            </div >
            <div className='errorContainer' style={{ position: 'relative', zIndex: 1 }}>
              {errorMessage && (
                <p className="error-message-colab" style={{ position: 'absolute', top: 0, left: 0 }}>
                  {errorMessage}
                </p>
              )}
              <div className='popUpViewButtons'>
                <button
                  className='button-10 margin-right-30'
                  disabled={false}
                  variant="outlined"
                  onClick={handleCreateStaff}
                > Adicionar
                </button>
              </div>
            </div>
          </div >
        </div >
      )
      }
      {showPopEdit && (
        <div className="popUpView">
          <div className="popUpViewCard">
            <div className="popUpViewHead">
              <h1 className='heading-4'>Editar colaborador<br /><span className='body-normal text-color-5'>Todos os campos requerem preenchimento.</span></h1>
              <button className='button-7' onClick={returnSearch}>Voltar</button>
            </div>
            <div className="popUpViewAdminBody">
              <div className="viewFamilyCardTop">
                <p className='body-medium margin-bottom-20'>Informações do colaborador</p>
                <div className="editCardTopBox">
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Nome do colaborador</span>
                    <input
                      placeholder='Digite o nome...'
                      type="text"
                      className='form-1'
                      value={colaboradorDataEdit.nome}
                      onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, nome: e.target.value })}
                    />
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Matrícula</span>
                    <input
                      placeholder='Digite a matrícula...'
                      className='form-1'
                      value={colaboradorDataEdit.matricula}
                      onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, matricula: e.target.value })}
                      type='number'
                    />
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Email</span>
                    <input
                      placeholder='Digite o email...'
                      className='form-1'
                      value={colaboradorDataEdit.email}
                      onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, email: e.target.value })}
                      type='text'
                    />
                  </div>
                  <div className='searchForms'>
                    <span className='body-normal margin-bottom-5'>Senha</span>
                    <div className="iconPasswordContainer">
                      <input
                        placeholder='Digite a senha...'
                        className='form-1'
                        value={colaboradorDataEdit.senha}
                        onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, senha: e.target.value })}
                        type={isPasswordVisible ? 'text' : 'password'}
                      />
                      <span className="lnr lnr-eye" onClick={togglePasswordVisibility} />
                    </div>
                  </div>
                </div>
              </div>
            </div >
            <div className='errorContainer' style={{ position: 'relative', zIndex: 1 }}>
              {errorMessage && (
                <p className="error-message-colab" style={{ position: 'absolute', top: 0, left: 0 }}>
                  {errorMessage}
                </p>
              )}
              <div className='popUpViewButtons'>
                <button
                  className='button-10 margin-right-30'
                  disabled={false}
                  variant='outlined'
                  onClick={handleEditStaff}
                > Salvar
                </button>
              </div>
            </div>
          </div >
        </div >
      )
      }
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
              <button
                className='button-8'
                disabled={false}
                onClick={returnSearch}
              > Cancelar
              </button>
              <button
                className='button-9'
                disabled={false}
                variant='outlined'
                onClick={handleDeleteStaff}
              > Continuar
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