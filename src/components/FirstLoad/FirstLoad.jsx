import React from 'react';
import s from './FirstLoad.module.css';

export class FirstLoad extends React.Component {
  render() {
    return (
      <div className={s.first_container}>
        <p className={s.first_phrase}>Welcome to Image Finder App</p>
        <p className={s.first_phrase}>
          In the search field type the word you want to find an image for.
        </p>
      </div>
    );
  }
}
