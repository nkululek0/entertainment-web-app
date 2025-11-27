import style from './CastCard.module.css';

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

type CastProps = {
  gender: number
  id: number
  name: string
  profile_path: string | null
  character: string
  order: number
};

export function CastCard(props: CastProps) {
  const { name, profile_path, character } = props;

  return (
    <section className={ style['cast'] }>
      <div className='image-container'>
        {
          !profile_path &&
          <div className={ style['image'] }>
            <p className={ style['no-image'] }>No Image!</p>
          </div>
        }
        {
          profile_path &&
          <img src={ IMAGE_BASE_URL + profile_path } alt={ name } className={ style['image'] } />
        }
      </div>
      <div className={ style['cast-info'] }>
        <h4>{ name }</h4>
        <p>{ character }</p>
      </div>
    </section>
  );
};