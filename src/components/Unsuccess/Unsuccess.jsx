import React from 'react';
import s from './Unsuccess.module.css';

export class Unsuccess extends React.Component {
  render() {
    const { word } = this.props;
    return (
      <div className={s.unsuccess_container}>
        <p className={s.unsuccess_phrase}>
          There is no response to your request <span>'{word}'</span>. Please try
          something else
        </p>
      </div>
    );
  }
}
