import React from 'react';
import PropTypes from 'prop-types'

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onSelectImage,
}) => (
  <li className="ImageGalleryItem">
    <div onClick={() => onSelectImage(largeImageURL)}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </div>
  </li>
);
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onSelectImage: PropTypes.func.isRequired,
};