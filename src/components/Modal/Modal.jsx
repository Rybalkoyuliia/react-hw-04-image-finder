import React from 'react';
import s from './Modal.module.css';

export class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflowY = 'hidden';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflowY = 'auto';
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.content;

    return (
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
