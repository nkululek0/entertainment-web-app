import { type UseNavigateResult } from '@tanstack/react-router';

import type { PageNavigationSymbols } from './Pagination.types';

type NavigationPaths = '/' | '/movies' | '/tv-series' | '/bookmark' | '/search';

export const handlePageChange = (navigate: UseNavigateResult<NavigationPaths>, pageSymbol: PageNavigationSymbols, page: number, totalPages: number) => {
  if (pageSymbol == '&laquo;') {
    navigate({ search: { page: 1 } });
  }
  else if (pageSymbol == '&lsaquo;') {
    if (page != 1) {
      navigate({ search: { page: page - 1 } });
    }
 }
  else if (pageSymbol == '&rsaquo;') {
    if (page != totalPages) {
      navigate({ search: { page: page + 1 } });
    }
  }
  else if (pageSymbol == '&raquo;') {
    navigate({ search: { page: totalPages } });
  }
  else {
    navigate({ search: { page: pageSymbol } });
  }
};