import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Api from './services/FetchAPI';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';
import './styles/styles.css';

export default class Finder extends Component {
  state = {
    nameImage: '',
    imagesArray: [],
    loading: false,
    selectedImage: null,
    page: 1,
    showModal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nameImage !== this.state.nameImage) {
      this.setState({
        page: 1,
        nameImage: this.state.nameImage,
        imagesArray: [],
      });
      this.searchImagesFetch();
    }
  }

  componentDidMount(selectedImage) {
    console.log('mount');
  }

  componentWillUnmount() {
    console.log('Unmount');
  }

  searchImagesFetch = () => {
    const { page, nameImage } = this.state;

    this.setState({ loading: true });

    Api.imagesFetch(nameImage, page)
      .then(imagesArrayFetch => this.checkNewFetchImagesArray(imagesArrayFetch.hits))
      .catch(error => this.setState({ error }))
      .finally(() =>
        this.setState(prevState => ({
          loading: false,
          page: prevState.page + 1,
        })),
      );
  };

  checkNewFetchImagesArray = imagesArrayFetch => {
    imagesArrayFetch === []
      ? this.setState({
          imagesArray: imagesArrayFetch,
        })
      : this.setState(prevState => ({
          imagesArray: [...prevState.imagesArray, ...imagesArrayFetch],
        }));
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  isHendleFormaSubmit = nameImage => {
    this.setState({ nameImage });
  };

  isCurrentImage = (currentImage, tags) => {
    this.setState({
      selectedImage: [currentImage, tags],
      showModal: true,
    });
  };

  scrolGallery = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  onClickLoadMore = () => {
    this.searchImagesFetch();
    this.scrolGallery();
  };

  render() {
    const { nameImage, imagesArray, showModal, selectedImage, loading } = this.state;

    return (
      <>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.isHendleFormaSubmit} />
        {imagesArray && <ImageGallery arrayImages={imagesArray} onSubmit={this.isCurrentImage} />}

        {showModal && (
          <Modal onClose={this.togleModal}>
            <img src={selectedImage[0]} alt={selectedImage[1]} />
          </Modal>
        )}
        {loading && <Loader />}

        {!nameImage && (
          <div className="container-paragraphInfo">
            <p className="paragraphInfo"> ???????????????????? ?????????????? ?????? ?? ???????? !</p>
          </div>
        )}

        {imagesArray.length !== 0 && <Button onClick={this.onClickLoadMore}>?????????????????? ??????</Button>}
      </>
    );
  }
}
