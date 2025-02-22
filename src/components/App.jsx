import React from 'react';
import { fetchImages } from 'servises/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { Unsuccess } from './Unsuccess/Unsuccess';
import { FirstLoad } from './FirstLoad/FirstLoad';
import { Modal } from './Modal/Modal';

export class App extends React.Component {
  state = {
    images: [],
    totalImg: 0,
    error: null,
    isLoading: false,
    page: 1,
    q: '',
    firstLoad: false,
    isOpen: false,
    content: null,
  };

  async componentDidMount() {
    this.setState({
      firstLoad: true,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.q !== this.state.q) {
      try {
        this.setState({ isLoading: true, firstLoad: false });
        const { hits, totalHits } = await fetchImages({
          q: this.state.q,
          page: this.state.page,
        });

        this.setState(prev => ({
          images: [...prev.images, ...hits],
          totalImg: totalHits,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSetQuery = query => {
    this.setState({ q: query, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleToggleModal = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  handleLargeImg = content => {
    this.setState({ content, isOpen: true });
  };

  render() {
    const { images, isLoading, totalImg, isOpen, q, firstLoad, content } =
      this.state;

    return (
      <>
        <Searchbar handleSetQuery={this.handleSetQuery} />
        {firstLoad && <FirstLoad />}

        {!images.length && q && !isLoading && <Unsuccess word={q} />}

        <ImageGallery images={images} openModal={this.handleLargeImg} />

        {images.length && !isLoading && images.length < totalImg && (
          <LoadMoreButton click={this.handleLoadMore} />
        )}

        {isLoading && <Loader />}
        {isOpen && (
          <Modal content={content} closeModal={this.handleToggleModal} />
        )}
      </>
    );
  }
}
