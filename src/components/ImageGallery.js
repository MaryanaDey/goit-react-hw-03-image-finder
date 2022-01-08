import React from 'react';

import '../styles/styles.css';
import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ arrayImages, onSubmit }) {
  return (
    <ul>
      {arrayImages.map(({ id, webformateURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformateUrl={webformateURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onClick={onSubmit}
        />
      ))}
    </ul>
  );
}
