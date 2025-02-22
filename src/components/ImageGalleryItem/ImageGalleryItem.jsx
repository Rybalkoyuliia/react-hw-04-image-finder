import React from 'react';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  openModal,
  largeImageURL,
  id,
}) => {
  return (
    <li
      className={s.gallery_item}
      onClick={() => openModal({ tags, largeImageURL, id })}
    >
      <img className={s.gallery_item_image} src={webformatURL} alt={tags} />
    </li>
  );
};
