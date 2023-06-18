import React, { useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export const Modal = ({closeModal, selectedImage}) => {
 
  const handleKeyDown = event => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      // Натискання відбулось на overlay
      closeModal();
    }
  };

   useEffect(() => {
     document.addEventListener('keydown', handleKeyDown);
     return () => {
       document.removeEventListener('keydown', handleKeyDown);
     };
   });


  return ReactDOM.createPortal(
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <img src={selectedImage} alt="" />
      </div>
    </div>,
    document.getElementById('portal')
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  selectedImage: PropTypes.string.isRequired,
};

