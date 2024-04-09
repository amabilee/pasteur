import React, { useState, useEffect } from 'react';
import HeaderHomeAdmin from '../../components/headers/adminHomeindex';
import { Container } from 'react-bootstrap';
import viewIcon from '../../assets/viewIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { server } from "../../services/server";
import './style.css';

//Component
import PopupCreate from '../../components/popCreate'
import PopUpEdit from '../../components/popEdit'

const FamilyTable = ({ data, onEdit, onDelete }) => (
  <table className='table table-sm tableFamilies'>
    <thead>
      <tr>
        <th scope="col">NOME</th>
        <th scope="col">MÁXIMO / ESPERADO</th>
        <th scope="col">MÍNIMO</th>
        <th scope="col">AÇÕES</th>
      </tr>
    </thead>
    <tbody>
      {data.map((objetos, index) => (
        <tr key={index}>
          <td>{objetos.nome}</td>
          <td>{objetos.quantidadeMAX}</td>
          <td>{objetos.quantidadeMIN}</td>
          <td>
            <button className='button-14' onClick={() => onEdit(objetos)}><img src={viewIcon} /></button>
            <button className='button-13' onClick={() => onDelete(objetos)}><img src={deleteIcon} /></button></td>
        </tr>
      ))}
    </tbody>
  </table>
)

