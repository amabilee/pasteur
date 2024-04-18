import React, { useState } from 'react';

const Paginator = ({ currentPage, totalPages, onPageChange, disabledStatus }) => {
  const [inputPage, setInputPage] = useState('');

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
    setInputPage('');
  };

  return (
    <div className="paginator">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 || disabledStatus}>
        Voltar
      </button>
      <span className='body-normal'>Página {currentPage} de {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || disabledStatus}>
        Avançar
      </button>
    </div>
  );
};

export default Paginator;
