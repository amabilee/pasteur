import React from 'react';

const PopUpSearch = ({
  showPopSearch,
  headerText,
  sectionOneContent,
  onSubmit,
  errorMessage,
  onClose
}) => {
  return (
    showPopSearch && (
      <div className="popUpSearch">
        <div className="popUpSearchCard">
          <div className="popUpSearchHead">
            <h1 className='heading-4'>Pesquisa avançada<br />
              <span className='body-normal text-color-5'>Nem todos os campos requerem preenchimento.</span></h1>
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
              <button className='button-10 margin-right-30' disabled={false} onClick={onSubmit} variant="outlined" >
                Pesquisar
              </button>
            </div>
          </div>
        </div >
      </div >
    )
  );
};

export default PopUpSearch;
