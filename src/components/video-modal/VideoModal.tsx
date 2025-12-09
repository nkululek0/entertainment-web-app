import React from 'react';

import type { ModalDetails } from './VideoModal.types';
import style from './VideoModal.module.css';

type VideoModalProps = ModalDetails & {
  closeButton: React.JSX.Element
  isActive: boolean
};

export function VideoModal(props: VideoModalProps) {
  const { title, iframeSrc, isActive, closeButton } = props;

  return (
    <div
      className={ `${ style['modal-overlay'] } ${ isActive ? style['active'] : '' }` }
    >
      <div className={ style['modal'] }>
        <header>
          <h5 className={ style['modal-title'] }>{ title }</h5>
          { closeButton }
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