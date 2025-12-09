import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useState } from 'react';

import { type ShowCast, type ShowImages, type ShowVideo } from '@/api/types';

import { LoadSpinner } from '@/components/load-spinner';
import { CardDetails } from '@/components/card-details';
import { CastCard } from '@/components/cast-card';
import { type ModalDetails, VideoModal } from '@/components/video-modal';

import API from '@/api/api';

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

type ShowType = 'movie' | 'tv';

export const Route = createFileRoute('/show-details/$type/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const [showDetails, showCast, showImages, showVideos] = await Promise.all([
      await API.getShowDetails(params.type as ShowType, Number(params.id)),
      await API.getShowCast(params.type as ShowType, Number(params.id)),
      await API.getShowImages(params.type as ShowType, Number(params.id)),
      await API.getShowVideos(params.type as ShowType, Number(params.id))
    ]);

    if (!showDetails || !showCast || !showImages || !showVideos) throw new Error();

    showImages.backdrops.sort((a, b) => b.vote_average - a.vote_average);
    showImages.backdrops = showImages.backdrops.slice(0, 5);
    showImages.posters.sort((a, b) => b.vote_average - a.vote_average).slice(0, 5);
    showImages.posters = showImages.posters.slice(0, 5);

    return {
      showDetails: showDetails,
      showCast: showCast,
      showImages: showImages,
      showVideos: showVideos.results
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

type ImageOptions = {
  image: ShowImages['backdrops'][0] | ShowImages['posters'][0]
};

type VideoOptions = {
  video: ShowVideo['results'][0]
  setModalDetails: (title: string, iframeSrc: string) => void
};

const slideShowMediaImage = (type: 'video' | 'image', index: number, options: ImageOptions | VideoOptions) => {
  if (type == 'image') {
    const { image } = options as ImageOptions;

    return (
      <img
        key={ index }
        src={ `${ IMAGE_BASE_URL }/${ image?.file_path }` }
        alt={ image?.file_path }
        className='media-slideshow-image'
      />
    );
  }

  const { video, setModalDetails } = options as VideoOptions;

  return (
    <div
      className='media-slideshow-video-container'
      key={ index }
      onClick={ () => setModalDetails(
        video?.name,
        `https://www.youtube.com/embed/${ video?.key }`
      ) }
    >
      <img
        src={ `https://img.youtube.com/vi/${ video?.key }/mqdefault.jpg` }
        alt={ video?.name }
        className='media-slideshow-image'
      />
      <svg
        viewBox='0 0 40 40'
        width='70'
        height='70'
        xmlns='http://www.w3.org/2000/svg'
        className='media-slideshow-play-button'
      >
        <path
          d='M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z'
          fill='#FFF'
        />
      </svg>
    </div>
  );
};

type MediaSlideType = 'video' |'backdrop' | 'poster';

function RouteComponent() {
  const { showDetails, showCast, showImages, showVideos } = useLoaderData({ from: '/show-details/$type/$id' });
  const [activeSlide, setActiveSlide] = useState<MediaSlideType>('backdrop');
  const [modalDetails, setModalDetails] = useState<ModalDetails>({ title: '', iframeSrc: '' });
  const [modalState, setModalState] = useState(false);

  const handleModalDetails = (title: string, iframeSrc: string) => {
    setModalDetails({ title, iframeSrc });
    setModalState(true);
  };

  return (
    <>
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
        <article className='cast-wrapper'>
          <h3>Cast</h3>
          <section className='cast-slideshow-container'>
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
          </section>
        </article>
        <article className='show-media-wrapper'>
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
          <section className='media-slideshow-container'>
            <ScrollContainer className='scroll-container media-slideshow'>
              {
                activeSlide == 'video' && showVideos.map((video: ShowVideo['results'][0], index: number) => (
                  slideShowMediaImage('video', index, { video: video, setModalDetails: handleModalDetails })
                ))
              }
              {
                activeSlide == 'backdrop' &&
                showImages.backdrops.map((backdrop: ShowImages['backdrops'][0], index: number) => (
                  slideShowMediaImage('image', index, { image: backdrop })
                ))
              }
              {
                activeSlide == 'poster' &&
                showImages.posters.map((poster: ShowImages['posters'][0], index: number) => (
                  slideShowMediaImage('image', index, { image: poster })
                ))
              }
            </ScrollContainer>
          </section>
        </article>
      </section>
      {
        modalDetails.title &&
        <VideoModal
          title={ modalDetails.title }
          iframeSrc={ modalDetails.iframeSrc }
          isActive={ modalState }
          closeButton={ <button onClick={ () => { setModalState(false) } }>&#10005;</button> }
        />
      }
    </>
  );
}