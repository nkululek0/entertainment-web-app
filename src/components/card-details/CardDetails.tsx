import style from './CardDetails.module.css';

type CardDetailsProps = {
  backdropPath: string;
  genres: Array<{ id: number, name: string }>;
  overview: string;
  posterPath: string;
  releaseDate?: string;
  firstAirDate?: string;
  status?: string;
  tagline: string;
  title?: string;
  name?: string;
  video?: boolean;
  voteAverage: number;
};

const imageBaseURL = 'https://image.tmdb.org/t/p/original';

export function CardDetails(props: CardDetailsProps) {
  const { backdropPath, genres, overview, posterPath, releaseDate, firstAirDate, tagline, title, name, voteAverage } = props;
  const cardTitle = title ?? name;
  const showDate = releaseDate?.split('-')[0] ?? firstAirDate?.split('-')[0];
  const showGenres = genres.map(genre => genre.name).join(', ');

  return (
    <>
      <section className={ style['card-details-wrapper'] }>
        <section className='media-wrapper'>
          <div className='media'>
            <div className='media-first-child'>
              <div className={ style['poster-container'] }>
                <img src={ imageBaseURL + posterPath } alt={ cardTitle } />
              </div>
              <div className={ style['backdrop-container'] }>
                <img src={ imageBaseURL + backdropPath } alt='' />
              </div>
            </div>
            <div className={ style['rating-container'] }>
              <span>{ Number(voteAverage.toFixed(1)) * 10 }%</span>
            </div>
            <div className={ style['card-title-container'] }>
              <div className={ style['card-title-wrapper'] }>
                <h2 className={ style['card-title'] }>{ cardTitle } ({ showDate })</h2>
                <div className={ style['cart-title-underline'] }></div>
              </div>
            </div>
          </div>
        </section>
        <section className={ style['overview-wrapper'] }>
          <p className={ style['tagline'] }>{ tagline }</p>
          <div className={ style['overview'] }>
            <h3>Overview</h3>
            <p>{ overview }</p>
          </div>
          <div className={ style['genre'] }>
            <h3>Genres</h3>
            <p>{ showGenres }</p>
          </div>
        </section>
      </section>
      <section
        className={ style['card-details-wrapper-desktop'] }
        style={{
          backgroundImage: `url(${ imageBaseURL + backdropPath })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={ style['card-details-background-overlay-desktop'] }>
          <div className={ style['poster-container-desktop'] }>
            <img src={ imageBaseURL + posterPath } alt={ cardTitle } />
          </div>
          <section className={ style['content-wrapper-desktop'] }>
            <div className={ style['card-title-container'] }>
              <div className={ style['card-title-wrapper'] }>
                <h2 className={ style['card-title'] }>{ cardTitle } ({ showDate })</h2>
                <div className={ style['cart-title-underline'] }></div>
              </div>
            </div>
            <div className={ style['rating-container-desktop'] }>
              <span>{ Number(voteAverage.toFixed(1)) * 10 }%</span>
            </div>
            <div className={ style['overview'] }>
              <p className={ style['tagline-desktop'] }>{ tagline }</p>
              <h3>Overview</h3>
              <p>{ overview }</p>
            </div>
            <div className={ style['genre'] }>
              <h3>Genres</h3>
              <p>{ showGenres }</p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};