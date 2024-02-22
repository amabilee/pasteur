import React, { useState, useEffect } from 'react';

const PopupCreate = ({
    showPopCreate,
    onClose,
    headerText,
    sectionOneContent,
    onSubmit,
    errorMessage,
    onChangeSection,
}) => {
    const [showSectionOne, setShowSectionOne] = useState(true);

    useEffect(() => {
        if (onChangeSection) {
            onChangeSection(showSectionOne);
        }
    }, [showSectionOne, onChangeSection]);

    const changeFormSectionOne = () => {
        setShowSectionOne(true);
    };

    const changeFormSectionTwo = () => {
        setShowSectionOne(false);
    };

    // useEffect(() => {
    //     setShowSectionOne(true)
    // }, [onClose]);

    return showPopCreate ? (
        <div className="popUpView">
          <div className="popUpViewCard">
            <div className="popUpViewHead">
              <h1 className='heading-4'>{headerText}<br /><span className='body-normal text-color-5'>Todos os campos requerem preenchimento.</span></h1>
              <button className='button-7' onClick={onClose}>Voltar</button>
            </div>
            <div className="popUpViewBody">
              <div className="viewFamilyCardTop">
                {sectionOneContent}
              </div>
            </div >
            <div className='errorContainer' style={{ position: 'relative', zIndex: 1 }}>
              {errorMessage && (
                <p className="error-message-colab" style={{ position: 'absolute', top: 0, left: 0 }}>
                  {errorMessage}
                </p>
              )}
              <div className='popUpViewButtons'>
                <button className='button-10 margin-right-30' disabled={false} variant="outlined" onClick={onSubmit}>
                  Adicionar
                </button>
              </div>
            </div>
          </div >
        </div >
    ) : null;
};

export default PopupCreate;