function FamilyAdmin() {
  const [showPopCreate, setShowPopCreate] = useState(false);
  const [showPopEdit, setShowPopEdit] = useState(false);
  const [showPopDelete, setShowPopDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [nome_fam, setFamilyName] = useState('');
  const [quantidadeMAX_fam, setFamilyquantidadeMAX] = useState('');
  const [quantidadeMIN_fam, setFamilyquantidadeMIN] = useState('');
  const [familyDataEdit, setFamilyDataEdit] = useState({ id: 0, nome: '', quantidadeMAX: '', quantidadeMIN: '' });
  const [familyDataEditBefore, setFamilyDataEditBefore] = useState({ id: 0, nome: '', quantidadeMAX: '', quantidadeMIN: '' });
  const [familyDataDelete, setFamilyDataDelete] = useState({ id: 0, nome: '', quantidadeMAX: '', quantidadeMIN: '' });
  var matrixFamilia = {nome: '', quantidadeMIN: '', quantidadeMAX: '' }
  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarStyle, setSnackBarStyle] = useState({
    sx: { background: 'white', color: 'black', borderRadius: '10px' }
  });
  const [familias, setFamilias] = useState([])

  async function getFamilia() {
    var token = localStorage.getItem("loggedUserToken")
    try {
      const response = await server.get('/familia', {
        method: 'GET',
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json"
        }
      })
      setTableData(response.data)

    } catch (e) {
      console.error(e)
    }
  }

  const setTableData = (data) => {
    setFamilias(data)
    setResultadosPesquisa(data)
  }

  const openSnackBarMessage = () => setOpen(true);

  const closeSnackBarMessage = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const alertBox = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeSnackBarMessage}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  // Pesquisa Familia

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSimple = () => {
    const resultadosFiltrados = familias.filter(obj => {
      if (searchTerm === '') return true;
      return obj.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
    });
    setResultadosPesquisa(resultadosFiltrados);
  };

  useEffect(() => {
    getFamilia()
  }, []);

  const returnSearch = () => {
    setShowPopCreate(false);
    setShowPopEdit(false);
    setShowPopDelete(false);
    setSearchTerm('');
    setFamilyDataEdit({ nome: '', quantidadeMAX: '', quantidadeMIN: '' });
    setFamilyDataDelete({ nome: '', quantidadeMAX: '', quantidadeMIN: '' });
    setFamilyDataEditBefore({ nome: '', quantidadeMAX: '', quantidadeMIN: '' });
    setErrorMessage('');
    setFamilyName('');
    setFamilyquantidadeMAX('')
    setFamilyquantidadeMIN('');
  };

  //Editar Familia

  const openEditPop = (originalData) => {
    setFamilyDataEdit((prevData) => {
      setFamilyDataEditBefore(prevData);
      return { ...originalData };
    });
    setShowPopEdit(true);
    setShowPopCreate(false);
    setShowPopDelete(false);
    setFamilyDataEditBefore(familyDataEdit);
  };

  const handleEditFamily = async () => {
    const requiredFields = ['nome', 'quantidadeMAX', 'quantidadeMIN'];
    if (requiredFields.some(field => !familyDataEdit[field])) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
    } else if (parseInt(familyDataEdit.quantidadeMAX) <= parseInt(familyDataEdit.quantidadeMIN)) {
      setErrorMessage('Quantidade máxima deve ser maior que a quantidade mínima.');
    } else {
      openSnackBarMessage();
      setSnackBarMessage('Família editada com sucesso');
      setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
      console.log('Novas informações da família editada:', familyDataEdit);
      var token = localStorage.getItem("loggedUserToken");
      try {
        const response = await server.put(`/familia/${familyDataEdit.id}`, familyDataEdit, {
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json"
          }
        });
        console.log(response);
        returnSearch();
        getFamilia()
      } catch (e) {
        console.error(e);
      }
    }
  };


  //Delete Familia

  const openDeletePopup = (originalData) => {
    setFamilyDataDelete({ ...originalData });
    setShowPopEdit(false);
    setShowPopCreate(false);
    setShowPopDelete(true);
  };

  const handleDeleteFamily = async () => {
    openSnackBarMessage();
    setSnackBarMessage('Família deletada com sucesso');
    setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
    console.log('Informações da família deletada:', familyDataDelete);  //Envio para a api da familia deletada
    var token = localStorage.getItem("loggedUserToken");
    try {
      const response = await server.delete(`/familia/${familyDataDelete.id}`, {
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json"
        }
      });
      console.log(response);
      returnSearch();
      getFamilia()
    } catch (e) {
      console.error(e);
    }
    returnSearch();
  };

  //Criar Familia

  const handleCreateFamily = async () => {
    const requiredFields = ['nome', 'quantidadeMAX', 'quantidadeMIN']
    if (requiredFields.some(field => !eval(`${field}_fam`))) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
    } else if (parseInt(quantidadeMAX_fam) <= parseInt(quantidadeMIN_fam)) {
      setErrorMessage('Quantidade máxima deve ser maior que a quantidade mínima.');
    } else {
      formatFamiliaData()
      console.log('Informações da família:', matrixFamilia); //Envio para a api da familia criada
      openSnackBarMessage();
      setSnackBarMessage('Família criada com sucesso');
      setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
      var token = localStorage.getItem("loggedUserToken");
      try {
        const response = await server.post("/familia", matrixFamilia, {
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json"
          }
        });
        console.log(response);
        returnSearch();
        getFamilia()
      } catch (e) {
        console.error(e);
      }
      returnSearch();
    }
  };

  function formatFamiliaData() {
    const familiaFields = ['nome', 'quantidadeMAX', 'quantidadeMIN']
    familiaFields.forEach(field => matrixFamilia[field] = eval(`${field}_fam`))
  }

  return (
    <>
      <HeaderHomeAdmin />
      <Container className='containerDesktop'>
        <div className='boxContainerDesktop'>
          <div className="headContainerAdminDesktop">
            <div className="headContainerAdminText">
              <h2 className='body-normal text-color-5'>Categorias de caixas</h2>
              <h1 className='heading-4'>Gerenciamento de Famílias</h1>
            </div>
            <button className='button-11' onClick={() => setShowPopCreate(true)}>Cadastrar uma família</button>
          </div>
          <div className="bodyContainerDesktop">
            <div className="familyContainer">
              <div className="searchBoxFamily">
                <div className="searchBoxInputs">
                  <input type='text' placeholder="Pesquisar por nome..." className='form-3' value={searchTerm} onChange={handleSearchTermChange} />
                </div>
                <div className="searchBoxButtonsFamily">
                  <button className='button-10' onClick={handleSearchSimple}>Pesquisar</button>
                </div>
              </div>
              <FamilyTable data={resultadosPesquisa} onEdit={openEditPop} onDelete={openDeletePopup} />
            </div>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackBarMessage} message={snackBarMessage} action={alertBox} ContentProps={snackBarStyle} />
      </Container>
      <PopupCreate
        showPopCreate={showPopCreate}
        onClose={returnSearch}
        headerText="Adicionar família"
        sectionOneContent={
          <>
            <p className='body-medium margin-bottom-20'>Informações da família</p>
            <div className="createCardTopBox">
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Nome da família</span>
                <input placeholder='Digite o nome...' type="text" className='form-1' value={nome_fam} onChange={(e) => setFamilyName(e.target.value)} />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Quantidade máxima / esperada</span>
                <input placeholder='Digite um valor...' className='form-1' value={quantidadeMAX_fam} onChange={(e) => setFamilyquantidadeMAX(e.target.value)} type='number' />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Quantidade mínima</span>
                <input placeholder='Digite um valor...' className='form-1' value={quantidadeMIN_fam} onChange={(e) => setFamilyquantidadeMIN(e.target.value)} type='number' />
              </div>
            </div>
          </>
        }
        onSubmit={handleCreateFamily}
        errorMessage={errorMessage}
      />
      <PopUpEdit
        showPopEdit={showPopEdit}
        headerText="Editar família"
        onClose={returnSearch}
        sectionOneContent={
          <>
            <p className='body-medium margin-bottom-20'>Informações da família</p>
            <div className="editCardTopBox">
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Nome da família</span>
                <input placeholder='Digite o nome...' className='form-1' value={familyDataEdit.nome} onChange={(e) => setFamilyDataEdit({ ...familyDataEdit, nome: e.target.value })} />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Quantidade máxima / esperada</span>
                <input placeholder='Digite um valor...' className='form-1' value={familyDataEdit.quantidadeMAX} onChange={(e) => setFamilyDataEdit({ ...familyDataEdit, quantidadeMAX: e.target.value })} />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Quantidade mínima</span>
                <input placeholder='Digite um valor...' className='form-1' value={familyDataEdit.quantidadeMIN} onChange={(e) => setFamilyDataEdit({ ...familyDataEdit, quantidadeMIN: e.target.value })} />
              </div>
            </div>
          </>
        }
        onSubmit={handleEditFamily}
        errorMessage={errorMessage}
      />
      {showPopDelete && (
        <div className="popUpView">
          <div className="popUpDeleteCard">
            <div className="popUpSearchBody">
              <div className="viewFamilyCardTop">
                <p className='body-large text-align-center margin-bottom-10'>Tem certeza que deseja deletar a família: <strong>{familyDataDelete.nome}</strong>?</p>
                <p className='body-light text-align-center margin-bottom-20'>Esta ação não pode ser desfeita.</p>
              </div>
            </div >
            <div className='popUpDeleteButtons'>
              <button className='button-8' disabled={false} onClick={returnSearch} >
                Cancelar
              </button>
              <button className='button-9' disabled={false} variant="outlined" onClick={handleDeleteFamily} >
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

export default FamilyAdmin