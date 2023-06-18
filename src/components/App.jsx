import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Component } from 'react';
import { Modal } from './Modal';
import { Loader } from './Loader';
import {getImagesApi} from '../services/getImageApi'
import '../styles.css';

export class App extends Component {
  state = {
    searchName: '',
    foundArray: [],
    loading: false,
    error: null,
    page: 1,
    isEmpty: false,
    isVisible: false,
    showModal: false,
    selectedImage: '',
    totalHits: 0,
  };
  key = '35881269-5244fadfdfc6e51dbaa5f3ad4';

  // створення нового масиву обєктів з потрібних властивостей з масиву обєктів Арі
  filterFoundArray(array) {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  // зчитування пошукового запиту
  changeSearch = dataSearch => {
    this.setState({
      searchName: dataSearch,
      page: 1,
      foundArray: [],
      error: null,
      isEmpty: false,
      isVisible: false,
    });
  };

  // Перевірка стейту і новий запит
  componentDidUpdate(_, prevState) {
    const { searchName, page } = this.state;
    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.getImages(searchName, page);
    }
  }
  getImages = async (searchName, page) => {
    if (!searchName) {
      return;
    }
    this.setState({ loading: true });
    try {
      const { hits, totalHits } = await getImagesApi(searchName, page);
      if (hits.length === 0) {
        this.setState({ isEmpty: true });
        return;
      }
      this.setState(prevState => ({
        foundArray: [...prevState.foundArray, ...this.filterFoundArray(hits)],
        isVisible: true,
        totalHits: totalHits,
      }));
      if (totalHits === this.state.foundArray.length) {
        this.setState({ isVisible: false });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  selectImage = image => {
    this.setState({ selectedImage: image, showModal: true });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  closeModal = () => {
    this.setState({ showModal: false, selectImage:"" });
  };

  render() {
    const { foundArray, loading, error, isEmpty, isVisible, totalHits,showModal,selectedImage } =
      this.state;
    const displayedPages = totalHits / foundArray.length;
    return (
      <div className="App">
        {showModal && <Modal
          selectedImage={selectedImage}
          closeModal={this.closeModal}
        />}
        <SearchBar onSubmit={this.changeSearch} />
        {isEmpty && <h2> Sorry. There are no images...</h2>}
        {error && <h2>{error.message}</h2>}
        {loading && <Loader />}

        {foundArray.length > 0 && <ImageGallery
          foundArray={foundArray}
          onSelectImage={this.selectImage}
        />}
        {displayedPages > 1 && isVisible && (
          <Button onLoadMore={this.onLoadMore} loading={loading} />
        )}
      </div>
    );
  }
}

