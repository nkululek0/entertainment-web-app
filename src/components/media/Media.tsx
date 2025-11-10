import type { MediaItem } from '@/api/types';

import style from './Media.module.css';

type MediaProps = MediaItem & {
  type: 'primary' | 'secondary'
};

const icons = {
  movie: (<svg viewBox='0 0 20 20' width='10' height='10' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z'
      fill='#FFF'
    />
  </svg>),
  tv: (<svg viewBox='0 0 20 20' width='10' height='10' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z'
      fill='#FFF'
    />
  </svg>),
  star: (<svg viewBox="0 0 20 20" width='10' height='10' xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
        stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </g>
  </svg>),
  bookmark: {
    filled: (<div className={ style['bookmark-container'] }>
      <svg viewBox='-4 -4 20 20' width='20' height='18' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z'
          fill='#FFF'
        />
      </svg>
    </div>),
    empty: (<div className={ style['bookmark-container'] }>
      <svg viewBox='-4 -4 20 20' width='20' height='18' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z'
          fill='none'
          stroke='#FFF'
          strokeWidth='2px'
        />
      </svg>
    </div>)
  }
};

export function Media(props: MediaProps) {
  const { type, title, year, category, rating, isBookmarked, thumbnail } = props;
  const screenWidth = window.innerWidth;

  return (
    <>
      {  type == 'primary' &&
        <article
          style={{
            backgroundImage: screenWidth >= 768 ? `url(${ thumbnail.trending?.large })` :  `url(${ thumbnail.trending?.small })`,
            backgroundSize: 'cover'
          }}
          className={ style[type] }
        >
          <h4>{ title }</h4>
          <div className={ style['info-and-bookmark-container'] }>
            <section className={ style['info'] }>
              <p>{ year }</p>
              <p className={ style['category'] }>
                <span>{ category === 'Movie' ? icons.movie : icons.tv }</span>
                <span>{ category }</span>
              </p>
              <p>{ icons.star }</p>
            </section>
            { isBookmarked ? icons.bookmark.filled : icons.bookmark.empty }
          </div>
        </article>
      }
      {
        type == 'secondary' &&
        <article className={ style[type] }>
          <h4>{ title }</h4>
          <section className={ style['info-secondary'] }>
            <p>{ year }</p>
            <p className={ style['category-secondary'] }>
              <span>{ category === 'Movie' ? icons.movie : icons.tv }</span>
              <span>{ category }</span>
            </p>
            <p>{ rating }</p>
          </section>
          <div
            className={ style['background'] }
            style={{
              backgroundImage: screenWidth >= 768 ? `url(${ thumbnail.regular.large })` : `url(${ thumbnail.regular.small })`,
              backgroundSize: 'cover' }}
          >
            { isBookmarked ? icons.bookmark.filled : icons.bookmark.empty }
          </div>
        </article>
      }
    </>
  );
};

type CardProps = {
  type: 'primary' | 'secondary'
  media_type?: 'movie' | 'tv'
  title?: string
  name?: string
  release_date?: string
  first_air_date?: string
  poster_path: string
  vote_average: number
};

export function Card(props: CardProps) {
  const { type, media_type, title, name, release_date, first_air_date, poster_path, vote_average } = props;
  const imageBaseURL = 'https://image.tmdb.org/t/p/original';

  return (
    <>
      {  type == 'primary' &&
        <article
          style={{
            backgroundImage: `url(${ imageBaseURL + poster_path })`,
            backgroundSize: 'cover'
          }}
          className={ style[type] }
        >
          <h4>{ media_type == 'movie' ? title : name }</h4>
          <div className={ style['info-and-bookmark-container'] }>
            <section className={ style['info'] }>
              <p>{ media_type == 'movie' ? release_date?.split('-')[0] : first_air_date?.split('-')[0] }</p>
              <p className={ style['category'] }>
                <span>{ media_type == 'movie' ? icons.movie : icons.tv }</span>
                <span>{ media_type == 'movie' ? 'Movie' : 'TV Series' }</span>
              </p>
              <p>{ icons.star } { vote_average.toFixed(1) }</p>
            </section>
            { icons.bookmark.empty }
          </div>
        </article>
      }
      {
        type == 'secondary' &&
        <article className={ style[type] }>
          <h4>{  title ? title : name }</h4>
          <section className={ style['info-secondary'] }>
            <p>{ title ? release_date?.split('-')[0] : first_air_date?.split('-')[0] }</p>
            <p className={ style['category-secondary'] }>
              <span>{ title ? icons.movie : icons.tv }</span>
              <span>{ title ? 'Movie' : 'TV Series' }</span>
            </p>
            <p>{ icons.star } { vote_average.toFixed(1) }</p>
          </section>
          <div
            className={ style['background'] }
            style={{
              backgroundImage: `url(${ imageBaseURL + poster_path })`,
              backgroundSize: 'cover' }}
          >
            { icons.bookmark.empty }
          </div>
        </article>
      }
    </>
  );
};