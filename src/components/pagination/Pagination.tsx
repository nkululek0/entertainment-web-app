import _ from 'lodash';

import type { PageNavigationSymbols } from './Pagination.types';
import style from './Pagination.module.css';

const paginationRange = (totalPages: number, page: number, siblings: number): PageNavigationSymbols[] => {
  if (siblings > totalPages) return _.range(1, totalPages + 1);

  const leftSiblingsIndex = Math.max(page - siblings, 1);
  const rightSiblingsIndex = Math.min(page + siblings, totalPages);
  const showLeftDots = leftSiblingsIndex > 2;
  const showRightDots = rightSiblingsIndex < totalPages - 2;

  if(!showLeftDots && showRightDots) {
    let leftItemsCount = 3 * siblings;
    let leftRange = _.range(1, leftItemsCount + 1);

    return [...leftRange];
  }
  else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 * siblings;
    let rightRange = _.range(totalPages - rightItemsCount + 1, totalPages + 1);

    return [1, ...rightRange];
  }
  else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);

    return [1, ...middleRange];
  }
};

export type PaginationProps = {
  totalPages: number
  page: number
  siblings: number
  onPageChange: (pageSymbol: PageNavigationSymbols) => void
};

export function Pagination(props: PaginationProps) {
  const { totalPages, page, siblings, onPageChange } = props;
  const pageArray = paginationRange(totalPages, page, siblings);

  return (
    <>
      <nav className={ style['pagination-container'] }>
        <ul className={ style['pagination'] }>
          {
            page != 1 &&
            <>
              <li className={ style['page-item'] } onClick={ () => onPageChange('&laquo;') }>
                <span className={ style['page-link'] }>&laquo;</span>
              </li>
              <li className={ style['page-item'] } onClick={ () => onPageChange('&lsaquo;') }>
                <span className={ style['page-link'] }>&lsaquo;</span>
              </li>
            </>
          }
          {
            pageArray.map((item, index) => {
              if (item === page) {
                return (
                  <li
                    key={ index }
                    className={ style['page-item'] }
                    style={{ backgroundColor: '#5A698F' }}
                    onClick={ () => onPageChange(item) }
                  >
                    <span className={ style['page-link'] }>{ item }</span>
                  </li>
                );
              }
              else {
                return (
                  <li
                    key={ index }
                    className={ style['page-item'] }
                    onClick={ () => onPageChange(item) }
                  >
                    <span>{ item }</span>
                  </li>
                );
              }
            })
          }
          {
            totalPages != page &&
            <>
              <li className={ style['page-item'] } onClick={ () => onPageChange('&rsaquo;') }>
                <span className={ style['page-link'] }>&rsaquo;</span>
              </li>
              <li className={ style['page-item'] } onClick={ () => onPageChange('&raquo;') }>
                <span className={ style['page-link'] }>&raquo;</span>
              </li>
            </>
          }
        </ul>
      </nav>
    </>
  );
};