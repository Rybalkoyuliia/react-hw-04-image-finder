import React from 'react';
import s from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends React.Component {
  render() {
    const { webformatURL, tags, openModal, largeImageURL, id } = this.props;
    return (
      <li
        className={s.gallery_item}
        onClick={() => openModal({ tags, largeImageURL, id })}
      >
        <img className={s.gallery_item_image} src={webformatURL} alt={tags} />
      </li>
    );
  }
}
