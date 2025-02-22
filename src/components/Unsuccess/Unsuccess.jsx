import React from 'react';
import s from './Unsuccess.module.css';

export const Unsuccess = ({ word }) => {
  return (
    <div className={s.unsuccess_container}>
      <p className={s.unsuccess_phrase}>
        There is no response to your request <span>'{word}'</span>. Please try
        something else
      </p>
    </div>
  );
};
