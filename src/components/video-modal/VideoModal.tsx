import type { ModalDetails } from './VideoModal.types';
import style from './VideoModal.module.css';

type VideoModalProps = ModalDetails & {
  isActive: boolean
  closeModal: () => void
};

export function VideoModal(props: VideoModalProps) {
  const { title, iframeSrc, isActive, closeModal } = props;

  return (
    <div
      className={ `${ style['modal-overlay'] } ${ isActive ? style['active'] : '' }` }
    >
      <div className={ style['modal'] }>
        <header>
          <h5 className={ style['modal-title'] }>{ title }</h5>
          <button onClick={ closeModal }>&#10005;</button>
        </header>
        <section className={ style['modal-content'] }>
          <iframe
            src={ iframeSrc }
            frameBorder='0'
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </section>
      </div>
    </div>
  );
};