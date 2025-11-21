import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import { LoadSpinner } from '@/components/load-spinner';
import { CardDetails } from '@/components/card-details';

import API from '@/api/api';

type ShowType = 'movie' | 'tv';

export const Route = createFileRoute('/show-details/$type/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const showDetails = await API.getShowDetails(params.type as ShowType, Number(params.id));

    return {
      showDetails: showDetails
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
  const { showDetails } = useLoaderData({ from: '/show-details/$type/$id' });

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
    </section>
  );
}