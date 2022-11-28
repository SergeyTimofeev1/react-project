import React from 'react';
import { getPagesArray } from '../../../utils/pages';

const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = getPagesArray(totalPages)
  return (
    <div>
      <div className="pages__wrapper">
        {pagesArray.map(p =>
          <span
            key={p}
            className={p === page ? 'pages pages__current' : 'pages'}
            onClick={() => changePage(p)}
          >
            {p}
          </span>
        )}
      </div>
    </div>
  );
}

export default Pagination;
