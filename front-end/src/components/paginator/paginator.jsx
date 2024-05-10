import PropTypes from 'prop-types';

const Paginator = ({ currentPage, totalPages, onPageChange, disabledStatus }) => (
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

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  disabledStatus: PropTypes.bool,
};

export default Paginator;
