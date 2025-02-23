import React, { useEffect, useReducer } from 'react';
import { fetchImages } from 'servises/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { Unsuccess } from './Unsuccess/Unsuccess';
import { FirstLoad } from './FirstLoad/FirstLoad';
import { Modal } from './Modal/Modal';
import { toast } from 'react-toastify';
import { imageFinderReducer, initialState } from 'reducer/imageFinderReducer';

export const App = () => {
  const [state, dispatch] = useReducer(imageFinderReducer, initialState);

  const {
    images,
    totalImg,
    error,
    isLoading,
    page,
    q,
    firstLoad,
    isOpen,
    content,
  } = state;

  useEffect(() => {
    const getImages = async () => {
      try {
        dispatch({ type: 'firstLoad', payload: true });
        dispatch({ type: 'loading', payload: true });
        dispatch({ type: 'error', payload: null });
        if (q) {
          const { hits, totalHits } = await fetchImages({ q, page });
          dispatch({ type: 'fetchImg', payload: { hits, totalHits } });
          dispatch({ type: 'firstLoad', payload: false });
        } else {
          dispatch({ type: 'firstLoad', payload: true });
        }
      } catch (error) {
        dispatch({ type: 'error', payload: error });
        toast.error(`${error}`);
      } finally {
        dispatch({ type: 'loading', payload: false });
      }
    };
    getImages();
  }, [page, q]);

  const handleSetQuery = query => {
    dispatch({ type: 'findImg', payload: query });
  };

  const handleLoadMore = () => {
    dispatch({ type: 'changePage' });
  };

  const handleToggleModal = () => {
    dispatch({ type: 'toggleModal' });
  };

  const handleLargeImg = content => {
    dispatch({ type: 'largeImgOpen', payload: content });
  };

  return (
    <>
      <Searchbar handleSetQuery={handleSetQuery} />
      {firstLoad && !isLoading && <FirstLoad />}

      {!images.length && q && !isLoading && !error && <Unsuccess word={q} />}
      <ImageGallery images={images} openModal={handleLargeImg} />

      {images.length && !isLoading && images.length < totalImg && (
        <LoadMoreButton click={handleLoadMore} />
      )}

      {isLoading && <Loader />}
      {isOpen && <Modal content={content} closeModal={handleToggleModal} />}
    </>
  );
};
