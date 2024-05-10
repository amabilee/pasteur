import PropTypes from 'prop-types';

const PopUpEdit = ({
  showPopEdit,
  onClose,
  headerText,
  sectionOneContent,
  onSubmit,
  errorMessage,
}) => {
  if (!showPopEdit) {
    return null;
  }

  return (
    <div className="popUpView">
      <div className="popUpViewCard">
        <div className="popUpViewHead">
          <h1 className='heading-4'>
            {headerText}
            <br />
            <span className='body-normal text-color-5'>Todos os campos requerem preenchimento.</span>
          </h1>
          <button className='button-7' onClick={onClose}>Voltar</button>
        </div>
        <div className="popUpViewAdminBody">
          <div className="viewFamilyCardTop">
            {sectionOneContent}
          </div>
        </div>
        <div className='errorContainer' style={{ position: 'relative', zIndex: 1 }}>
          {errorMessage && (
            <p className="error-message-colab" style={{ position: 'absolute', top: 0, left: 0 }}>
              {errorMessage}
            </p>
          )}
          <div className='popUpViewButtons'>
            <button className='button-10 margin-right-30' onClick={onSubmit}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PopUpEdit.propTypes = {
  showPopEdit: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  sectionOneContent: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default PopUpEdit;