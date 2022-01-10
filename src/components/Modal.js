import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import '../styles/styles.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.exitModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.exitModal);
  }

  exitModal = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
    console.log(e.code);
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const modalRoot = document.querySelector('#modal-root');

    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
