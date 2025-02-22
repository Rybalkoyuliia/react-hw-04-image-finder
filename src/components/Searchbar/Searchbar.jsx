import React, { useState } from 'react';
import s from './Searchbar.module.css';
import { toast, ToastContainer } from 'react-toastify';
import search from '../../assets/search.svg';

export const Searchbar = ({ handleSetQuery }) => {
  const [searchImg, setSearchImg] = useState('');

  const handleChangeValue = e => {
    setSearchImg(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchImg) {
      toast.info(searchImg);
      handleSetQuery(searchImg);
    } else {
      toast.warning('Searchfield cannot be empty');
      return;
    }
    setSearchImg('');
  };

  return (
    <header className={s.searchbar}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" className={s.button}>
          <span className={s.button_label}>
            <img src={search} alt="search button icon" />
          </span>
        </button>

        <input
          value={searchImg}
          onChange={handleChangeValue}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
