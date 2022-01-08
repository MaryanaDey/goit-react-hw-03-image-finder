import React, { Component } from 'react';

import Api from './services/FetchAPI';
import Button from './components/Button';
import Searchbar from './components/Searchbar';
import '../src/styles/styles.css';

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

  searchImagesFetch = () => {
    const { page, nameImage } = this.state;

    this.setState({ loading: true });

    Api.imagesFetch(nameImage, page)
      .then(imagesArrayFetch => this.checkNewFetchImagesArrey(imagesArrayFetch.hits))
      .catch(error => this.setState({ error }))
      .finally(() =>
        this.setState(prevState => ({
          loading: false,
          page: prevState.page + 1,
        })),
      );
  };

  checkNewFetchImagesArrey = imagesArrayFetch => {
    imagesArrayFetch === []
      ? this.setState({
          imagesArray: imagesArrayFetch,
        })
      : this.setState(prevState => ({
          imagesArray: [...prevState.imagesArray, ...imagesArrayFetch],
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
    return (
      <>
        <Searchbar />
        <Button onClick={this.onClickLoadMore}>загрузить ещё</Button>
      </>
    );
  }
}
