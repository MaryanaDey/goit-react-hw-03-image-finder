import React, { Component } from 'react';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import '../styles/styles.css';

export default class Searchbar extends Component {
  state = {
    nameImage: '',
  };

  onValueInput = e => {
    this.setState({ nameImage: e.currentTarget.value.toLowerCase() });
  };

  onSubmitFetch = e => {
    e.preventDefault();

    if (this.state.nameImage.trim() === '') {
      toast.error('Введите пожалуйста название картинок');
      return;
    }
    this.props.onSubmit(this.state.nameImage.trim());
    this.setState({ nameImage: '' });
  };

  render() {
    const keySearch = shortid.generate();

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmitFetch}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Пошук</span>
          </button>
          <input
            id={keySearch}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Пошук зображень та фото"
            name="name"
            value={this.state.nameImage}
            onChange={this.onValueInput}
          />
        </form>
      </header>
    );
  }
}
