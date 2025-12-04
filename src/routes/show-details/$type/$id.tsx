import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useState } from 'react';

import { type ShowCast, type ShowImages } from '@/api/types';

import { LoadSpinner } from '@/components/load-spinner';
import { CardDetails } from '@/components/card-details';
import { CastCard } from '@/components/cast-card';

import API from '@/api/api';

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

type ShowType = 'movie' | 'tv';

export const Route = createFileRoute('/show-details/$type/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const [showDetails, showCast, showImages] = await Promise.all([
      await API.getShowDetails(params.type as ShowType, Number(params.id)),
      await API.getShowCast(params.type as ShowType, Number(params.id)),
      await API.getShowImages(params.type as ShowType, Number(params.id))
    ]);

    if (!showDetails || !showCast || !showImages) throw new Error();

    showImages.backdrops.sort((a, b) => b.vote_average - a.vote_average);
    showImages.backdrops = showImages.backdrops.slice(0, 5);
    showImages.posters.sort((a, b) => b.vote_average - a.vote_average).slice(0, 5);
    showImages.posters = showImages.posters.slice(0, 5);

    return {
      showDetails: showDetails,
      showCast: showCast,
      showImages: showImages
    };
  },
  pendingComponent: () => {
      return (
        <div className='loading'>
          <LoadSpinner width={ 82 } height={ 82 } />
        </div>
      );
    },
    errorComponent: () => {
      return (
        <div className='error'>
          <h2>There was an issue loading the show details data :(</h2>
        </div>
      );
    }
});

type MediaSlideType = 'video' |'backdrop' | 'poster';
const slideShowMediaImage = (image: ShowImages['backdrops'][0] | ShowImages['posters'][0], index: number) => {
  return (
    <img
      key={ index }
      src={ `${ IMAGE_BASE_URL }/${ image.file_path }` }
      alt={ image.file_path }
      className='media-slideshow-image'
    />
  );
};

function RouteComponent() {
  const { showDetails, showCast, showImages } = useLoaderData({ from: '/show-details/$type/$id' });
  const [activeSlide, setActiveSlide] = useState<MediaSlideType>('backdrop');

  return (
    <section className='show-details-wrapper'>
      <div className='details'>
        <CardDetails
          backdropPath={ showDetails.backdrop_path }
          genres={ showDetails.genres }
          overview={ showDetails.overview }
          posterPath={ showDetails.poster_path }
          releaseDate={ showDetails.release_date }
          firstAirDate={ showDetails.first_air_date }
          status={ showDetails.status }
          tagline={ showDetails.tagline }
          title={ showDetails.title }
          name={ showDetails.name }
          video={ showDetails.video }
          voteAverage={ showDetails.vote_average }
        />
      </div>
      <div className='cast-wrapper'>
        <h3>Cast</h3>
        <div className='cast-slideshow-container'>
          <ScrollContainer className='scroll-container cast-slideshow'>
            {
              showCast.cast.map((cast: ShowCast['cast'][0], index: number) => {
                return (
                  <CastCard
                    key={ index }
                    id={ cast.id }
                    gender={ cast.gender }
                    name={ cast.name }
                    profile_path={ cast.profile_path }
                    character={ cast.character }
                    order={ cast.order }
                  />
                );
              })
            }
          </ScrollContainer>
        </div>
      </div>
      <div className='show-media-wrapper'>
        <h3>Media</h3>
        <menu className='media-menu'>
          <ul>
            <li onClick={ () => setActiveSlide('video') } >
              <span>Videos</span>
              <div className={`menu-item-underline ${ activeSlide == 'video' && 'active' }`}></div>
            </li>
            <li onClick={ () => setActiveSlide('backdrop') }>
              <span>Backdrops</span>
              <div className={`menu-item-underline ${ activeSlide == 'backdrop' && 'active' }`}></div>
            </li>
            <li onClick={ () => setActiveSlide('poster') }>
              <span>Posters</span>
              <div className={`menu-item-underline ${ activeSlide == 'poster' && 'active' }`}></div>
            </li>
          </ul>
        </menu>
        <div className='media-slideshow-container'>
          <ScrollContainer className='scroll-container media-slideshow'>
            {
              activeSlide == 'video' && ''
            }
            {
              activeSlide == 'backdrop' &&
              showImages.backdrops.map((backdrop: ShowImages['backdrops'][0], index: number) => (
                slideShowMediaImage(backdrop, index)
              ))
            }
            {
              activeSlide == 'poster' &&
              showImages.posters.map((poster: ShowImages['posters'][0], index: number) => (
                slideShowMediaImage(poster, index)
              ))
            }
          </ScrollContainer>
        </div>
      </div>
    </section>
  );
}