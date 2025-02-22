import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import React from 'react';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.gallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} {...image} openModal={openModal} />
      ))}
    </ul>
  );
};
