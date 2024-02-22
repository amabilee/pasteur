import React, { useState, useEffect } from 'react';
import HeaderHomeAdmin from '../../components/headers/adminHomeindex';
import { Container } from 'react-bootstrap';
import viewIcon from '../../assets/viewIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './style.css';

//Component
import PopupCreate from '../../components/popCreate'
import PopUpEdit from '../../components/popEdit'

const FamilyTable = ({ data, onEdit, onDelete }) => (
  <table className='table table-sm tableFamilies'>
    <thead>
      <tr>
        <th scope="col">NOME</th>
        <th scope="col">QUANTIDADE ESPERADA</th>
        <th scope="col">MÁXIMO</th>
        <th scope="col">MÍNIMO</th>
        <th scope="col">AÇÕES</th>
      </tr>
    </thead>
    <tbody>
      {data.map((objetos, index) => (
        <tr key={index}>
          <td>{objetos.nome}</td>
          <td>{objetos.quantBase}</td>
          <td>{objetos.quantMax}</td>
          <td>{objetos.quantMin}</td>
          <td>
            <button className='button-13' onClick={() => onEdit(objetos)}><img src={viewIcon} /></button>
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
  const [quantBase_fam, setFamilyQuantBase] = useState('');
  const [quantMax_fam, setFamilyQuantMax] = useState('');
  const [quantMin_fam, setFamilyQuantMin] = useState('');
  const [familyDataEdit, setFamilyDataEdit] = useState({ nome: '', quantBase: '', quantMax: '', quantMin: '' });
  const [familyDataEditBefore, setFamilyDataEditBefore] = useState({ nome: '', quantBase: '', quantMax: '', quantMin: '' });
  const [familyDataDelete, setFamilyDataDelete] = useState({ nome: '', quantBase: '', quantMax: '', quantMin: '' });
  var matrixFamilia = { nome: '', quantBase: '', quantMin: '', quantMax: '' }
  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarStyle, setSnackBarStyle] = useState({
    sx: { background: 'white', color: 'black', borderRadius: '10px' }
  });
  var families = [
    { nome: 'Cirúrgica', quantBase: '20', quantMax: '20', quantMin: '17' },
    { nome: 'Dentística', quantBase: '20', quantMax: '20', quantMin: '11' },
    { nome: 'Implante Dentário', quantBase: '20', quantMax: '20', quantMin: '15' },
    { nome: 'Ortodontia', quantBase: '20', quantMax: '20', quantMin: '18' },
    { nome: 'Endodontia', quantBase: '20', quantMax: '20', quantMin: '16' },
    { nome: 'Periodontia', quantBase: '20', quantMax: '20', quantMin: '12' },
    { nome: 'Prótese Dentária', quantBase: '20', quantMax: '20', quantMin: '14' },
    { nome: 'Radiologia Odontológica', quantBase: '20', quantMax: '20', quantMin: '10' },
    { nome: 'Odontopediatria', quantBase: '20', quantMax: '20', quantMin: '13' },
    { nome: 'Cirurgia Bucomaxilofacial', quantBase: '20', quantMax: '20', quantMin: '16' },
    { nome: 'Odontologia Estética', quantBase: '20', quantMax: '20', quantMin: '14' },
    { nome: 'Ortopedia Funcional dos Maxilares', quantBase: '20', quantMax: '20', quantMin: '17' },
    { nome: 'Oclusão', quantBase: '20', quantMax: '20', quantMin: '15' },
    { nome: 'Odontologia do Trabalho', quantBase: '20', quantMax: '20', quantMin: '13' },
    { nome: 'Farmacologia em Odontologia', quantBase: '20', quantMax: '20', quantMin: '11' },
    { nome: 'Odontologia Legal', quantBase: '20', quantMax: '20', quantMin: '10' },
    { nome: 'Anatomia Dental', quantBase: '20', quantMax: '20', quantMin: '18' },
    { nome: 'Microbiologia Oral', quantBase: '20', quantMax: '20', quantMin: '16' },
    { nome: 'Patologia Oral', quantBase: '20', quantMax: '20', quantMin: '12' },
    { nome: 'Cariologia', quantBase: '20', quantMax: '20', quantMin: '14' },
    { nome: 'Materiais Dentários', quantBase: '20', quantMax: '20', quantMin: '11' }
  ]

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
    const resultadosFiltrados = families.filter(obj => {
      if (searchTerm === '') return true;
      return obj.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
    });
    setResultadosPesquisa(resultadosFiltrados);
  };

  useEffect(() => {
    setResultadosPesquisa(families);
  }, []);

  const returnSearch = () => {
    setShowPopCreate(false);
    setShowPopEdit(false);
    setShowPopDelete(false);
    setSearchTerm('');
    setFamilyDataEdit({ nome: '', quantBase: '', quantMax: '', quantMin: '' });
    setFamilyDataDelete({ nome: '', quantBase: '', quantMax: '', quantMin: '' });
    setFamilyDataEditBefore({ nome: '', quantBase: '', quantMax: '', quantMin: '' });
    setErrorMessage('');
    setFamilyName('');
    setFamilyQuantBase('')
    setFamilyQuantMax('')
    setFamilyQuantMin('');
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

  const handleEditFamily = () => {
    const requiredFields = ['nome', 'quantBase', 'quantMax', 'quantMin']
    if (requiredFields.some(field => !familyDataEdit[field])) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
    } else if (parseInt(familyDataEdit.quantMax) <= parseInt(familyDataEdit.quantMin)) {
      setErrorMessage('Quantidade máxima deve ser maior que a quantidade mínima.');
    } else {
      openSnackBarMessage();
      setSnackBarMessage('Família editada com sucesso');
      setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
      console.log('Informações antigas da família editada:', familyDataEditBefore);
      console.log('Novas informações da família editada:', familyDataEdit);
      returnSearch();
    }
  };

  //Delete Familia

  const openDeletePopup = (originalData) => {
    setFamilyDataDelete({ ...originalData });
    setShowPopEdit(false);
    setShowPopCreate(false);
    setShowPopDelete(true);
  };

  const handleDeleteFamily = () => {
    openSnackBarMessage();
    setSnackBarMessage('Família deletada com sucesso');
    setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
    console.log('Informações da família deletada:', familyDataDelete);
    returnSearch();
  };

  //Criar Familia

  const handleCreateFamily = () => {
    const requiredFields = ['nome', 'quantBase', 'quantMax', 'quantMin']
    if (requiredFields.some(field => !eval(`${field}_fam`))) {
      setErrorMessage('Preencha todos os campos antes de adicionar.');
    } else if (parseInt(quantMax_fam) <= parseInt(quantMin_fam)) {
      setErrorMessage('Quantidade máxima deve ser maior que a quantidade mínima.');
    } else {
      formatFamiliaData()
      console.log('Informações da família:', matrixFamilia);
      openSnackBarMessage();
      setSnackBarMessage('Família criada com sucesso');
      setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
      returnSearch();
    }
  };

  function formatFamiliaData() {
    const familiaFields = ['nome', 'quantBase', 'quantMax', 'quantMin']
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
                <span className='body-normal margin-bottom-5'>Quantidade esperada</span>
                <input placeholder='Digite um valor...' className='form-1' value={quantBase_fam} onChange={(e) => setFamilyQuantBase(e.target.value)} type='number' />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Quantidade máxima</span>
                <input placeholder='Digite um valor...' className='form-1' value={quantMax_fam} onChange={(e) => setFamilyQuantMax(e.target.value)} type='number' />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Quantidade mínima</span>
                <input placeholder='Digite um valor...' className='form-1' value={quantMin_fam} onChange={(e) => setFamilyQuantMin(e.target.value)} type='number' />
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
                <input placeholder='Digite o nome...' className='form-1' value={familyDataEdit.nome} onChange={(e) => setFamilyDataEdit({ ...familyDataEdit, familyName: e.target.value })} />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Quantidade esperada</span>
                <input placeholder='Digite um valor...' className='form-1' value={familyDataEdit.quantBase} onChange={(e) => setFamilyDataEdit({ ...familyDataEdit, quantBase: e.target.value })} />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Quantidade máxima</span>
                <input placeholder='Digite um valor...' className='form-1' value={familyDataEdit.quantMax} onChange={(e) => setFamilyDataEdit({ ...familyDataEdit, quantMax: e.target.value })} />
              </div>
              <div className='searchForms'>
                <span className='body-normal margin-bottom-5'>Quantidade mínima</span>
                <input placeholder='Digite um valor...' className='form-1' value={familyDataEdit.quantMin} onChange={(e) => setFamilyDataEdit({ ...familyDataEdit, quantMin: e.target.value })} />
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