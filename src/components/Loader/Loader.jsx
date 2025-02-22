import React from 'react';
import s from './Loader.module.css';
import { Watch } from 'react-loader-spinner';

export class Loader extends React.Component {
  render() {
    return (
      <div className={s.loader_container}>
        <Watch
          visible={true}
          height="80"
          width="80"
          radius="48"
          color="#3f51b5"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
}
