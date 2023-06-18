import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore, loading }) => (
  <button type="button" onClick={onLoadMore} className="Button">
    {' '}
    {loading ? 'Loading...' : 'load more'}{' '}
  </button>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
