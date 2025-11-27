import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import ScrollContainer from 'react-indiana-drag-scroll';

import { type ShowCast } from '@/api/types';

import { LoadSpinner } from '@/components/load-spinner';
import { CardDetails } from '@/components/card-details';
import { CastCard } from '@/components/cast-card';

import API from '@/api/api';

type ShowType = 'movie' | 'tv';

export const Route = createFileRoute('/show-details/$type/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const [showDetails, showCast] = await Promise.all([
      await API.getShowDetails(params.type as ShowType, Number(params.id)),
      await API.getShowCast(params.type as ShowType, Number(params.id))
    ]);

    return {
      showDetails: showDetails,
      showCast: showCast
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

function RouteComponent() {
  const { showDetails, showCast } = useLoaderData({ from: '/show-details/$type/$id' });

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
          <ScrollContainer className="scroll-container cast-slideshow">
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
    </section>
  );
}