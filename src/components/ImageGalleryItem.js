import React from 'react';

import '../styles/styles.scc';

export default function ImageGalleryItem({ webformateUrl, tags, largeImageURL, onClick }) {
  return (
    <li onClick={() => onClick(largeImageURL, tags)} className="ImageGalleryItem">
      <img src={webformateUrl} alt={tags} />
    </li>
  );
}
