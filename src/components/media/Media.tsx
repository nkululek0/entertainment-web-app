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

  return (
    <>
      {  type == 'primary' &&
        <article
          style={{ backgroundImage: `url(${ thumbnail.trending?.small })`, backgroundSize: 'cover' }}
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
              <p>{ rating }</p>
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
            style={{ backgroundImage: `url(${ thumbnail.regular.small })`, backgroundSize: 'cover' }}
          >
            { isBookmarked ? icons.bookmark.filled : icons.bookmark.empty }
          </div>
        </article>
      }
    </>
  );
};