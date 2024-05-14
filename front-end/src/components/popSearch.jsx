import PropTypes from 'prop-types';

const PopUpSearch = ({
  showPopSearch,
  sectionOneContent,
  onSubmit,
  errorMessage,
  onClose,
}) => {
  if (!showPopSearch) {
    return null;
  }

  return (
    <div className="popUpSearch">
      <div className="popUpSearchCard">
        <div className="popUpSearchHead">
          <h1 className='heading-4'>
            Pesquisa avançada<br />
            <span className='body-normal text-color-5'>Nem todos os campos requerem preenchimento.</span>
          </h1>
          <button className='button-7' onClick={onClose}>Voltar</button>
        </div>
        <div className="popUpSearchBody">
          {sectionOneContent}
        </div>
        <div className='errorContainer' style={{ position: 'relative', zIndex: 1 }}>
          {errorMessage && (
            <p className="error-message-colab" style={{ position: 'absolute', top: 0, left: 0 }}>
              {errorMessage}
            </p>
          )}
          <div className='popUpViewButtons'>
            <button className='button-10 margin-right-30' onClick={onSubmit}>
              Pesquisar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PopUpSearch.propTypes = {
  showPopSearch: PropTypes.bool.isRequired,
  sectionOneContent: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default PopUpSearch;