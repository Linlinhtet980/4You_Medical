import styles from './Pagination.module.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  indexOfFirstItem, 
  indexOfLastItem, 
  totalItems 
}) => {

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Generate page numbers for buttons
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }
    return pages.filter((item, index, arr) => item !== '...' || arr[index - 1] !== '...');
  };

  if (totalItems === 0) return null;

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pageInfo}>
        Showing <span>{indexOfFirstItem + 1}</span> to <span>{Math.min(indexOfLastItem, totalItems)}</span> of <span>{totalItems}</span> results
      </div>
      
      <div className={styles.pageControls}>
        <button 
          className={styles.pageBtn} 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          title="Previous Page"
        >
          <FiChevronLeft style={{ verticalAlign: 'middle' }} />
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button 
            key={index}
            className={`${styles.pageBtn} ${currentPage === page ? styles.activePage : ''}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            style={page === '...' ? { border: 'none', backgroundColor: 'transparent' } : {}}
          >
            {page}
          </button>
        ))}

        <button 
          className={styles.pageBtn} 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          title="Next Page"
        >
          <FiChevronRight style={{ verticalAlign: 'middle' }} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
