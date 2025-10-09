import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = "",
  showBackButton = false
}) => {
  // Don't render pagination if there's only one page or no pages, unless we need to show back button
  if (totalPages <= 1 && !showBackButton) return null;

  // Calculate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Show first pages + ellipsis + last page
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first + ellipsis + current range + ellipsis + last
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // If we only need to show back button (when no blogs found on current page)
  if (showBackButton && currentPage > 1) {
    return (
      <div className={`pagination-container ${className}`}>
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => onPageChange(currentPage - 1)}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              borderRadius: '0.5rem',
              borderColor: '#7ab751',
              color: '#7ab751'
            }}
          >
            ← Back to Previous Page
          </button>
          <div className="mt-3">
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
              No blogs found on this page. Return to page {currentPage - 1} to see blogs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pagination-container ${className}`}>
      <nav aria-label="Blog pagination">
        <ul className="pagination justify-content-center mb-0">
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => (
            <li key={index} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              {page === '...' ? (
                <span className="page-link" style={{ cursor: 'default' }}>
                  ...
                </span>
              ) : (
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

          {/* Next Button */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Page Info */}
      <div className="text-center mt-3">
        <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
          Page {currentPage} of {totalPages}
        </p>
      </div>

      <style jsx>{`
        .pagination-container {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e9ecef;
        }

        .pagination .page-link {
          color: #6c757d;
          background-color: #fff;
          border: 1px solid #dee2e6;
          margin: 0 2px;
          border-radius: 0.375rem;
          transition: all 0.15s ease-in-out;
        }

        .pagination .page-link:hover {
          color: #7ab751;
          background-color: #f8f9fa;
          border-color: #7ab751;
        }

        .pagination .page-item.active .page-link {
          color: #fff;
          background-color: #7ab751;
          border-color: #7ab751;
        }

        .pagination .page-item.disabled .page-link {
          color: #6c757d;
          background-color: #fff;
          border-color: #dee2e6;
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination .page-item.disabled .page-link:hover {
          color: #6c757d;
          background-color: #fff;
          border-color: #dee2e6;
        }

        @media (max-width: 576px) {
          .pagination .page-link {
            padding: 0.375rem 0.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Pagination;
