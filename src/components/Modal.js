import React, { Component } from 'react';
import { createPortal } from 'react-dom';
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

  render() {
    const modalRoot = document.querySelector('#modal-root');

    return createPortal(
      <div className="Overlay">
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
