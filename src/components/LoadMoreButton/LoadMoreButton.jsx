import React from 'react';
import s from './LoadMoreButton.module.css';

export const LoadMoreButton = ({ click }) => {
  return (
    <div className={s.load_more_button_container}>
      <button onClick={click} className={s.load_more_button} type="submit">
        Load More
      </button>
    </div>
  );
};
