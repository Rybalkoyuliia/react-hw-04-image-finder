import React, { useEffect, useState } from 'react';
import { fetchImages } from 'servises/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { Unsuccess } from './Unsuccess/Unsuccess';
import { FirstLoad } from './FirstLoad/FirstLoad';
import { Modal } from './Modal/Modal';
import { toast } from 'react-toastify';

export const App = () => {
  const [images, setImages] = useState([]);
  const [totalImg, setTotalImg] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [firstLoad, setFirstLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  // state = {
  //   images: [],
  //   totalImg: 0,
  //   error: null,
  //   isLoading: false,
  //   page: 1,
  //   q: '',
  //   firstLoad: false,
  //   isOpen: false,
  //   content: null,
  // };

  useEffect(() => {
    const getImages = async () => {
      try {
        setFirstLoad(true);
        setIsLoading(true);
        setError(null);
        if (q) {
          const { hits, totalHits } = await fetchImages({ q, page });
          setImages(prev => [...prev, ...hits]);
          setTotalImg(totalHits);
          setFirstLoad(false);
        } else {
          setFirstLoad(true);
        }
      } catch (error) {
        setError(error);
        toast.error(`${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [page, q]);

  const handleSetQuery = query => {
    setQ(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleToggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const handleLargeImg = content => {
    setContent(content);
    setIsOpen(true);
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
