import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';
export const ImageGallery = ({ foundArray, onSelectImage }) => {
  return (
    <ul className="ImageGallery">
      { foundArray.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onSelectImage={onSelectImage}
          />
        ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  foundArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  })).isRequired,
  onSelectImage: PropTypes.func.isRequired,
};