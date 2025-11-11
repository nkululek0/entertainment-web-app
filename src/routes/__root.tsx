import { useRef } from 'react';

import { createRootRoute, Link, Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Search } from '@/components/search';

import Avatar from '@/assets/image-avatar.png';

const colours = {
  white: '#fff',
  blue: '#5A698F',
  red: '#FC4747',
};

type SearchPlaceHolderText = {
  [key: string]: string
  '/': string
  '/movies': string
  '/tv-series': string
  '/bookmark': string
};

const searchPlaceHolderText: SearchPlaceHolderText = {
  '/': 'Search for movies or TV series',
  '/movies': 'Search for movies',
  '/tv-series': 'Search for TV series',
  '/bookmark': 'Search for bookmarked shows'
};

type SearchCategory = {
  [key: string]: string
  '/movies': string
  '/tv-series': string
};

const searchCategory: SearchCategory = {
  '/movies': 'Movie',
  '/tv-series': 'TV Series'
};

function RootLayout() {
  const searchRef = useRef('');
  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });
  const previousLocation = useRef<string>('');

  if (Object.values(location.search).length > 0) {
    const search = location.search;

    if (search.category) {
      if (search.category == 'Movie') previousLocation.current = '/movies';
      else previousLocation.current = '/tv-series';
    }
    if (search.isBookmarked) previousLocation.current = '/bookmark';
  }
  else {
    if (!previousLocation.current || previousLocation.current != location.pathname) {
      previousLocation.current = location.pathname;
    }
  }

  const searchPlaceHolder = searchPlaceHolderText[previousLocation.current];

  const handleSearch = (searchInput: string) => {
    searchRef.current = searchInput;
    navigate({
      from: '/search',
      search: {
        query: searchRef.current,
        category: searchCategory[previousLocation.current],
        isBookmarked: previousLocation.current == '/bookmark'
      }
    });
  };

  return (
    <>
      <nav id='page-navigator-wrapper'>
        <svg width='33' height='27' xmlns='http://www.w3.org/2000/svg'>
          <path d='m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z'
          fill={ colours.red }/>
        </svg>
        <ol>
          <li>
            <Link to='/'>
              {
                () => {
                  return (
                    <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z'
                        fill={ previousLocation.current == '/' ? colours.white: colours.blue }
                      />
                    </svg>
                  );
                }
              }
            </Link>
          </li>
          <li>
            <Link to='/movies'>
              {
                () => {
                  return (
                    <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z'
                        fill={ previousLocation.current == '/movies' ? colours.white: colours.blue }
                      />
                    </svg>
                  );
                }
              }
            </Link>
          </li>
          <li>
            <Link to='/tv-series'>
              {
                () => {
                  return (
                    <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z'
                        fill={ previousLocation.current == '/tv-series' ? colours.white: colours.blue }
                      />
                    </svg>
                  );
                }
              }
            </Link>
          </li>
          <li>
            {/* <Link to='/bookmark'>
              {
                () => {
                  return (
                    <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z'
                        fill={ previousLocation.current == '/bookmark' ? colours.white: colours.blue }
                      />
                    </svg>
                  );
                }
              }
            </Link> */}
          </li>
        </ol>
        <div className='profile-image-container'>
          <img src={ Avatar } alt='profile image' className='profile-image' />
        </div>
      </nav>
      <div className="page-wrapper">
        <Link
          to='/search'
          search={{
            query: searchRef.current,
            category: searchCategory[previousLocation.current],
            isBookmarked: previousLocation.current == '/bookmark'
          }}
        >
          <Search
            search={ searchRef.current }
            onSearch={ handleSearch }
            placeHolderText={ searchPlaceHolder }
          />
        </Link>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });