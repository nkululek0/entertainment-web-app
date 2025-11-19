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

export function CardDetails(props: CardDetailsProps) {
  const { backdropPath, genres, overview, posterPath, releaseDate, firstAirDate, status, tagline, title, name, video, voteAverage } = props;
  const cardTitle = title ?? name;
  const imageBaseURL = 'https://image.tmdb.org/t/p/original';

  return (
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
          <h2 className={ style['card-title'] }>{ cardTitle }</h2>
        </div>
      </section>
      <section className='overview-wrapper'></section>
    </section>
  );
};