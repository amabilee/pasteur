import {useEffect } from 'react';
import PropTypes from 'prop-types';

const PopupCreate = ({
  showPopCreate,
  onClose,
  headerText,
  sectionOneContent,
  onSubmit,
  errorMessage,
  onChangeSection,
}) => {
  useEffect(() => {
    if (onChangeSection) {
      onChangeSection(true);
    }
  }, [onChangeSection]);

  return showPopCreate ? (
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
        <div className="popUpViewBody">
          <div className="viewFamilyCardTop">
            {sectionOneContent} {/* Ensure this is a valid React node */}
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
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

PopupCreate.propTypes = {
  showPopCreate: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  sectionOneContent: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  onChangeSection: PropTypes.func,
};

export default PopupCreate;