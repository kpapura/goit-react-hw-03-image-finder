import React from 'react';
import {Searchbar} from './services/Api';
import {ImageGallery} from './ImageGallery/ImageGallery';
import CircleLoading  from "./Loader/CircleLoading";
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';
import { useState } from 'react';
import axios from 'axios';
import { API_KEY } from './services/Api';
import s from './styles.module.scss'


export const App = () => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [query, setQuery] = useState('');

  const fetchImages = async (query, page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const { hits, totalHits: newTotalHits } = response.data;
      setImages(prevImages => [...prevImages, ...hits]);
      setTotalHits(newTotalHits);
    } catch (error) {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = query => {
    setImages([]);
    setTotalHits(0);
    setQuery(query);
    fetchImages(query);
  };

  const handleLoadMore = async () => {
    const nextPage = Math.ceil(images.length / 12) + 1;
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const { hits, totalHits: newTotalHits } = response.data;
      setImages(prevImages => [...prevImages, ...hits]);
      setTotalHits(newTotalHits);
    } catch (error) {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = imageUrl => {
    setModalImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImageUrl('');
  };

  const showLoadMoreButton = images.length < totalHits;

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleSearchSubmit} />

      {error && <div className="error">{error}</div>}

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}

      {loading && <CircleLoading />}

      {showLoadMoreButton && !loading && (
        <Button onClick={handleLoadMore} />
      )}

      {modalImageUrl && (
        <Modal imageUrl={modalImageUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
