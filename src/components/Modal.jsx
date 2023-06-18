
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class Modal extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    selectedImage: PropTypes.string.isRequired,
  };
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.closeModal();
    }
  };
  handleOverlayClick = event => {
    const { closeModal } = this.props;
    if (event.target === event.currentTarget) {
      // Натискання відбулось на overlay
      closeModal();
    }
  };

  render() {
    const { selectedImage } = this.props;

    return ReactDOM.createPortal(
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <img src={selectedImage} alt="" />
        </div>
      </div>,
      document.getElementById('portal')
    );
  }
}