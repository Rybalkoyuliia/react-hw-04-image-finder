import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import React from 'react';

export class ImageGallery extends React.Component {
  render() {
    const { images, openModal } = this.props;
    return (
      <ul className={s.gallery}>
        {images.map(image => (
          <ImageGalleryItem key={image.id} {...image} openModal={openModal} />
        ))}
      </ul>
    );
  }
}
