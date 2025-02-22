import React from 'react';
import s from './Searchbar.module.css';
import { toast, ToastContainer } from 'react-toastify';
import search from '../../assets/search.svg';

export class Searchbar extends React.Component {
  state = {
    searchImg: '',
  };

  handleChangeValue = e => {
    this.setState({ searchImg: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchImg) {
      toast.info(this.state.searchImg);
      this.props.handleSetQuery(this.state.searchImg);
    } else {
      toast.error('Searchfield cannot be empty');
      return;
    }
    this.setState({ searchImg: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <ToastContainer />
        <form onSubmit={this.handleSubmit} className={s.form}>
          <button type="submit" className={s.button}>
            <span className={s.button_label}>
              <img src={search} alt="search button icon" />
            </span>
          </button>

          <input
            value={this.state.searchImg}
            onChange={this.handleChangeValue}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
