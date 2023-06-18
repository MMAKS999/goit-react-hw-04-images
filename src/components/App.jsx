import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { useState } from 'react';
import { Modal } from './Modal';
import { Loader } from './Loader';
import { getImagesApi } from '../services/getImageApi';
import '../styles.css';
import { useEffect } from 'react';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [foundArray, setFoundArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  // створення нового масиву обєктів з потрібних властивостей з масиву обєктів Арі
  const filterFoundArray = array => {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  };
  // зчитування пошукового запиту
  const changeSearch = dataSearch => {
    setSearchName(dataSearch);
    setPage(1);
    setFoundArray([]);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const getImages = async (searchName, page) => {
    if (!searchName) {
      return;
    }
    setLoading(true);
    try {
      const { hits, totalHits } = await getImagesApi(searchName, page);
      if (hits.length === 0) {
        setIsEmpty(true);
        return;
      }

      setFoundArray(prevFoundArray => [
        ...prevFoundArray,
        ...filterFoundArray(hits),
      ]);
      setIsVisible(true);
      setTotalHits(totalHits);

      if (totalHits === foundArray.length) {
        setIsVisible(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  //   // Перевірка стейту і новий запит

  useEffect(() => {
    getImages(searchName, page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName, page]);

  const selectImage = image => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };
  const displayedPages = totalHits / foundArray.length;
     return (
      <div className="App">
        {showModal && <Modal
          selectedImage={selectedImage}
          closeModal={closeModal}
        />}
        <SearchBar onSubmit={changeSearch} />
        {isEmpty && <h2> Sorry. There are no images...</h2>}
        {error && <h2>{error.message}</h2>}
        {loading && <Loader />}

        {foundArray.length > 0 && <ImageGallery
          foundArray={foundArray}
          onSelectImage={selectImage}
        />}
        {displayedPages > 1 && isVisible && (
          <Button onLoadMore={onLoadMore} loading={loading} />
        )}
      </div>
    );
};



